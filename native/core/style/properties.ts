import "npm:@nativescript/macos-node-api@~0.1.1";
import type { Style, StylePropertyConfig } from "./index.ts";
import { Color } from "./utils/color.ts";

export function BackgroundColorNativeSet(
  style: Style,
  key: string,
  value: CGColor
) {
  if (!style.node.nativeView) return;
  const nativeView = style.node.nativeView;
  if (value) {
    nativeView.wantsLayer = true;
    nativeView.layer.backgroundColor = value;
  } else {
    nativeView.layer.backgroundColor = null;
  }
}

export const BackgroundColorStyle: StylePropertyConfig = {
  setNative: BackgroundColorNativeSet,
  defaultValue: undefined,
  converter: {
    toNative: (key, value) => {
      return !value ? value : new Color(value).toNSColor().CGColor;
    },
  },
};

export function ZIndexNativeSet(style: Style, key: string, value: any) {
  if (!style.node.nativeView) return;
  const nativeView = style.node.nativeView as NSView;
  nativeView.wantsLayer = true;
  nativeView.layer.zPosition = value || 0;
}

export const ZIndexStyle: StylePropertyConfig = {
  setNative: ZIndexNativeSet,
  shouldLayout: true,
};

export function FontSizeNativeSet(style: Style, key: string, value: any) {
  if (!style.node.nativeView) return;
  const nativeView = style.node.nativeView as NSText;
  nativeView.font = nativeView.font.fontWithSize(value);
}

export const FontSizeStyle: StylePropertyConfig = {
  setNative: FontSizeNativeSet,
  shouldLayout: true,
};

export function ColorNativeSet(style: Style, key: string, value: NSColor) {
  if (!style.node.nativeView) return;
  const nativeView = style.node.nativeView as NSText;
  nativeView.textColor = value;
}

export const ColorStyle: StylePropertyConfig = {
  setNative: ColorNativeSet,
  converter: {
    toNative: (key, value) => !value ? value : new Color(value).toNSColor(),
  }
};
