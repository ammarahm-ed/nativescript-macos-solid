import { Event } from "../../dom/dom-utils.ts";
import { Color } from "../../style/utils/color.ts";
import { native } from "../decorators/native.ts";
import type { NativePropertyConfig } from "../decorators/native.ts";
import { overrides } from "../decorators/overrides.ts";
import { view } from "../decorators/view.ts";
import { TextBase } from "../text/text-base.ts";
import { NativeButton } from "./native-button.ts";

export class ButtonClickEvent extends Event {
    declare state?: boolean;
    constructor(state: boolean, eventDict?: EventInit) {
      super("click", eventDict);
      this.state = state;
    } 
  }

export type NSBezelStyleType =
  | "automatic"
  | "push"
  | "flexible-push"
  | "disclosure"
  | "circular"
  | "help-button"
  | "small-square"
  | "toolbar"
  | "accessory-bar-action"
  | "accessory-bar"
  | "push-disclosure"
  | "badge"
  | "shadowless-square"
  | "textured-square"
  | "rounded"
  | "regular-square"
  | "textured-rounded"
  | "round-rect"
  | "recessed"
  | "rounded-disclosure"
  | "inline";

function getNSBezelStyleValue(style: NSBezelStyleType): number {
  const styleMap: { [key in NSBezelStyleType]: number } = {
    automatic: NSBezelStyle.Automatic,
    push: NSBezelStyle.Push,
    "flexible-push": NSBezelStyle.FlexiblePush,
    disclosure: NSBezelStyle.Disclosure,
    circular: NSBezelStyle.Circular,
    "help-button": NSBezelStyle.HelpButton,
    "small-square": NSBezelStyle.SmallSquare,
    toolbar: NSBezelStyle.Toolbar,
    "accessory-bar-action": NSBezelStyle.AccessoryBarAction,
    "accessory-bar": NSBezelStyle.AccessoryBar,
    "push-disclosure": NSBezelStyle.PushDisclosure,
    badge: NSBezelStyle.Badge,
    "shadowless-square": NSBezelStyle.ShadowlessSquare,
    "textured-square": NSBezelStyle.TexturedSquare,
    rounded: NSBezelStyle.Rounded,
    "regular-square": NSBezelStyle.RegularSquare,
    "textured-rounded": NSBezelStyle.TexturedRounded,
    "round-rect": NSBezelStyle.RoundRect,
    recessed: NSBezelStyle.Recessed,
    "rounded-disclosure": NSBezelStyle.RoundedDisclosure,
    inline: NSBezelStyle.Inline,
  };

  return styleMap[style];
}

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

  public override initNativeView(): NativeButton {
    this.nativeView = NativeButton.new();
    return this.nativeView;
  }

  public override prepareNativeView(nativeView: NativeButton): void {
    nativeView.target = this.nativeView;
    nativeView.action = "clicked";
    nativeView.button = this;
    nativeView.bezelStyle = NSBezelStyle.Recessed;
  }

  override updateTextContent() {
    if (this.nativeView && this.firstChild) {
      this.nativeView.setTitle(this.textContent || "");
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
    _config: NativePropertyConfig<string>
  ) {
    if (this.nativeView) {
      const nativeValue = !value ? undefined : new Color(value).toNSColor();
      this.nativeView.bezelColor = nativeValue || NSColor.lightGrayColor;
    }
  }

  @native({
    setNative(view: Button, _key, value) {
      if (view.nativeView) {
        view.nativeView.bezelStyle = getNSBezelStyleValue(value);
      }
    },
  })
  declare bezelStyle: NSBezelStyleType;

  @native({
    setNative(view: Button, _key, value) {
      if (view.nativeView) {
        view.nativeView.setButtonType(getNSButtonTypeValue(value));
      }
    },
  })
  declare buttonType: NSButtonType;
}

export type NSButtonType =
  | "momentaryLight"
  | "pushOnPushOff"
  | "toggle"
  | "switch"
  | "radio"
  | "momentaryChange"
  | "onOff"
  | "momentaryPushIn"
  | "accelerator" | "multiLevelAccelerator";

function getNSButtonTypeValue(type: NSButtonType): number {
  const typeMap: { [key in NSButtonType]: number } = {
    momentaryLight: NSButtonType.MomentaryLight,
    pushOnPushOff: NSButtonType.PushOnPushOff,
    toggle: NSButtonType.Toggle,
    switch: NSButtonType.Switch,
    radio: NSButtonType.Radio,
    momentaryChange: NSButtonType.MomentaryChange,
    onOff: NSButtonType.OnOff,
    momentaryPushIn: NSButtonType.MomentaryPushIn,
    accelerator: NSButtonType.Accelerator,
    multiLevelAccelerator: NSButtonType.MultiLevelAccelerator,
  };

  return typeMap[type];
}
