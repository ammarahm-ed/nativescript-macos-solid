import "@nativescript/macos-node-api";
import { Event } from "../../dom/dom-utils.ts";
import { native } from "../decorators/native.ts";
import { view } from "../decorators/view.ts";
import { ViewBase } from "../view/view-base.ts";
import type { Menu } from "./menu.ts";

export class MenuItemClickEvent extends Event {
  declare state?: boolean;
  constructor(state: boolean, eventDict?: EventInit) {
    super("click", eventDict);
    this.state = state;
  }
}

@NativeClass
class NativeMenuItem extends NSMenuItem {
  static ObjCExposedMethods = {
    clicked: { returns: interop.types.void, params: [] },
  };
  isEnabled: boolean = false;
  isIncludedInLayout: boolean = false;

  private _owner?: WeakRef<MenuItem>;
  static initWithOwner(owner: WeakRef<MenuItem>): NativeMenuItem {
    const menu = NativeMenuItem.alloc().init();
    menu.target = menu;
    menu.action = "clicked";
    menu._owner = owner;
    return menu;
  }

  clicked() {
    const owner = this._owner?.deref();
    if (owner) {
      owner.dispatchEvent(new MenuItemClickEvent(true));
    }
  }
}
@view({
  name: "HTMLMenuElement",
  tagName: "menu-item",
})
export class MenuItem extends ViewBase {
  isRoot: boolean = true;

  declare nativeView: NativeMenuItem;
  public initNativeView(): NativeMenuItem {
    const menu = NativeMenuItem.initWithOwner(new WeakRef(this));
    this.nativeView = menu;
    return this.nativeView;
  }

  public addNativeChild(child: any): void {
    if (child.nodeName === "MENU") {
      this.nativeView.submenu = child.nativeView;
    } else {
      this.nativeView.view = child.nativeView;
    }
  }

  public removeNativeChild(child: any): void {
    if (child.nodeName === "MENU") {
      //@ts-expect-error can be null;
      this.nativeView.submenu = null;
    } else {
      //@ts-expect-error can be null;
      this.nativeView.view = null;
    }
  }

  insertBefore<T extends Node>(node: T, child: Node | null): T {
    if (node.nodeName === "MENU") {
      (node as unknown as Menu).shouldAttachToParentNativeView = true;
    }
    return super.insertBefore(node, child);
  }

  removeChild<T extends Node>(child: T): T {
    if (child.nodeName === "MENU") {
      (child as unknown as Menu).shouldAttachToParentNativeView = false;
    }
    return super.removeChild(child);
  }

  @native({
    setNative: (view: MenuItem, _key, value) => {
      if (view.nativeView) {
        view.nativeView.title = value;
      }
    },
  })
  declare title: string;

  @native({
    setNative(view: MenuItem, _key, value) {
      if (view.nativeView) {
        //@ts-expect-error can be null;
        view.nativeView.image = !value
          ? null
          : NSImage.imageWithSystemSymbolNameAccessibilityDescription(
              value,
              null
            );
      }
    },
  })
  declare icon: string;

  @native({
    setNative(view: MenuItem, _key, value) {
      if (view.nativeView) {
        view.nativeView.keyEquivalent = value;
      }
    },
  })
  declare shortcutKey: string;

  @native({
    setNative(view: MenuItem, _key, value) {
      if (view.nativeView) {
        view.nativeView.isEnabled = value;
      }
    },
  })
  declare enabled: boolean;

  @native({
    setNative(view: MenuItem, _key, value) {
      if (view.nativeView) {
        view.nativeView.state =
          value === "on"
            ? NSControlStateValueOn
            : value === "mixed"
            ? NSControlStateValueMixed
            : NSControlStateValueOff;
      }
    },
  })
  declare state: "on" | "off" | "mixed";

  @native({
    setNative(view: MenuItem, _key, value) {
      if (view.nativeView) {
        const image = NSImage.imageWithSystemSymbolNameAccessibilityDescription(
          value,
          null
        );
        view.nativeView.onStateImage = image;
      }
    },
  })
  declare onIcon: string;
  @native({
    setNative(view: MenuItem, _key, value) {
      if (view.nativeView) {
        const image = NSImage.imageWithSystemSymbolNameAccessibilityDescription(
          value,
          null
        );
        view.nativeView.offStateImage = image;
      }
    },
  })
  declare offIcon: string;
  @native({
    setNative(view: MenuItem, _key, value) {
      if (view.nativeView) {
        const image = NSImage.imageWithSystemSymbolNameAccessibilityDescription(
          value,
          null
        );
        view.nativeView.mixedStateImage = image;
      }
    },
  })
  declare mixedIcon: string;

  @native({
    setNative: (view: MenuItem, _key, value) => {
      if (view.nativeView) {
        view.nativeView.isHidden = value;
      }
    },
  })
  declare hidden: boolean;
}
