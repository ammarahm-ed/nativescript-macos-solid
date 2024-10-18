import "npm:@nativescript/macos-node-api@~0.1.1";
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
    eventDict?: EventInit
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
    eventDict?: EventInit
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
class WebViewDelegate
  extends NSObject
  implements WKUIDelegate, WKNavigationDelegate
{
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
    _windowFeatures: WKWindowFeatures
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

  // webViewDecidePolicyForNavigationActionDecisionHandler(
  //   _webView: WKWebView,
  //   navigationAction: WKNavigationAction,
  //   decisionHandler: (p1: interop.Enum<typeof WKNavigationActionPolicy>) => void
  // ): void {
  //   const owner = this._owner?.deref();
  //   if (owner && navigationAction.request.URL) {
  //     let navType: WebViewNavigationType = "other";

  //     switch (navigationAction.navigationType) {
  //       case WKNavigationType.LinkActivated:
  //         navType = "linkClicked";
  //         break;
  //       case WKNavigationType.FormSubmitted:
  //         navType = "formSubmitted";
  //         break;
  //       case WKNavigationType.BackForward:
  //         navType = "backForward";
  //         break;
  //       case WKNavigationType.Reload:
  //         navType = "reload";
  //         break;
  //       case WKNavigationType.FormResubmitted:
  //         navType = "formResubmitted";
  //         break;
  //     }
  //     decisionHandler(WKNavigationActionPolicy.Allow);

  //     owner.dispatchEvent(
  //       createEvent("loadStarted", {
  //         detail: {
  //           type: navType,
  //         },
  //       })
  //     );
  //   }
  // }

  webViewDidFinishNavigation(
    webView: WKWebView,
    _navigation: WKNavigation
  ): void {
    const owner = this._owner?.deref();

    if (owner) {
      let src = owner.src;
      if (webView.URL) {
        src = webView.URL.absoluteString;
      }
      owner.dispatchEvent(new LoadFinishedEvent(src));
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
      config
    );
    this.delegate = WebViewDelegate.initWithOwner(new WeakRef(this));
    this.nativeView.UIDelegate = this.delegate;
    this.nativeView.navigationDelegate = this.delegate;
    return this.nativeView;
  }

  override applyLayout(parentLayout?: YogaNodeLayout): void {
    super.applyLayout(parentLayout);
    this.nativeView!.translatesAutoresizingMaskIntoConstraints = true;
  }

  loadURL(url: string | URL) {
    if (this.nativeView) {
      this.nativeView.loadRequest(
        NSURLRequest.requestWithURL(
          NSURL.URLWithString(typeof url === "string" ? url : url.href)
        )
      );
    }
  }

  @native({
    setNative(view: WebView, _key, value) {
      view.loadURL(value);
    },
  })
  declare src: string | URL;
}