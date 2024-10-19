import { FlexStyle } from "../../layout/index.ts";
import type { StylePropertyConfig } from "../../style/index.ts";
import { parsePercent } from "../../style/utils/parse.ts";
import { overrides } from "../decorators/overrides.ts";
import { view } from "../decorators/view.ts";
import { ViewBase } from "../view/view-base.ts";

@view({
  name: "HTMLSplitViewItemElement",
  tagName: "split-view-item",
})
export class SplitViewItem extends ViewBase {
  override nativeView?: NSView = undefined;
  splitViewItem?: NSSplitViewItem;
  /**
   * This is the root of flexbox layout.
   */
  override isRoot: boolean = true;

  public override initNativeView() {
    this.viewController = NSViewController.alloc().init();
    this.splitViewItem = NSSplitViewItem.splitViewItemWithViewController(
      this.viewController,
    );
    this.nativeView = this.viewController.view;
    return this.nativeView;
  }

  public adjustSize() {
    if (this.viewController) {
      const { width, height } = this.viewController.view?.superview?.frame
        .size || { width: 0, height: 0 };
      this.style.width = width;
      this.style.height = height;
    }
  }

  @overrides("width")
  setWidth(
    key: string,
    value: FlexStyle["width"],
    config: StylePropertyConfig,
  ) {
    const width = this.getValue("width", value);
    config.setNative(this.style, key, width, config);
  }

  @overrides("height")
  setHeight(
    key: string,
    value: FlexStyle["height"],
    config: StylePropertyConfig,
  ) {
    const height = this.getValue("height", value);
    config.setNative(this.style, key, height, config);
  }

  @overrides("minWidth")
  setMinWidth(
    _key: string,
    value: FlexStyle["minWidth"],
    _config: StylePropertyConfig,
  ) {
    // config.setNative(this.style, key, value, config);
    // if (this.nativeView) {
    //   this.nativeView.widthAnchor.constraintGreaterThanOrEqualToConstant(
    //     this.getValue("width", value)
    //   ).isActive = true;
    // }
    if (this.splitViewItem) {
      this.splitViewItem.minimumThickness = this.getValue("width", value);
    }
  }

  @overrides("maxWidth")
  setMaxWidth(
    _key: string,
    value: FlexStyle["maxWidth"],
    _config: StylePropertyConfig,
  ) {
    // config.setNative(this.style, key, value, config);
    // if (this.nativeView) {
    //   this.nativeView.widthAnchor.constraintLessThanOrEqualToConstant(
    //     this.getValue("width", value),
    //   ).isActive = true;
    //   this.adjustSize();
    // }
    if (this.splitViewItem) {
      this.splitViewItem.maximumThickness = this.getValue("width", value);
    }
  }

  @overrides("minHeight")
  setMinHeight(
    _key: string,
    value: FlexStyle["minHeight"],
    _config: StylePropertyConfig,
  ) {
    // config.setNative(this.style, key, value, config);
    if (this.nativeView) {
      this.nativeView.heightAnchor.constraintGreaterThanOrEqualToConstant(
        this.getValue("height", value),
      ).isActive = true;
    }
  }

  @overrides("maxHeight")
  setMaxHeight(
    _key: string,
    value: FlexStyle["maxHeight"],
    _config: StylePropertyConfig,
  ) {
    // config.setNative(this.style, key, value, config);
    if (this.nativeView) {
      this.nativeView.heightAnchor.constraintLessThanOrEqualToConstant(
        this.getValue("height", value),
      ).isActive = true;
      this.adjustSize();
    }
  }

  getValue(type: "width" | "height", value: FlexStyle["width"]) {
    if (typeof value === "number") return value;
    if (value?.endsWith("%")) {
      const parentWidth = this.getParentDimension(type);
      const percentValue = parsePercent(value);
      return (parentWidth * percentValue) / 100;
    }
    return this.nativeView?.superview?.frame?.size[type] || 0;
  }

  getParentDimension(type: "width" | "height") {
    return (
      (this.parentNode as HTMLViewElement).nativeView?.frame.size[type] ||
      NativeScriptApplication.window.nativeView?.frame.size[type] || 0
    );

  }
}
