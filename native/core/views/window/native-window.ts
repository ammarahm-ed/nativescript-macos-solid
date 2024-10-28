import "@nativescript/macos-node-api";
import { createEvent, Event } from "../../dom/dom-utils.ts";
import type { Window } from "./window.ts";
import type { ViewBase } from "../view/view-base.ts";

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

@NativeClass
export class MainWindowController
  extends NSWindowController
  implements NSToolbarDelegate
{
  static ObjCProtocols = [NSToolbarDelegate];

  declare _owner: WeakRef<ViewBase>;

  static initWithOwner(owner: WeakRef<ViewBase>) {
    const win = MainWindowController.new();
    win._owner = owner;
    return win;
  }
}

export class NativeWindow extends NSWindow implements NSWindowDelegate {
  static ObjCProtocols = [NSWindowDelegate];
  static {
    NativeClass(this);
  }

  public owner?: WeakRef<Window>;

  windowDidResize(_notification: NSNotification): void {
    const event = new WindowResizeEvent();
    event.initWindowEvent(
      "resize",
      true,
      true,
      this.frame.size.width,
      this.frame.size.height
    );
    this.owner?.deref()?.dispatchEvent(event);
  }

  windowDidBecomeKey(_notification: NSNotification): void {
    const event = createEvent("focus");
    this.owner?.deref()?.dispatchEvent(event);
  }

  windowWillClose(_notification: NSNotification): void {
    const event = createEvent("close");
    const currentWindow = this.owner?.deref();
    currentWindow?.dispatchEvent(event);
    NSApp.stop(this);
    currentWindow!._modalCode = undefined;
    // Find parent window and bring it to front.
    let window = null;
    let currentNode: any = currentWindow?.parentNode;
    while (window == null && currentNode !== null) {
      if (currentNode.nodeName === "WINDOW") {
        window = currentNode.nativeView;
        break;
      }
      currentNode = currentNode.parentNode;
    }
    if (window) {
      window.makeKeyAndOrderFront(null);
    }
  }
}
