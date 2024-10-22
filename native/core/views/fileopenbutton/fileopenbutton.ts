import { view } from "../decorators/view.ts";
import type { FileDialogOptions } from '../../dialogs/file/file-dialog.ts';
import { Button } from "../button/button.ts";
import { NativeFileOpenButton } from "./native-fileopenbutton.ts";

@view({
  name: "HTMLButtonElement",
  tagName: "fileopenbutton",
})
export class FileOpenButton extends Button {
  options?: FileDialogOptions;

  declare nativeView?: NativeFileOpenButton;

  public override initNativeView(): NativeFileOpenButton {
    this.nativeView = NativeFileOpenButton.initWithOwner(new WeakRef(this));
    return this.nativeView;
  }
}
