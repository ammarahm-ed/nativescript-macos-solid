import type { YogaNodeLayout } from "../../layout/index.ts";
import { native } from "../decorators/native.ts";
import { view } from "../decorators/view.ts";
import { NativeView } from "../view/native-view.ts";
import { ViewBase } from "../view/view-base.ts";

@NativeClass
class PopoverDelegate extends NSObject implements NSPopoverDelegate {
  static ObjCProtocols = [NSPopoverDelegate];

  owner?: WeakRef<Popover>;
  static initWithOwner(_owner: WeakRef<Popover>) {
    const popover = PopoverDelegate.new();
    popover.owner = _owner;
    return popover;
  }
}

@view({
  name: "HTMLPopoverElement",
  tagName: "popover",
})
export class Popover extends ViewBase {
  declare nativeView?: NSView;
  delegate?: PopoverDelegate;
  public shouldAttachToParentNativeView: boolean = false;
  isRoot: boolean = true;
  _popover?: NSPopover;

  public initNativeView(): NSView {
    this._popover = NSPopover.new();
    this.delegate = PopoverDelegate.initWithOwner(new WeakRef(this));
    this._popover.delegate = this.delegate;
    this._popover.contentViewController = NSViewController.new();
    this._popover.contentViewController.view = NativeView.new() as unknown as NSView;
    this._popover.animates = true;
    this._popover.behavior = NSPopoverBehavior.Transient;
    this.nativeView = this._popover.contentViewController.view;
    return this.nativeView;
  }

  @native({
    setNative: (view: Popover, _key, value) => {
      if (view._popover) {
        view._popover.behavior = value;
      }
    },
  })
  declare behavior: number;

  applyLayout(parentLayout?: YogaNodeLayout): void {
    super.applyLayout(parentLayout);
    if (this.nativeView && this._popover) {
      this._popover!.contentSize = this.nativeView.frame.size;
    }
  }

  showFromEvent(event: NSEvent, edge: number) {
    const point = event.locationInWindow;
    if (this._popover) {
      this._popover.showRelativeToRectOfViewPreferredEdge(
        {
          size: event.window.frame.size,
          origin: point,
        },
        event.window.contentViewController.view || event.window.contentView,
        edge || NSRectEdge.MinYEdge
      );
    }
  }

  show(fromElement?: any, edge?: number) {
    if (this._popover) {
      const fromView = fromElement || this.parentNode;
      const bounds = fromView.nativeView.bounds;
      this._popover.showRelativeToRectOfViewPreferredEdge(
        bounds,
        fromView.nativeView,
        edge || NSRectEdge.MinYEdge
      );
    }
  }

  isShown() {
    return this._popover?.isShown;
  }

  hide() {
    this._popover?.performClose(null);
  }

  @native({
    setNative: (view: Popover, _key, value) => {
      if (view._popover) {
        view._popover.animates = value;
      }
    },
  })
  declare animates: boolean;
}
