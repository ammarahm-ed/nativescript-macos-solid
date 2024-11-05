import { view } from "../decorators/view.ts";
import { MenuItem } from "./menu-item.ts";

@view({
  name: "HTMLMenuSeparatorElement",
  tagName: "menu-separator",
})
export class MenuSeparator extends MenuItem {
  declare nativeView: any;
  public initNativeView(): any {
    const separator = NSMenuItem.separatorItem();
    this.nativeView = separator;
    return this.nativeView;
  }
}
