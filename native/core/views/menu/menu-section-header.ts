import { view } from "../decorators/view.ts";
import { MenuItem } from "./menu-item.ts";

@view({
  name: "HTMLMenuSectionHeaderElement",
  tagName: "menu-section-header",
})
export class MenuSectionHeader extends MenuItem {
  declare nativeView: any;
  public initNativeView(): any {
    const separator = NSMenuItem.sectionHeaderWithTitle("");
    this.nativeView = separator;
    return this.nativeView;
  }
}
