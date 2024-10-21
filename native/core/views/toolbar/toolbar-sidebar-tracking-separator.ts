import "@nativescript/macos-node-api";
import { view } from "../decorators/view.ts";
import { ViewBase } from "../view/view-base.ts";

@view({
  name: "HTMLToolbarSidebarTrackingSeparatorElement",
  tagName: "toolbar-sidebar-tracking-separator",
})
export class ToolbarSidebarTrackingSeparator extends ViewBase {
  override nativeView?: NSToolbarItem = undefined;

  public override initNativeView(): NSToolbarItem | undefined {
    this.nativeView = NSToolbarItem.alloc().initWithItemIdentifier(
      NSToolbarSidebarTrackingSeparatorItemIdentifier,
    );
    return this.nativeView;
  }

  public override disposeNativeView(): void {
    this.nativeView = undefined;
  }
}
