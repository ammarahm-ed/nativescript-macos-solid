import "@nativescript/macos-node-api";
import { Event } from "../../dom/dom-utils.ts";
import type { ComboBox } from "./combobox.ts";

export class ComboBoxChangeEvent extends Event {
  index: number;
  constructor(index: number, eventDict?: EventInit) {
    super("change", eventDict);
    this.index = index;
  }
}

@NativeClass
export class NativeComboBoxDelegate extends NSObject
  implements NSComboBoxDelegate {
  static ObjCProtocols = [NSComboBoxDelegate];

  declare _owner: WeakRef<NativeComboBox>;
  static initWithOwner(owner: WeakRef<NativeComboBox>) {
    const delegate = NativeComboBoxDelegate.new();
    delegate._owner = owner;
    return delegate;
  }

  comboBoxSelectionDidChange(_notification: NSNotification) {
    const owner = this._owner?.deref();
    if (owner) {
      owner.itemChange();
    }
  }
}

@NativeClass
export class NativeComboBox extends NSComboBox {
  _items?: Array<string>;
  _owner?: WeakRef<ComboBox>;
  static initWithOwner(owner: WeakRef<ComboBox>) {
    const combobox = NativeComboBox.new();
    combobox._owner = owner;
    return combobox;
  }

  itemChange() {
    const owner = this._owner?.deref();
    if (owner) {
      owner.dispatchEvent(new ComboBoxChangeEvent(this.indexOfSelectedItem));
    }
  }

  setItems(items: Array<string>) {
    this._items = items;
    this.removeAllItems();
    this.addItemsWithObjectValues(items);
    const owner = this._owner?.deref();
    if (owner) {
      if (typeof owner.selectedIndex === "number") {
        this.selectItemAtIndex(owner.selectedIndex);
      }
    }
  }
}
