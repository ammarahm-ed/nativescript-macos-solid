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

type ToolbarIdentifier = 'docs' | 'github' | 'discord';

export class NativeWindow
  extends NSWindow
  implements NSWindowDelegate, NSToolbarDelegate
{
  static ObjCProtocols = [NSWindowDelegate, NSToolbarDelegate];
  static {
    NativeClass(this);
  }
  static ObjCExposedMethods = {
    openDocs: { returns: interop.types.void, params: [interop.types.id] },
    openGitHub: { returns: interop.types.void, params: [interop.types.id] },
    openDiscord: { returns: interop.types.void, params: [interop.types.id] },
  };

  public appWindow?: Window;
  toolbarIdentifiers: Array<ToolbarIdentifier> = ['docs', 'github', 'discord'];

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

  toolbarItemForItemIdentifierWillBeInsertedIntoToolbar(
    _toolbar: NSToolbar,
    itemIdentifier: ToolbarIdentifier,
    _flag: boolean
  ): NSToolbarItem {
    let toolbarItem: NSToolbarItem | undefined;
    switch (itemIdentifier) {
      case 'docs': {
        const view = NSView.alloc().init();
        const label = NSTextField.new();
        label.stringValue = "Docs";
        view.addSubview(label);
        toolbarItem = this.customToolbarItem(
          itemIdentifier,
          "Docs",
          "Docs",
          "Solid Docs",
          'openDocs',
          view
        );
        break;
      }
      case 'github': {
        const view = NSView.alloc().init();
        const label = NSTextField.new();
        label.stringValue = "GitHub";
        view.addSubview(label);
        toolbarItem = this.customToolbarItem(
          itemIdentifier,
          "GitHub",
          "GitHub",
          "Solid GitHub",
          'openGitHub',
          view
        );
        break;
      }
      case 'discord': {
        const view = NSView.alloc().init();
        const label = NSTextField.new();
        label.stringValue = "Discord";
        view.addSubview(label);
        toolbarItem = this.customToolbarItem(
          itemIdentifier,
          "Discord",
          "Discord",
          "Solid Community Discord",
          'openDiscord',
          view
        );
        break;
      }
      default: {
        toolbarItem = NSToolbarItem.alloc().initWithItemIdentifier(itemIdentifier);
        break;
      }
    }
    
    return toolbarItem;
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
    // const group = NSToolbarItemGroup.alloc().initWithItemIdentifier(itemIdentifier);
    // group.title = label;
    // group.label = label;
    // group.setSelectedAtIndex(true, 0);
    const toolbarItem =
      NSToolbarItem.alloc().initWithItemIdentifier(itemIdentifier);

    toolbarItem.label = label;
    toolbarItem.paletteLabel = paletteLabel;
    toolbarItem.toolTip = toolTip;
    toolbarItem.target = this;
    toolbarItem.action = action;

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

  openDocs(_id: this) {
    NSWorkspace.sharedWorkspace.openURL(NSURL.URLWithString('https://docs.solidjs.com/'));
  }

  openGitHub(_id: this) {
    NSWorkspace.sharedWorkspace.openURL(NSURL.URLWithString('https://github.com/solidjs/solid'));
  }

  openDiscord(_id: this) {
    NSWorkspace.sharedWorkspace.openURL(NSURL.URLWithString('https://discord.com/invite/solidjs'));
  }
}
