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

        view.createStandardMenus();
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

  createStandardMenus() {
    // Ensure standard Edit menu is available
    if (!NativeScriptApplication.initEditMenu) {
      NativeScriptApplication.initEditMenu = true;
      // Create and add the Edit menu
      const editMenuItem = NSMenuItem.new();
      NSApp.mainMenu.addItem(editMenuItem);
      const editMenu = NSMenu.alloc().initWithTitle("Edit");
      editMenuItem.submenu = editMenu;
      // Add standard Edit menu items
      editMenu.addItemWithTitleActionKeyEquivalent("Undo", "undo:", "z");
      editMenu.addItemWithTitleActionKeyEquivalent("Redo", "redo:", "Z");
      editMenu.addItem(NSMenuItem.separatorItem());
      editMenu.addItemWithTitleActionKeyEquivalent("Cut", "cut:", "x");
      editMenu.addItemWithTitleActionKeyEquivalent("Copy", "copy:", "c");
      editMenu.addItemWithTitleActionKeyEquivalent("Paste", "paste:", "v");
      editMenu.addItemWithTitleActionKeyEquivalent(
        "Select All",
        "selectAll:",
        "a",
      );
    }
    // Ensure standard Window menu is available
    if (!NSApp.windowsMenu) {
      // Create and add the Window menu
      const windowMenuItem = NSMenuItem.new();
      NSApp.mainMenu.addItem(windowMenuItem);
      const windowMenu = NSMenu.alloc().initWithTitle("Window");
      windowMenuItem.submenu = windowMenu;

      // Add standard Window menu items
      windowMenu.addItemWithTitleActionKeyEquivalent(
        "Minimize",
        "performMiniaturize:",
        "m",
      );
      windowMenu.addItemWithTitleActionKeyEquivalent(
        "Zoom",
        "performZoom:",
        "p",
      );
      windowMenu.addItemWithTitleActionKeyEquivalent(
        "Close",
        "performClose:",
        "w",
      );
      windowMenu.addItem(NSMenuItem.separatorItem());
      windowMenu.addItemWithTitleActionKeyEquivalent(
        "Show Main Window",
        "showMainWindow",
        "0",
      );
      windowMenu.addItemWithTitleActionKeyEquivalent(
        "Bring All to Front",
        "arrangeInFront:",
        "",
      );

      // Set the windowMenu as the application's window menu for proper functionality
      NSApp.windowsMenu = windowMenu;
    }
  }
}
