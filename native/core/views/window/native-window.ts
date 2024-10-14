import "npm:@nativescript/macos-node-api@~0.1.1";
import { createEvent, Event } from "../../dom/dom-utils.ts";
import type { Window } from "./window.ts";

export class WindowResizeEvent extends Event {
  declare width: number;
  declare height: number;

  constructor() {
    super("resize");
  }

  initWindowEvent(
    type: string,
    bubbles?: boolean,
    cancelable?: boolean,
    width: number = 0,
    height: number = 0
  ): void {
    this.initEvent(type, bubbles, cancelable);
    this.width = width;
    this.height = height;
  }
}

type ToolbarIdentifier = "flexibleSpace" | "view" | "misc"; // "docs" | "github" | "discord";

@NativeClass
export class MainWindowController
  extends NSWindowController
  implements NSToolbarDelegate, NSSearchFieldDelegate
{
  static ObjCProtocols = [NSToolbarDelegate, NSSearchFieldDelegate];
  static {
    NativeClass(this);
  }
  static ObjCExposedMethods = {
    openDocs: { returns: interop.types.void, params: [interop.types.id] },
    openGitHub: { returns: interop.types.void, params: [interop.types.id] },
    openDiscord: { returns: interop.types.void, params: [interop.types.id] },
    toolbarViewTypeDidSelectItem: {
      returns: interop.types.void,
      params: [interop.types.id],
    },
    toolbarMiscDidSelectItem: {
      returns: interop.types.void,
      params: [interop.types.id],
    },
  };
  toolbarIdentifiers: Array<ToolbarIdentifier> = [
    "flexibleSpace",
    "view",
    "flexibleSpace",
    "misc",
    // "docs",
    // "github",
    // "discord",
  ];
  declare toolbar: NSToolbar;

  configureToolbar() {
    const win = this.window;
    if (win) {
      this.toolbar = NSToolbar.alloc().initWithIdentifier("MainWindowToolbar");
      this.toolbar.delegate = this;
      // this.toolbar.allowsUserCustomization = true;
      // this.toolbar.autosavesConfiguration = true;
      this.toolbar.displayMode = NSToolbarDisplayMode.Default;

      // Example on center-pinning a toolbar item
      // newToolbar.centeredItemIdentifier = NSToolbarItem.Identifier.toolbarPickerItem

      win.title = "Solid macOS";
      win.subtitle = "Develop macOS with Solid";
      // The toolbar style is best set to .automatic
      // But it appears to go as .unifiedCompact if
      // you set as .automatic and titleVisibility as
      // .hidden
      win.toolbarStyle = NSWindowToolbarStyle.Automatic;

      // Set this property to .hidden to gain more toolbar space
      win.titleVisibility = NSWindowTitleVisibility.Visible;

      win.toolbar = this.toolbar;
      win.toolbar?.validateVisibleItems();
    }
  }

  validateToolbarItem(item: NSToolbarItem): boolean {
    // console.log(`Validating ${item.itemIdentifier}`);

    // Use this method to enable/disable toolbar items as user takes certain
    // actions. For example, so items may not be applicable if a certain UI
    // element is selected. This is called on your behalf. Return false if
    // the toolbar item needs to be disabled.

    //  Maybe you want to not enable more actions if nothing in your app
    //  is selected. Set your condition inside this `if`.
    // if (item.itemIdentifier == NSToolbarItem.Identifier.toolbarMoreActions) {
    //   return true;
    // }

    // //  Maybe you want to not enable the share menu if nothing in your app
    // //  is selected. Set your condition inside this `if`.
    // if (
    //   item.itemIdentifier == NSToolbarItem.Identifier.toolbarShareButtonItem
    // ) {
    //   return true;
    // }

    // //  Return false (to disable) this toolbar item if we never create a
    // //  titlebar accessory view. This is an example of a conditional
    // //  example.
    // if (
    //   item.itemIdentifier ==
    //   NSToolbarItem.Identifier.toolbarItemToggleTitlebarAccessory
    // ) {
    //   return self.titlebarAccessoryViewController != nil;
    // }

    // //  Example of returning false to demonstrate a disabled toolbar item.
    // if (item.itemIdentifier == NSToolbarItem.Identifier.toolbarItemMoreInfo) {
    //   return false;
    // }

    //  Feel free to add more conditions for your other toolbar items here...

    return true;
  }

  toolbarItemForItemIdentifierWillBeInsertedIntoToolbar(
    _toolbar: NSToolbar,
    itemIdentifier: ToolbarIdentifier,
    _flag: boolean
  ): NSToolbarItem {
    console.log(
      "toolbarItemForItemIdentifierWillBeInsertedIntoToolbar:",
      itemIdentifier
    );
    let toolbarItem: NSToolbarItem | undefined;
    switch (itemIdentifier) {
      case "view": {
        const titles = ["Building", "Examples", "Credits"];

        // This will either be a segmented control or a drop down depending
        // on your available space.
        //
        // NOTE: When you set the target as nil and use the string method
        // to define the Selector, it will go down the Responder Chain,
        // which in this app, this method is in AppDelegate. Neat!
        toolbarItem =
          NSToolbarItemGroup.groupWithItemIdentifierTitlesSelectionModeLabelsTargetAction(
            itemIdentifier,
            titles,
            NSToolbarItemGroupSelectionMode.SelectOne,
            titles,
            this,
            "toolbarViewTypeDidSelectItem"
          );
        (toolbarItem as NSToolbarItemGroup).controlRepresentation =
          NSToolbarItemGroupControlRepresentation.Automatic;
        (toolbarItem as NSToolbarItemGroup).selectionMode =
          NSToolbarItemGroupSelectionMode.SelectOne;
        toolbarItem.label = "View";
        toolbarItem.paletteLabel = "View";
        toolbarItem.toolTip = "Change the selected view";
        (toolbarItem as NSToolbarItemGroup).selectedIndex = 0;
        break;
      }
      case "misc": {
        const miscTitles = ["Docs", "GitHub", "Discord"];
        toolbarItem =
          NSToolbarItemGroup.groupWithItemIdentifierTitlesSelectionModeLabelsTargetAction(
            itemIdentifier,
            miscTitles,
            NSToolbarItemGroupSelectionMode.Momentary,
            miscTitles,
            this,
            "toolbarMiscDidSelectItem"
          );
        (toolbarItem as NSToolbarItemGroup).controlRepresentation =
          NSToolbarItemGroupControlRepresentation.Automatic;
        (toolbarItem as NSToolbarItemGroup).selectionMode =
          NSToolbarItemGroupSelectionMode.Momentary;
        toolbarItem.label = "Learn More";
        toolbarItem.paletteLabel = "Learn More";
        toolbarItem.toolTip = "Continue your learning";
        break;
      }
      // case "docs": {
      //   const view = NSView.alloc().init();
      //   const label = NSTextField.new();
      //   label.stringValue = "Docs";
      //   view.addSubview(label);
      //   toolbarItem = this.customToolbarItem(
      //     itemIdentifier,
      //     "Docs",
      //     "Docs",
      //     "Solid Docs",
      //     "openDocs",
      //     view
      //   );
      //   break;
      // }
      // case "github": {
      //   const view = NSView.alloc().init();
      //   const label = NSTextField.new();
      //   label.stringValue = "GitHub";
      //   view.addSubview(label);
      //   toolbarItem = this.customToolbarItem(
      //     itemIdentifier,
      //     "GitHub",
      //     "GitHub",
      //     "Solid GitHub",
      //     "openGitHub",
      //     view
      //   );
      //   break;
      // }
      // case "discord": {
      //   const view = NSView.alloc().init();
      //   const label = NSTextField.new();
      //   label.stringValue = "Discord";
      //   view.addSubview(label);
      //   toolbarItem = this.customToolbarItem(
      //     itemIdentifier,
      //     "Discord",
      //     "Discord",
      //     "Solid Community Discord",
      //     "openDiscord",
      //     view
      //   );
      //   break;
      // }
      default: {
        toolbarItem =
          NSToolbarItem.alloc().initWithItemIdentifier(itemIdentifier);
        break;
      }
    }

    return toolbarItem;
  }

  toolbarViewTypeDidSelectItem(sender: NSToolbarItemGroup) {
    console.log(`toolbar item group selected index: ${sender.selectedIndex}`);
    switch (sender.selectedIndex) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
    }
  }

  toolbarMiscDidSelectItem(sender: NSToolbarItemGroup) {
    console.log(`toolbar item group selected index: ${sender.selectedIndex}`);
    switch (sender.selectedIndex) {
      case 0:
        this.openDocs();
        break;
      case 1:
        this.openGitHub();
        break;
      case 2:
        this.openDiscord();
        break;
    }
  }

  toolbarDefaultItemIdentifiers(_toolbar: NSToolbar): NSArray {
    return this.toolbarIdentifiers as any;
  }

  toolbarAllowedItemIdentifiers(toolbar: NSToolbar): NSArray {
    return this.toolbarDefaultItemIdentifiers(toolbar);
  }

  customToolbarItem(
    itemIdentifier: string,
    label: string,
    paletteLabel: string,
    toolTip: string,
    action: string,
    itemContent: any
  ): NSToolbarItem {
    const toolbarItem =
      NSToolbarItem.alloc().initWithItemIdentifier(itemIdentifier);

    toolbarItem.label = label;
    toolbarItem.paletteLabel = paletteLabel;
    toolbarItem.toolTip = toolTip;
    toolbarItem.target = this;
    toolbarItem.action = action;
    toolbarItem.isBordered = true;

    // Set the right attribute, depending on if we were given an image or a view.
    if (itemContent instanceof NSImage) {
      toolbarItem.image = itemContent;
    } else if (itemContent instanceof NSView) {
      toolbarItem.view = itemContent;
    }

    // We actually need an NSMenuItem here, so we construct one.
    const menuItem: NSMenuItem = NSMenuItem.new();
    // @ts-ignore: typings
    menuItem.submenu = null;
    menuItem.title = label;
    toolbarItem.menuFormRepresentation = menuItem;

    return toolbarItem;
  }

  openDocs() {
    NSWorkspace.sharedWorkspace.openURL(
      NSURL.URLWithString("https://docs.solidjs.com/")
    );
  }

  openGitHub() {
    NSWorkspace.sharedWorkspace.openURL(
      NSURL.URLWithString("https://github.com/solidjs/solid")
    );
  }

  openDiscord() {
    NSWorkspace.sharedWorkspace.openURL(
      NSURL.URLWithString("https://discord.com/invite/solidjs")
    );
  }

  searchFieldDidStartSearching(_sender: NSSearchField): void {
    console.log("searchFieldDidStartSearching");
  }

  searchFieldDidEndSearching(sender: NSSearchField): void {
    console.log("searchFieldDidEndSearching");
    sender.resignFirstResponder();
  }
}

export class NativeWindow extends NSWindow implements NSWindowDelegate {
  static ObjCProtocols = [NSWindowDelegate];
  static {
    NativeClass(this);
  }

  public appWindow?: Window;

  windowDidResize(_notification: NSNotification): void {
    const event = new WindowResizeEvent();
    event.initWindowEvent(
      "resize",
      true,
      true,
      this.frame.size.width,
      this.frame.size.height
    );
    this.appWindow?.dispatchEvent(event);
  }

  windowDidBecomeKey(_notification: NSNotification): void {
    const event = createEvent("focus");
    this.appWindow?.dispatchEvent(event);
  }

  windowWillClose(_notification: NSNotification): void {
    const event = createEvent("close");
    this.appWindow?.dispatchEvent(event);
  }
}
