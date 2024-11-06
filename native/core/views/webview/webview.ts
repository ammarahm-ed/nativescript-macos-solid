import "@nativescript/macos-node-api";
import { Event } from "../../dom/dom-utils.ts";
import { YogaNodeLayout } from "../../layout/index.ts";
import { native } from "../decorators/native.ts";
import { view } from "../decorators/view.ts";
import { View } from "../view/view.ts";

objc.import("WebKit");

export class WebviewNavigationEvent extends Event {
  declare url?: string | URL;
  declare navigationType?: WebViewNavigationType;
  constructor(
    type: string,
    url: string | URL,
    navigationType: WebViewNavigationType,
    eventDict?: EventInit,
  ) {
    super(type, eventDict);
    this.url = url;
    this.navigationType = navigationType;
  }
}

export class LoadStartedEvent extends WebviewNavigationEvent {
  constructor(
    url: string | URL,
    navigationType: WebViewNavigationType,
    eventDict?: EventInit,
  ) {
    super("loadStarted", url, navigationType, eventDict);
  }
}

export class LoadFinishedEvent extends WebviewNavigationEvent {
  constructor(url: string | URL, eventDict?: EventInit) {
    super("loadFinished", url, undefined, eventDict);
  }
}

type WebViewNavigationType =
  | "linkClicked"
  | "formSubmitted"
  | "backForward"
  | "reload"
  | "formResubmitted"
  | "other"
  | undefined;

@NativeClass
class WebViewDelegate extends NSObject
  implements WKUIDelegate, WKNavigationDelegate {
  static ObjCProtocols = [WKUIDelegate, WKNavigationDelegate];

  declare _owner: WeakRef<WebView>;
  static initWithOwner(owner: WeakRef<WebView>) {
    const delegate = WebViewDelegate.new() as WebViewDelegate;
    delegate._owner = owner;
    return delegate;
  }

  webViewCreateWebViewWithConfigurationForNavigationActionWindowFeatures(
    webView: WKWebView,
    _configuration: WKWebViewConfiguration,
    navigationAction: WKNavigationAction,
    _windowFeatures: WKWindowFeatures,
  ): WKWebView {
    if (
      navigationAction &&
      (!navigationAction.targetFrame ||
        (navigationAction.targetFrame &&
          !navigationAction.targetFrame.isMainFrame))
    ) {
      webView.loadRequest(navigationAction.request);
    }
    return webView;
  }

  webViewDecidePolicyForNavigationActionDecisionHandler(
    _webView: WKWebView,
    navigationAction: WKNavigationAction,
    decisionHandler: (
      p1: interop.Enum<typeof WKNavigationActionPolicy>,
    ) => void,
  ): void {
    const owner = this._owner?.deref();
    if (owner && navigationAction.request.URL) {
      let navType: WebViewNavigationType = "other";

      switch (navigationAction.navigationType) {
        case WKNavigationType.LinkActivated:
          navType = "linkClicked";
          break;
        case WKNavigationType.FormSubmitted:
          navType = "formSubmitted";
          break;
        case WKNavigationType.BackForward:
          navType = "backForward";
          break;
        case WKNavigationType.Reload:
          navType = "reload";
          break;
        case WKNavigationType.FormResubmitted:
          navType = "formResubmitted";
          break;
      }
      decisionHandler(WKNavigationActionPolicy.Allow);

      owner.dispatchEvent(
        new LoadStartedEvent(
          navigationAction.request.URL.absoluteString,
          navType,
        ),
      );
    }
  }

  webViewDidFinishNavigation(
    webView: WKWebView,
    _navigation: WKNavigation,
  ): void {
    const owner = this._owner?.deref();
    if (owner) {
      const src = owner.src;
      if (webView.URL) {
        owner.dispatchEvent(new LoadFinishedEvent(src));
      }
    }
  }
}

@view({
  name: "HTMLWebviewElement",
  tagName: "webview",
})
export class WebView extends View {
  get isLeaf(): boolean {
    return true;
  }

  delegate!: WebViewDelegate;

  override nativeView?: WKWebView = undefined;

  public override initNativeView(): WKWebView | undefined {
    const config = WKWebViewConfiguration.new();
    this.nativeView = WKWebView.alloc().initWithFrameConfiguration(
      CGRectZero,
      config,
    );
    this.nativeView.setValueForKey(false, "drawsBackground");
    this.delegate = WebViewDelegate.initWithOwner(new WeakRef(this));
    this.nativeView.UIDelegate = this.delegate;
    this.nativeView.navigationDelegate = this.delegate;
    this.nativeView.configuration.preferences.setValueForKey(
      true,
      "allowFileAccessFromFileURLs",
    );
    return this.nativeView;
  }

  override applyLayout(parentLayout?: YogaNodeLayout): void {
    super.applyLayout(parentLayout);
    if (this.nativeView) {
      this.nativeView.translatesAutoresizingMaskIntoConstraints = true;
    }
  }

  loadURL(value: string | URL) {
    if (this.nativeView) {
      const url = typeof value === "string" ? value : value.href;
      const nsUrl = NSURL.URLWithString(url);
      if (url?.indexOf("http") > -1) {
        this.nativeView.loadRequest(NSURLRequest.requestWithURL(nsUrl));
      } else {
        this.nativeView.loadFileURLAllowingReadAccessToURL(
          nsUrl,
          nsUrl.URLByDeletingLastPathComponent,
        );
      }
    }
  }

  executeJavaScript(src: string) {
    this.nativeView?.evaluateJavaScriptCompletionHandler(
      src,
      (_result, error) => {
        if (error) {
          console.error(error);
        }
      },
    );
  }

  @native({
    setNative(view: WebView, _key, value) {
      view.loadURL(value);
    },
  })
  declare src: string | URL;

  @native({
    setNative(view: WebView, _key, value) {
      if (view?.nativeView) {
        view.nativeView.isInspectable = value;
      }
    },
  })
  declare debug: boolean;
}
