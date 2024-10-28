import "@nativescript/macos-node-api";
import { Event } from "../../dom/dom-utils.ts";
import type { YogaNodeLayout } from "../../layout/index.ts";
import type { ViewStyle } from "../../style/index.ts";
import { native } from "../decorators/native.ts";
import { view } from "../decorators/view.ts";
import { View } from "../view/view.ts";

export class ScrollChangeEvent extends Event {
  constructor(public offset: { x: number; y: number }, eventDict?: EventInit) {
    super("scroll", eventDict);
    this.offset = offset;
  }
}

export class NSScrollViewAutoResizable extends NSScrollView {
  static {
    NativeClass(this);
  }

  _owner?: WeakRef<ScrollView>;

  initScrollEvents(owner: ScrollView) {
    this._owner = new WeakRef(owner);
    NSNotificationCenter.defaultCenter.addObserverSelectorNameObject(
      this,
      "boundsDidChange",
      NSViewBoundsDidChangeNotification,
      this?.contentView
    );
  }

  deinitScrollEvents() {
    NSNotificationCenter.defaultCenter.removeObserverNameObject(
      this,
      NSViewBoundsDidChangeNotification,
      this?.contentView
    );
  }

  boundsDidChange(_notification: NSNotification) {
    const view = this._owner?.deref();
    if (view) {
      view.dispatchEvent(
        new ScrollChangeEvent({
          x: view.nativeView!.contentView.bounds.origin.x,
          y: view.nativeView!.contentView.bounds.origin.y,
        })
      );
    }
  }

  static ObjCExposedMethods = {
    boundsDidChange: {
      returns: interop.types.void,
      params: [interop.types.id],
    },
  };
}

@view({
  name: "HTMLScrollViewElement",
  tagName: "scroll-view",
})
export class ScrollView extends View {
  override nativeView?: NSScrollViewAutoResizable = undefined;
  documentView?: View;

  public override initNativeView(): NSScrollViewAutoResizable | undefined {
    this.nativeView = NSScrollViewAutoResizable.new();
    this.nativeView.hasVerticalScroller = true;
    this.nativeView.hasHorizontalScroller = false;
    this.nativeView.drawsBackground = false;
    this.nativeView.autohidesScrollers = true;
    this.nativeView.initScrollEvents(this);
    this.nativeView.contentView.postsBoundsChangedNotifications = true;
    return this.nativeView;
  }

  private initDocumentView() {
    if (!this.documentView && !this._disableDefaultDocumentView) {
      this.documentView = document.createElement("view");
      this.documentView.style!.overflow = "scroll";
      super.insertBefore(this.documentView, null);
    }
  }

  public disposeNativeView() {
    this.nativeView?.deinitScrollEvents();
    super.disposeNativeView();
  }

  insertBefore<T extends Node>(node: T, child: Node | null): T {
    this.initDocumentView();
    if (this.documentView && !this._disableDefaultDocumentView) {
      this.documentView?.insertBefore(node, child);
    } else {
      if (this.firstChild) return node;
      super.insertBefore(node, child);
    }

    return node;
  }

  removeChild<T extends Node>(child: T): T {
    if (
      (child as Node) === this.documentView ||
      !this.documentView ||
      this._disableDefaultDocumentView
    ) {
      super.removeChild(child);
    } else {
      this.documentView?.removeChild(child);
    }
    return child;
  }

  public override addNativeChild(child: any) {
    this.nativeView!.documentView = (child as View).nativeView as NSView;
  }

  public override removeNativeChild(_child: any): void {
    // @ts-expect-error documentView is nullable
    this.nativeView!.documentView = null;
  }

  applyLayout(parentLayout?: YogaNodeLayout): void {
    super.applyLayout(parentLayout);
    this.nativeView!.translatesAutoresizingMaskIntoConstraints = true;
  }

  @native({
    setNative: (view: ScrollView, key, value) => {
      view.documentView!.style = value;
    },
  })
  declare documentViewStyle: ViewStyle;

  @native({
    setNative: (view: ScrollView, key, value) => {
      view.initDocumentView();
      view.nativeView!.hasHorizontalScroller = value;
      view.nativeView!.hasVerticalScroller = !value;
      view.documentView!.style = {
        flexDirection: value ? "row" : "column",
      };
      view.style = {
        flexDirection: "row",
      };
    },
  })
  declare horizontal: boolean;

  private _disableDefaultDocumentView: boolean = false;
  @native({
    setNative: (view: ScrollView, key, value) => {
      view._disableDefaultDocumentView = value;
      if (!value && view.firstChild !== view.documentView) {
        const firstChild = view.firstChild;
        view.removeChild(firstChild as Node);
        view.initDocumentView();
        view.appendChild(firstChild as Node);
      } else if (view.documentView) {
        const child = view.documentView.firstChild;
        view.documentView.removeChild(child as Node);
        view.removeChild(view.documentView);
        view.appendChild(child as Node);
      }
    },
  })
  declare disableDefaultDocumentView: boolean;


}
