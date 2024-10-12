import { YogaNodeLayout } from "../../layout/index.ts";
import { Color } from "../../style/utils/color.ts";
import { native } from "../decorators/native.ts";
import { overrides } from "../decorators/overrides.ts";
import { view } from "../decorators/view.ts";
import { ViewBase } from "../view/view-base.ts";
import { NativeWindow } from "./native-window.ts";

@view({
  name: "HTMLWindowElement",
  tagName: "window",
})
export class Window extends ViewBase {
  isRoot = true;
  public shouldAttachToParentNativeView: boolean = false;
  declare nativeView?: NativeWindow;

  public initNativeView() {
    this.nativeView = NativeWindow.new();
    return this.nativeView;
  }

  public prepareNativeView(nativeView: NativeWindow): void {
    nativeView.windowController =
      NSWindowController.alloc().initWithWindow(nativeView);

    nativeView.contentViewController = NSViewController.new();
    this.viewController = nativeView.contentViewController;

    // This view will become the main window if no other window is present;
    if (!NativeScriptApplication.window) {
      NativeScriptApplication.window = this;
    }

    nativeView.appWindow = this;
    nativeView.delegate = nativeView;
  }

  public disposeNativeView() {
    if (this.nativeView) {
      this.nativeView = undefined;
    }
  }

  applyLayout(parentLayout?: YogaNodeLayout): void {
    if (parentLayout) return;
    const layout = this.yogaNode.getComputedLayout();
    if (this.nativeView) {
      const screenSize = NSScreen.mainScreen.frame.size;
      const frame = {
        origin: {
          x: screenSize.width / 2 - layout.width / 2,
          y: screenSize.height / 2 - layout.height / 2,
        },
        size: {
          width: layout.width,
          height: layout.height,
        },
      };
      this.nativeView?.setFrameDisplay(frame, false);
    }
    this.applyLayoutToChildern(layout);
  }

  public open() {
    if (NativeScriptApplication.window === this) {
      this.nativeView?.becomeMainWindow();
      this.nativeView?.displayIfNeeded();
      this.nativeView?.makeKeyAndOrderFront(NSApp);
    } else {
      const window = (this.parentNode as HTMLViewElement).nativeView?.window;
      if (window && window?.windowController && this.nativeView) {
        window?.windowController.showWindow(this.nativeView);
        this.nativeView.becomeKeyWindow();
        this.nativeView.orderFront(NSApp);
      }
    }
  }

  public close() {
    this.nativeView?.close();
    if (this.nativeView?.isKeyWindow) {
      this.nativeView?.resignKeyWindow();
    }
  }

  insertBefore<T extends Node>(node: T, child: Node | null): T {
    if (!this.firstChild) {
      super.insertBefore(node, child);
    } else {
      throw new Error("Window can only have one child");
    }
    return node;
  }

  public addNativeChild(child: ViewBase): void {
    if (this.nativeView) {
      this.nativeView.contentViewController.view.addSubview(child.nativeView);
    }
  }

  public removeNativeChild(child: ViewBase): void {
    if (this.nativeView) {
      child.nativeView.removeFromSuperview();
    }
  }

  @native({
    setNative(view: Window, _key, value: boolean) {
      if (view.nativeView) {
        view.nativeView.titlebarAppearsTransparent = value;
      }
    },
  })
  declare transparentTitleBar: boolean;

  @native({
    setNative(view: Window, _key, value: string) {
      if (view.nativeView) {
        view.nativeView.title = value;
      }
    },
  })
  declare title: string;

  @overrides("backgroundColor")
  onSetBackgroundColor(_key: string, value: any) {
    if (this.nativeView) {
      this.nativeView.backgroundColor = new Color(value).toNSColor();
    }
  }

  @native({
    setNative(view, _key, value: boolean) {
      if (view.nativeView) {
        view.nativeView.styleMask = value;
      }
    },
  })
  declare styleMask: typeof NSWindowStyleMask;

  @native({
    setNative(view, _key, value: boolean) {
      if (view.nativeView) {
        view.nativeView.isReleasedWhenClosed = value;
      }
    },
  })
  declare releasedWhenClosed: boolean;
}
