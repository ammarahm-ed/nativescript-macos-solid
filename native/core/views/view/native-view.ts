import "@nativescript/macos-node-api";
import { Event } from "../../dom/dom-utils.ts";

export class MouseDownEvent extends Event {
  constructor(public nsEvent: NSEvent) {
    super("mouseDown");
  }
}

export class MouseUpEvent extends Event {
  constructor(public nsEvent: NSEvent) {
    super("mouseUp");
  }
}

export class MouseMoveEvent extends Event {
  constructor(public nsEvent: NSEvent) {
    super("mouseMove");
  }
}

export class MouseEnterEvent extends Event {
  constructor(public nsEvent: NSEvent) {
    super("mouseEnter");
  }
}

export class MouseLeaveEvent extends Event {
  constructor(public nsEvent: NSEvent) {
    super("mouseLeave");
  }
}

export class MouseDraggedEvent extends Event {
  constructor(public nsEvent: NSEvent) {
    super("mouseDragged");
  }
}

@NativeClass
export class NativeView extends NSView {
  static ObjCExposedMethods = {
    isFlipped: { returns: interop.types.bool, params: [] },
  };

  _owner: WeakRef<HTMLViewElement> | null = null;

  public static initWithOwner(owner: WeakRef<HTMLViewElement>): NativeView {
    const view = <NativeView>NativeView.new();
    view._owner = owner;
    return view;
  }


  //@ts-ignore flip
  isFlipped() {
    return true;
  }

  mouseDown(event: NSEvent): void {
    this._owner?.deref()?.dispatchEvent(new MouseDownEvent(event));
  }

  otherMouseDown(event: NSEvent): void {
    this._owner?.deref()?.dispatchEvent(new MouseDownEvent(event));
  }

  rightMouseDown(event: NSEvent): void {
    this._owner?.deref()?.dispatchEvent(new MouseDownEvent(event));
  }
  
  rightMouseUp(event: NSEvent): void {
    this._owner?.deref()?.dispatchEvent(new MouseUpEvent(event));
  }

  rightMouseDragged(event: NSEvent): void {
    this._owner?.deref()?.dispatchEvent(new MouseDraggedEvent(event));
  }

  otherMouseDragged(event: NSEvent): void {
    this._owner?.deref()?.dispatchEvent(new MouseDraggedEvent(event));
  }

  otherMouseUp(event: NSEvent): void {
    this._owner?.deref()?.dispatchEvent(new MouseUpEvent(event));
  }

  mouseUp(event: NSEvent): void {
    this._owner?.deref()?.dispatchEvent(new MouseUpEvent(event));
  }

  mouseMoved(event: NSEvent): void {
    this._owner?.deref()?.dispatchEvent(new MouseMoveEvent(event));
  }

  mouseDragged(event: NSEvent): void {
    this._owner?.deref()?.dispatchEvent(new MouseDraggedEvent(event));
  }

  mouseEntered(event: NSEvent): void {
    this._owner?.deref()?.dispatchEvent(new MouseEnterEvent(event));
  }

  mouseExited(event: NSEvent): void {
    this._owner?.deref()?.dispatchEvent(new MouseLeaveEvent(event));
  }


}
