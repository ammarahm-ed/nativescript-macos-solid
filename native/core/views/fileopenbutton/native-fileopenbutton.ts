import "@nativescript/macos-node-api";
import { openFileDialog } from "../../dialogs/file/file-dialog.ts";
import { NativeButton } from "../button/native-button.ts";
import type { FileOpenButton } from "./fileopenbutton.ts";
import { Event } from "../../dom/dom-utils.ts";

export class FileChosenEvent extends Event {
  declare paths?: (string | null)[];
  constructor(paths: (string | null)[], eventDict?: EventInit) {
    super("fileChosen", eventDict);
    this.paths = paths;
  }
}

@NativeClass
export class NativeFileOpenButton extends NativeButton {
  static ObjCExposedMethods = {
    clicked: { returns: interop.types.void, params: [interop.types.id] },
  };
  static initWithOwner(owner: WeakRef<FileOpenButton>) {
    const button = NativeFileOpenButton.new();
    button._owner = owner;
    return button;
  }
  declare _owner?: WeakRef<FileOpenButton>;
  override clicked(_id: this) {
    const owner = this._owner?.deref();
    if (owner) {
      openFileDialog(owner.options || {})
        .then((result) => {
          owner.dispatchEvent(new FileChosenEvent(result));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
}
