import { Layout } from "../../layout/index.ts";
import { view } from "../decorators/view.ts";
import { TextBase } from "./text-base.ts";

@view({
  name: "HTMLTextElement",
  tagName: "text",
})
export class Text extends TextBase {
  declare nativeView?: NSTextField;

  public initNativeView(): NSTextField {
    this.nativeView = NSTextField.new();
    return this.nativeView;
  }

  public prepareNativeView(nativeView: NSTextField): void {
    nativeView.isEditable = false;
    // nativeView.isSelectable = false;
    nativeView.drawsBackground = false;
    nativeView.isBordered = false;
  }

  updateTextContent() {
    if (this.nativeView) {
      this.nativeView.stringValue = this.textContent || "";
      this.yogaNode.markDirty();
      Layout.computeAndLayout(this);
    }
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.updateTextContent();
  }
}
