import "@nativescript/macos-node-api";
import { view } from "../decorators/view.ts";
import { ViewBase } from "../view/view-base.ts";
import type { ToolbarItem } from "./toolbar-item.ts";
import type { ToolbarToggleSidebar } from "./toolbar-toggle-sidebar.ts";
import type { ToolbarSidebarTrackingSeparator } from "./toolbar-sidebar-tracking-separator.ts";

@NativeClass
class ToolbarDelegate extends NSObject implements NSToolbarDelegate {
  static ObjCProtocols = [NSToolbarDelegate];

  items: NSToolbarItem[] = [];

  _owner: WeakRef<Toolbar> | undefined;

  static initWithOwner(owner: WeakRef<Toolbar>): ToolbarDelegate {
    const delegate = ToolbarDelegate.new() as ToolbarDelegate;
    delegate._owner = owner;
    return delegate;
  }

  validateToolbarItem(_item: NSToolbarItem): boolean {
    return true;
  }

  toolbarItemForItemIdentifierWillBeInsertedIntoToolbar(
    _toolbar: NSToolbar,
    itemIdentifier: string,
    _flag: boolean,
  ): NSToolbarItem {
    return this.items.find((item) => item.itemIdentifier === itemIdentifier)!;
  }

  toolbarDefaultItemIdentifiers(_toolbar: NSToolbar): NSArray {
    return this.items.map((item) => item.itemIdentifier) as any;
  }

  toolbarAllowedItemIdentifiers(toolbar: NSToolbar): NSArray {
    return this.toolbarDefaultItemIdentifiers(toolbar);
  }
}

@view({
  name: "HTMLToolbarElement",
  tagName: "toolbar",
})
export class Toolbar extends ViewBase {
  _isEnabled: boolean = false;

  override nativeView?: NSToolbar = undefined;

  toolbarDelegate?: ToolbarDelegate;

  public override initNativeView(): NSToolbar | undefined {
    this.nativeView = NSToolbar.new();
    this.toolbarDelegate = ToolbarDelegate.initWithOwner(new WeakRef(this));
    this.nativeView.delegate = this.toolbarDelegate;
    this.nativeView.displayMode = NSToolbarDisplayMode.IconOnly;
    return this.nativeView;
  }

  public override disposeNativeView(): void {
    this.nativeView = undefined;
  }

  public reloadToolbar(): void {
    this.nativeView?.validateVisibleItems();
  }

  public addNativeChild(
    child: ToolbarItem | ToolbarToggleSidebar | ToolbarSidebarTrackingSeparator,
  ): void {
    if (
      child.nodeName === "TOOLBAR-ITEM" ||
      child.nodeName === "TOOLBAR-TOGGLE-SIDEBAR" ||
      child.nodeName === "TOOLBAR-SIDEBAR-TRACKING-SEPARATOR" ||
      child.nodeName === "TOOLBAR-FLEXIBLE-SPACE" ||
      child.nodeName === "TOOLBAR-GROUP"
    ) {
      this.toolbarDelegate!.items.push(child.nativeView!);
      this.reloadToolbar();
    } else {
      throw new Error(
        `Invalid child type added to toolbar: ${child.nodeName}`,
      );
    }
  }

  public removeNativeChild(child: any): void {
    if (
      child.nodeName === "TOOLBAR-ITEM" ||
      child.nodeName === "TOOLBAR-TOGGLE-SIDEBAR" ||
      child.nodeName === "TOOLBAR-SIDEBAR-TRACKING-SEPARATOR" ||
      child.nodeName === "TOOLBAR-FLEXIBLE-SPACE" ||
      child.nodeName === "TOOLBAR-GROUP"
    ) {
      const index = this.toolbarDelegate!.items.indexOf(child.nativeView!);
      if (index !== -1) {
        this.toolbarDelegate!.items.splice(index, 1);
        this.reloadToolbar();
      }
    } else {
      throw new Error(
        `Invalid child type removed from toolbar: ${child.nodeName}`,
      );
    }
  }
}
