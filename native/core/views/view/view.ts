import "@nativescript/macos-node-api";
import { view } from "../decorators/view.ts";
import { NativeView } from "./native-view.ts";
import { ViewBase } from "./view-base.ts";

@view({
  name: "HTMLViewElement",
  tagName: "view",
})
export class View extends ViewBase {
  override nativeView?: NSView = undefined;
  public override initNativeView(): NSView | undefined {
    // @ts-ignore type
    this.nativeView = NativeView.initWithOwner(new WeakRef(this));

    return this.nativeView;
  }
}
