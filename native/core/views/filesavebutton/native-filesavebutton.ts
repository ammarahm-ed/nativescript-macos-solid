import "@nativescript/macos-node-api";
import { saveFileDialog } from "../../dialogs/file/file-dialog.ts";
import { NativeButton } from "../button/native-button.ts";
import type { FileSaveButton } from "./filesavebutton.ts";
import { Event } from "../../dom/dom-utils.ts";

export class FileSaveEvent extends Event {
  declare path?: string | undefined;
  constructor(path: string | undefined, eventDict?: EventInit) {
    super("fileSave", eventDict);
    this.path = path;
  }
}

export class NativeFileSaveButton extends NativeButton {
  static ObjCExposedMethods = {
    clicked: { returns: interop.types.void, params: [interop.types.id] },
  };
  static {
    NativeClass(this);
  }
  static initWithOwner(owner: WeakRef<FileSaveButton>) {
    const button = NativeFileSaveButton.new();
    button._owner = owner;
    return button;
  }
  declare _owner?: WeakRef<FileSaveButton>;
  override clicked(_id: this) {
    const owner = this._owner?.deref();
    if (owner) {
      saveFileDialog(owner.options || {})
        .then((result) => {
          owner.dispatchEvent(new FileSaveEvent(result));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
}
