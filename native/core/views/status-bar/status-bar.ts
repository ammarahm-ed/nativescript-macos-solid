import type { YogaNodeLayout } from "../../layout/index.ts";
import { native } from "../decorators/native.ts";
import { view } from "../decorators/view.ts";
import type { Menu } from "../menu/menu.ts";
import type { Popover } from "../popover/popover.ts";
import { ViewBase } from "../view/view-base.ts";

@NativeClass
class MenuAction extends NSObject {
  static ObjCExposedMethods = {
    clicked: { returns: interop.types.void, params: [interop.types.id] },
  };

  owner?: WeakRef<StatusBar>;

  static initWithOwner(owner: WeakRef<StatusBar>): MenuAction {
    const menu = MenuAction.alloc().init();
    menu.owner = owner;
    return menu;
  }
  clicked() {
    const owner = this.owner?.deref();
    if (owner?._menu) {
      owner.nativeView?.popUpStatusItemMenu(owner._menu.nativeView);
    } else if (owner?._popover) {
      if (owner._popover.nativeView?.isShown) {
        owner._popover.hide();
      } else {
        owner._popover.show({
          nativeView: owner.nativeView!.button
        });
      }
     
    }
  }
}

@view({
  name: "HTMLStatusBarElement",
  tagName: "status-bar",
})
export class StatusBar extends ViewBase {
  declare nativeView?: NSStatusItem;
  public shouldAttachToParentNativeView: boolean = false;
  isRoot: boolean = true;
  _popover?: Popover;
  _menu?: Menu;
  menuAction?: MenuAction;

  public initNativeView(): NSStatusItem {
    this.nativeView = NSStatusBar.systemStatusBar.statusItemWithLength(
      NSVariableStatusItemLength
    );
    this.menuAction = MenuAction.initWithOwner(new WeakRef(this));
    this.nativeView.button.action = "clicked";
    this.nativeView.button.target = this.menuAction;
    return this.nativeView;
  }

  insertBefore<T extends Node>(node: T, child: Node | null): T {
    if (node.nodeName === "MENU" || node.nodeName === "POPOVER") {
      (node as unknown as ViewBase).shouldAttachToParentNativeView = true;
    }
    return super.insertBefore(node, child);
  }

  public addNativeChild(child: any): void {
    if (child.nodeName === "MENU") {
      this._menu = child;
    } else if (child.nodeName === "POPOVER") {
      this._popover = child;
    } else {
      this.nativeView!.button.addSubview(child.nativeView);
    }
  }

  public removeNativeChild(child: any): void {
    if (child.nodeName === "MENU") {
      //@ts-expect-error can be null
      this.nativeView!.menu = null;
    } else {
      child.nativeView.removeFromSuperview();
    }
  }

  @native({
    setNative: (view: StatusBar, _key, value) => {
      if (view.nativeView) {
        view.nativeView.title = value;
      }
    },
  })
  declare title: string;

  applyLayout(parentLayout?: YogaNodeLayout): void {
    super.applyLayout(parentLayout);
    if (this.nativeView) {
      // @ts-ignore frame
      this.nativeView.button.frame = this.nativeView?.frame;
    }
  }

  public disposeNativeView(): void {
    NSStatusBar.systemStatusBar.removeStatusItem(this.nativeView!);
    super.disposeNativeView();
  }
}
