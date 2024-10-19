import { native } from "../decorators/native.ts";
import type { NativePropertyConfig } from "../decorators/native.ts";
import { view } from "../decorators/view.ts";
import { ViewBase } from "../view/view-base.ts";
import { NativeComboBox, NativeComboBoxDelegate } from "./native-combobox.ts";

const ItemsProperty: NativePropertyConfig = {
  setNative: (view: ComboBox, _key, value) => {
    if (view.nativeView) {
      view.nativeView.setItems(value);
    }
  },
  shouldLayout: true,
};

@view({
  name: "HTMLElement",
  tagName: "combobox",
})
export class ComboBox extends ViewBase {
  declare nativeView?: NativeComboBox;
  selectedIndex?: number;
  delegate?: NativeComboBoxDelegate;

  override get isLeaf(): boolean {
    return true;
  }

  public override initNativeView(): NativeComboBox {
    this.nativeView = NativeComboBox.initWithOwner(new WeakRef(this));
    this.delegate = NativeComboBoxDelegate.initWithOwner(new WeakRef(this.nativeView));
    this.nativeView.delegate = this.delegate;
    return this.nativeView;
  }

  @native(ItemsProperty)
  declare items: Array<string>;
}
