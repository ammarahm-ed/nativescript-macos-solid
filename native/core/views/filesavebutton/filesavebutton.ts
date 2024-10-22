import { view } from "../decorators/view.ts";
import type { SaveFileDialogOptions } from '../../dialogs/file/file-dialog.ts';
import { Button } from "../button/button.ts";
import { NativeFileSaveButton } from "./native-filesavebutton.ts";

@view({
  name: "HTMLButtonElement",
  tagName: "filesavebutton",
})
export class FileSaveButton extends Button {
  options?: SaveFileDialogOptions;

  declare nativeView?: NativeFileSaveButton;

  public override initNativeView(): NativeFileSaveButton {
    this.nativeView = NativeFileSaveButton.initWithOwner(new WeakRef(this));
    return this.nativeView;
  }
}
