import { Button } from "../button/button.ts";
import { NativeButton } from "../button/native-button.ts";
import { native } from "../decorators/native.ts";
import { view } from "../decorators/view.ts";

@view({
  name: "HTMLButtonElement",
  tagName: "checkbox",
})
export class Checkbox extends Button {
  public override prepareNativeView(nativeView: NativeButton): void {
    super.prepareNativeView(nativeView);
    nativeView.setButtonType(NSButtonType.Switch);
    nativeView.title = "";
  }

  public isChecked(): boolean {
    return this.nativeView?.state === NSControlStateValueOn;
  }

  @native({
    setNative: (view: Checkbox, _key, value) => {
      if (view.nativeView) {
        view.nativeView.state = value
          ? NSControlStateValueOn
          : NSControlStateValueOff;
      }
    },
  })
  declare checked: boolean;
}
