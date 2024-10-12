import "npm:@nativescript/macos-node-api@~0.1.1";
import { view } from "../decorators/view.ts";
import { ViewBase } from "./view-base.ts";

@view({
  name: "HTMLViewElement",
  tagName: "view",
})
export class View extends ViewBase {
  nativeView?: NSView = undefined;
  public initNativeView(): NSView | undefined {
    this.nativeView = NSView.alloc().init();
    return this.nativeView;
  }

  public disposeNativeView(): void {
    if (!this.nativeView?.superview) {

      this.nativeView?.dealloc();
      this.nativeView = undefined;
    } else {
      console.warn(
        "Trying to dispose a view that is still attached to it's parent",
        new Error().stack
      );
    }
  }
}
