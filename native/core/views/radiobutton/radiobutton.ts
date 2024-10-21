import { view } from "../decorators/view.ts";
import { NativeButton } from "../button/native-button.ts";
import { Button } from "../button/button.ts";

@view({
  name: "HTMLButtonElement",
  tagName: "radiobutton",
})
export class RadioButton extends Button {
  public override prepareNativeView(nativeView: NativeButton): void {
    super.prepareNativeView(nativeView);
    nativeView.setButtonType(NSButtonType.Radio);
  }
}
