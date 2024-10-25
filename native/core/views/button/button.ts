import { Layout, type YogaNodeLayout } from "../../layout/index.ts";
import { Color } from "../../style/utils/color.ts";
import type { NativePropertyConfig } from "../decorators/native.ts";
import { native } from "../decorators/native.ts";
import { overrides } from "../decorators/overrides.ts";
import { view } from "../decorators/view.ts";
import { TextBase } from "../text/text-base.ts";
import { NativeButton } from "./native-button.ts";

const TitleProperty: NativePropertyConfig = {
  setNative: (view: Button, _key, value) => {
    if (view.nativeView && !view.firstChild) {
      view.nativeView.setTitle(value || "");
    }
  },
  shouldLayout: true,
};

export type ButtonEvents = "click";

@view({
  name: "HTMLButtonElement",
  tagName: "button",
})
export class Button extends TextBase {
  override supportedNodeTypes = [Node.TEXT_NODE];
  declare nativeView?: NativeButton;

  override get isLeaf(): boolean {
    return true;
  }

  public override initNativeView(): NativeButton {
    this.nativeView = NativeButton.initWithOwner(new WeakRef(this));
    return this.nativeView;
  }

  public override prepareNativeView(nativeView: NativeButton): void {
    nativeView.target = this.nativeView;
    nativeView.action = "clicked";
    nativeView.bezelStyle = NSBezelStyle.Automatic;
  }

  override updateTextContent() {
    if (this.nativeView && this.firstChild) {
      this.nativeView.setTitle(this.textContent || "");
      Layout.computeAndLayout(this);
    }
  }

  @native(TitleProperty)
  declare title: string;

  @overrides("color")
  setColor(key: string, value: string, config: NativePropertyConfig<string>) {
    const nativeValue = config.converter?.toNative?.(key, value) as
      | NSColor
      | undefined;
    if (nativeValue && this.nativeView) {
      this.nativeView.setTitleColor(nativeValue);
    }
  }

  @overrides("backgroundColor")
  setBackgroundColor(
    _key: string,
    value: string,
    _config: NativePropertyConfig<string>,
  ) {
    if (this.nativeView) {
      const nativeValue = !value ? undefined : new Color(value).toNSColor();
      this.nativeView.bezelColor = nativeValue || NSColor.lightGrayColor;

      if (
        this.nativeView.bezelStyle === NSBezelStyle.TexturedSquare ||
        this.nativeView.bezelStyle === NSBezelStyle.Rounded
      ) {
        this.nativeView.wantsLayer = true;
        this.nativeView.layer.backgroundColor = nativeValue?.CGColor as any;
      }
    }
  }

  @native({
    setNative(view: Button, _key, value) {
      if (view.nativeView) {
        view.nativeView.bezelStyle = value;
      }
    },
  })
  declare bezelStyle: number;

  @native({
    setNative(view: Button, _key, value) {
      if (view.nativeView) {
        view.nativeView.setButtonType(value);
      }
    },
  })
  declare buttonType: number;

  onMeasureFunction(
    width: number,
    widthMode: any,
    height: number,
    heightMode: any,
  ): { width: number; height: number } {
    return super.onMeasureFunction(width, widthMode, height, heightMode);
  }

  applyLayout(parentLayout?: YogaNodeLayout): void {
    super.applyLayout(parentLayout);
    if (this.nativeView) {
      this.nativeView.translatesAutoresizingMaskIntoConstraints = true;
    }
  }
}
