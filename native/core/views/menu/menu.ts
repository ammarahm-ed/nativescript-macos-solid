import { native } from "../decorators/native.ts";
import { view } from "../decorators/view.ts";
import { ViewBase } from "../view/view-base.ts";

@view({
  name: "HTMLMenuElement",
  tagName: "menu",
})
export class Menu extends ViewBase {
  declare nativeView: NSMenu;
  public shouldAttachToParentNativeView: boolean = false;
  _isEnabled: boolean = false;
  _isIncludedInLayout: boolean = false;

  public initNativeView(): NSMenu {
    const menu = NSMenu.new();
    this.nativeView = menu;
    return this.nativeView;
  }

  public addNativeChild(child: any): void {
    if (
      child.nodeName !== "MENU-ITEM" &&
      child.nodeName !== "MENU-SEPARATOR" &&
      child.nodeName !== "MENU-SECTION-HEADER"
    ) {
      return;
    }
    this.nativeView.addItem(child.nativeView);
  }

  public removeNativeChild(child: any): void {
    this.nativeView.removeItem(child.nativeView);
  }

  @native({
    setNative: (view: Menu, _key, value) => {
      if (view.nativeView) {
        view.nativeView.title = value;
      }
    },
  })
  declare title: string;

  open(event: NSEvent) {
    const view = this.parentNode?.nativeView;
    NSMenu.popUpContextMenuWithEventForView(this.nativeView, event, view);
  }

  menuItem?: NSMenuItem;

  @native({
    setNative: (view: Menu, _key, value) => {
      NativeScriptApplication.createMenu();
      if (value) {
        if (!view.menuItem) {
          view.menuItem = NSMenuItem.alloc().initWithTitleActionKeyEquivalent(
            view.nativeView.title,
            "",
            "",
          );
        }
        view.menuItem.submenu = view.nativeView;
        NativeScriptApplication.appMenu.addItem(view.menuItem);
        view.menuItem.title = view.nativeView.title;
      } else {
        if (view.menuItem) {
          NativeScriptApplication.appMenu.removeItem(view.menuItem);
        }
      }
    },
  })
  declare attachToMainMenu: string;

  public disposeNativeView(): void {
    if (this.menuItem && this.attachToMainMenu) {
      NativeScriptApplication.appMenu.removeItem(this.menuItem);
    }
    super.disposeNativeView();
  }
}
