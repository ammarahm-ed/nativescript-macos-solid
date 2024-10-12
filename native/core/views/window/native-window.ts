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
