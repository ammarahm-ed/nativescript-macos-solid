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

export class WebViewMessageEvent extends Event {
  constructor(public data: any, eventDict?: EventInit) {
    super("message", eventDict);
  }
}

const NSWebViewBridge = `
(() => {
  window.nsWebViewBridge = {
    postMessage: function(data) {
     window.webkit.messageHandlers.nsNativeBridge.postMessage(JSON.stringify(data));
    },
    addEventListener: function(type, listener) {
      window.addEventListener(type, listener);
      return listener;
    },
    removeEventListener: function(type, listener) {
      window.removeEventListener(type, listener);
    }
  }
 })();
`;

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
  implements WKUIDelegate, WKNavigationDelegate, WKScriptMessageHandler
{
  static ObjCProtocols = [
    WKUIDelegate,
    WKNavigationDelegate,
    WKScriptMessageHandler,
  ];

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

  webViewDecidePolicyForNavigationActionDecisionHandler(
    _webView: WKWebView,
    navigationAction: WKNavigationAction,
    decisionHandler: (p1: interop.Enum<typeof WKNavigationActionPolicy>) => void
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

      const url = navigationAction.request.URL.absoluteString;
      if (owner.src === url) {
        owner.dispatchEvent(
          new LoadStartedEvent(
            navigationAction.request.URL.absoluteString,
            navType
          )
        );
      }
    }
  }

  webViewDidFinishNavigation(
    webView: WKWebView,
    _navigation: WKNavigation
  ): void {
    const owner = this._owner?.deref();
    if (owner) {
      const src = owner.src;
      if (webView.URL) {
        if (src === webView.URL.absoluteString) {
          owner.dispatchEvent(new LoadFinishedEvent(src));
        }
      }
    }
  }

  userContentControllerDidReceiveScriptMessage(
    userContentController: WKUserContentController,
    message: WKScriptMessage
  ): void {
    if (message.name === "nsNativeBridge") {
      const owner = this._owner?.deref();
      if (owner) {
        owner.dispatchEvent(new WebViewMessageEvent(JSON.parse(message.body)));
      }
    }
  }

  attachMessageHandler() {
    const owner = this._owner?.deref();
    if (owner) {
      owner.postMessageScript =
        WKUserScript.alloc().initWithSourceInjectionTimeForMainFrameOnly(
          NSWebViewBridge,
          WKUserScriptInjectionTime.Start,
          true
        );
      owner.nativeView?.configuration.userContentController.addUserScript(
        owner.postMessageScript
      );
      owner.nativeView?.configuration.userContentController.addScriptMessageHandlerName(
        this,
        "nsNativeBridge"
      );
    }
  }

  detachMessageHandler() {
    const owner = this._owner?.deref();
    if (owner) {
      owner.nativeView?.configuration.userContentController.removeScriptMessageHandlerForName(
        "nsNativeBridge"
      );
    }
  }
}

@view({
  name: "HTMLWebViewElement",
  tagName: "webview",
})
export class WebView extends View {
  get isLeaf(): boolean {
    return true;
  }

  delegate!: WebViewDelegate;

  postMessageScript?: WKUserScript;

  override nativeView?: WKWebView = undefined;

  public override initNativeView(): WKWebView | undefined {
    const config = WKWebViewConfiguration.new();
    config.userContentController = WKUserContentController.new();
    this.nativeView = WKWebView.alloc().initWithFrameConfiguration(
      CGRectZero,
      config
    );

    this.nativeView.setValueForKey(false, "drawsBackground");
    this.delegate = WebViewDelegate.initWithOwner(new WeakRef(this));
    this.nativeView.UIDelegate = this.delegate;
    this.nativeView.navigationDelegate = this.delegate;
    this.nativeView.configuration.preferences.setValueForKey(
      true,
      "allowFileAccessFromFileURLs"
    );
    return this.nativeView;
  }

  public prepareNativeView(_nativeView: any): void {
    //@ts-expect-error
    if (this.getAttribute("messagingEnabled") !== false) {
      this.delegate.attachMessageHandler();
    }
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
          nsUrl.URLByDeletingLastPathComponent
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
      }
    );
  }

  postMessage(data: any) {
    this.executeJavaScript(
      `window.dispatchEvent(new MessageEvent('message', { data: ${JSON.stringify(
        data
      )} }))`
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

  public disposeNativeView(): void {
    if (this.getAttribute("messagingEnabled")) {
      this.delegate.detachMessageHandler();
    }

    this.nativeView = undefined;
  }

  propertyChangedCallback(
    _property: string,
    _value: any,
    _oldValue: any
  ): void {
    if (_property === "messagingEnabled") {
      if (_value) {
        this.delegate?.attachMessageHandler();
      } else {
        this.delegate?.detachMessageHandler();
      }
    }
  }
}
