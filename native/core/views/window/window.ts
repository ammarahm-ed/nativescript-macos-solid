import { YogaNodeLayout } from "../../layout/index.ts";
import { Color } from "../../style/utils/color.ts";
import { native } from "../decorators/native.ts";
import { overrides } from "../decorators/overrides.ts";
import { view } from "../decorators/view.ts";
import { ViewBase } from "../view/view-base.ts";
import { MainWindowController, NativeWindow } from "./native-window.ts";

@view({
  name: "HTMLWindowElement",
  tagName: "window",
})
export class Window extends ViewBase {
  isRoot = true;
  public shouldAttachToParentNativeView: boolean = false;
  declare nativeView?: NativeWindow;
  declare mainWindowCtrl: MainWindowController;

  public initNativeView() {
    this.nativeView = NativeWindow.new();

    this.mainWindowCtrl = MainWindowController.initWithOwner(new WeakRef(this));
    this.mainWindowCtrl.window = this.nativeView;
    this.nativeView.windowController = this.mainWindowCtrl;
    this.nativeView.isReleasedWhenClosed = false;
    this.nativeView.contentViewController = NSViewController.new();
    this.viewController = this.nativeView.contentViewController;

    // This view will become the main window if no other window is present;
    if (!NativeScriptApplication.window) {
      NativeScriptApplication.window = this;
      NativeScriptApplication.showMainWindow = () => {
        this.nativeView?.becomeMainWindow();
        this.nativeView?.displayIfNeeded();
        this.nativeView?.makeKeyAndOrderFront(NSApp);
      };
    }

    this.nativeView.owner = new WeakRef(this);

    // The toolbar style is best set to .automatic
    // But it appears to go as .unifiedCompact if
    // you set as .automatic and titleVisibility as
    // .hidden
    this.nativeView.toolbarStyle = NSWindowToolbarStyle.Automatic;

    // Set this property to .hidden to gain more toolbar space
    this.nativeView.titleVisibility = NSWindowTitleVisibility.Visible;

    this.nativeView.delegate = this.nativeView;
    return this.nativeView;
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
        const frameCentered = {
          x: window.frame.origin.x +
            window.frame.size.width / 2 -
            this.nativeView.frame.size.width / 2,
          y: window.frame.origin.y +
            window.frame.size.height / 2 -
            this.nativeView.frame.size.height / 2,
        };
        this.nativeView.setFrameOrigin(frameCentered);
        window?.windowController.showWindow(this.nativeView);
        this.nativeView.makeKeyAndOrderFront(NSApp);
      }
    }
  }

  _modalCode?: number;
  public openAsModal(relativeToWindow?: boolean) {
    if (relativeToWindow) {
      const window = (this.parentNode as HTMLViewElement).nativeView?.window;
      if (window) {
        this._modalCode = NSApp.runModalForWindowRelativeToWindow(
          this.nativeView!,
          window,
        );
      }
    } else {
      this._modalCode = NSApp.runModalForWindow(this.nativeView!);
    }
  }

  public closeModalWindow() {
    // if (this._modalCode) {
    //   NSApp.stopModalWithCode(this._modalCode);
    //   this._modalCode = undefined;
    // } else {
    //   NSApp.stopModal();
    // }
    this.close();
  }

  public close() {
    this.nativeView?.close();
    if (this.nativeView?.isKeyWindow) {
      this.nativeView?.resignKeyWindow();
    }
  }

  insertBefore<T extends Node>(node: T, child: Node | null): T {
    // if (!this.firstChild) {
    super.insertBefore(node, child);
    // } else {
    //   throw new Error("Window can only have one child");
    // }
    return node;
  }

  public addNativeChild(child: ViewBase): void {
    if (this.nativeView) {
      if (child.nodeName === "TOOLBAR") {
        this.nativeView.toolbar = child.nativeView;
      } else {
        this.nativeView.contentViewController.view.addSubview(child.nativeView);
      }
    }
  }

  public removeNativeChild(child: ViewBase): void {
    if (this.nativeView) {
      if (child.nodeName === "TOOLBAR") {
        // @ts-expect-error it can be null
        this.nativeView.toolbar = null;
      } else {
        child.nativeView.removeFromSuperview();
      }
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

  @native({
    setNative(view: Window, _key, value: string) {
      if (view.nativeView) {
        view.nativeView.subtitle = value;
      }
    },
  })
  declare subtitle: string;

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
