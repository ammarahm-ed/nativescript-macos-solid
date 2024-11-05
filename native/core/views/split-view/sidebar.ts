import { view } from "../decorators/view.ts";
import { NativeView } from "../view/native-view.ts";
import { SplitViewItem } from "./split-view-item.ts";

@view({
  name: "HTMLSideBarElement",
  tagName: "side-bar",
})
export class SideBar extends SplitViewItem {
  public override initNativeView(): NSView {
    this.viewController = NSViewController.alloc().init();
    this.splitViewItem = NSSplitViewItem.sidebarWithViewController(
      this.viewController,
    );
    this.viewController.view = NativeView.new() as unknown as NSView;
    this.nativeView = this.viewController.view;
    return this.nativeView;
  }
}
