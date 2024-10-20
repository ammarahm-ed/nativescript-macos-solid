import "npm:@nativescript/macos-node-api@~0.1.1";
import { view } from "../decorators/view.ts";
import { ViewBase } from "../view/view-base.ts";
import type { ToolbarItem } from "./toolbar-item.ts";
import { ToolbarEvent } from "../window/native-window.ts";
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
    // Use this method to enable/disable toolbar items as user takes certain
    // actions. For example, so items may not be applicable if a certain UI
    // element is selected. This is called on your behalf. Return false if
    // the toolbar item needs to be disabled.

    // Maybe you want to not enable more actions if nothing in your app
    // is selected. Set your condition inside this `if`.
    // if (item.itemIdentifier == NSToolbarItem.Identifier.toolbarMoreActions) {
    //   return true;
    // }

    // Return false (to disable) this toolbar item if we never create a
    // titlebar accessory view. This is an example of a conditional
    // example.
    // if (
    //   item.itemIdentifier ==
    //   NSToolbarItem.Identifier.toolbarItemToggleTitlebarAccessory
    // ) {
    //   return self.titlebarAccessoryViewController != nil;
    // }

    // Example of returning false to demonstrate a disabled toolbar item.
    // if (item.itemIdentifier == NSToolbarItem.Identifier.toolbarItemMoreInfo) {
    //   return false;
    // }

    //  Feel free to add more conditions for your other toolbar items here...

    return true;
  }

  toolbarItemForItemIdentifierWillBeInsertedIntoToolbar(
    _toolbar: NSToolbar,
    itemIdentifier: string,
    _flag: boolean,
  ): NSToolbarItem {
    return this.items.find((item) => item.itemIdentifier === itemIdentifier)!;

    // let toolbarItem: NSToolbarItem | undefined;
    // switch (itemIdentifier) {
    //   case "view": {
    //     const titles = ["Building", "Examples", "Credits"];
    //     toolbarItem =
    //       NSToolbarItemGroup.groupWithItemIdentifierTitlesSelectionModeLabelsTargetAction(
    //         itemIdentifier,
    //         titles,
    //         NSToolbarItemGroupSelectionMode.SelectOne,
    //         titles,
    //         this,
    //         "toolbarViewTypeDidSelectItem"
    //       );
    //     (toolbarItem as NSToolbarItemGroup).controlRepresentation =
    //       NSToolbarItemGroupControlRepresentation.Automatic;
    //     (toolbarItem as NSToolbarItemGroup).selectionMode =
    //       NSToolbarItemGroupSelectionMode.SelectOne;
    //     toolbarItem.label = "View";
    //     toolbarItem.paletteLabel = "View";
    //     toolbarItem.toolTip = "Change the selected view";
    //     (toolbarItem as NSToolbarItemGroup).selectedIndex = 0;
    //     break;
    //   }
    //   case "misc": {
    //     const miscTitles = ["Docs", "GitHub", "Discord"];
    //     toolbarItem =
    //       NSToolbarItemGroup.groupWithItemIdentifierTitlesSelectionModeLabelsTargetAction(
    //         itemIdentifier,
    //         miscTitles,
    //         NSToolbarItemGroupSelectionMode.Momentary,
    //         miscTitles,
    //         this,
    //         "toolbarMiscDidSelectItem"
    //       );
    //     (toolbarItem as NSToolbarItemGroup).controlRepresentation =
    //       NSToolbarItemGroupControlRepresentation.Automatic;
    //     (toolbarItem as NSToolbarItemGroup).selectionMode =
    //       NSToolbarItemGroupSelectionMode.Momentary;
    //     toolbarItem.label = "Learn More";
    //     toolbarItem.paletteLabel = "Learn More";
    //     toolbarItem.toolTip = "Continue your learning";
    //     break;
    //   }
    //   default: {
    //     toolbarItem =
    //       NSToolbarItem.alloc().initWithItemIdentifier(itemIdentifier);
    //     break;
    //   }
    // }

    // return toolbarItem;
  }

  toolbarViewTypeDidSelectItem(sender: NSToolbarItemGroup) {
    const owner = this._owner?.deref();
    if (owner) {
      owner.dispatchEvent(new ToolbarEvent(sender.selectedIndex));
    }
  }

  // toolbarMiscDidSelectItem(sender: NSToolbarItemGroup) {
  //   console.log(
  //     `toolbarMiscDidSelectItem selected index: ${sender.selectedIndex}`
  //   );
  //   switch (sender.selectedIndex) {
  //     case 0:
  //       this.openDocs();
  //       break;
  //     case 1:
  //       this.openGitHub();
  //       break;
  //     case 2:
  //       this.openDiscord();
  //       break;
  //   }
  // }

  toolbarDefaultItemIdentifiers(_toolbar: NSToolbar): NSArray {
    console.log(
      "toolbarDefaultItemIdentifiers",
      this.items.map((item) => item.itemIdentifier),
    );
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
    console.log(child.nativeView);
    if (
      child.nodeName === "TOOLBAR-ITEM" ||
      child.nodeName === "TOOLBAR-TOGGLE-SIDEBAR" ||
      child.nodeName === "TOOLBAR-SIDEBAR-TRACKING-SEPARATOR" ||
      child.nodeName === "TOOLBAR-FLEXIBLE-SPACE"
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
      child.nodeName === "TOOLBAR-FLEXIBLE-SPACE"
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
