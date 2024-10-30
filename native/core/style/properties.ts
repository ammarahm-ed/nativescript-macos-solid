import "@nativescript/macos-node-api";
import { Layout } from "../layout/index.ts";
import type { Style, StylePropertyConfig } from "./index.ts";
import { Color } from "./utils/color.ts";

export function BackgroundColorNativeSet(
  style: Style,
  _key: string,
  value: CGColor,
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
    toNative: (_key, value) => {
      return !value ? value : new Color(value).toNSColor().CGColor;
    },
  },
};

export function ZIndexNativeSet(style: Style, _key: string, value: any) {
  if (!style.node.nativeView) return;
  const nativeView = style.node.nativeView as NSView;
  nativeView.wantsLayer = true;
  nativeView.layer.zPosition = value || 0;
}

export const ZIndexStyle: StylePropertyConfig = {
  setNative: ZIndexNativeSet,
  shouldLayout: true,
};

export function FontSizeNativeSet(style: Style, _key: string, value: number) {
  if (!style.node.nativeView) return;
  const nativeView = style.node.nativeView as NSText;
  nativeView.font = nativeView.font.fontWithSize(value);
}

export const FontSizeStyle: StylePropertyConfig = {
  setNative: FontSizeNativeSet,
  shouldLayout: true,
};

export function FontStyleNativeSet(style: Style, _key: string, value: string) {
  if (!style.node.nativeView) return;
  const nativeView = style.node.nativeView as NSText;
  const font = nativeView.font;
  switch (value) {
    case "italic": {
      const italicFont = NSFontManager.sharedFontManager.convertFontToHaveTrait(
        font,
        NSFontTraitMask.Italic,
      );
      nativeView.font = italicFont;
      break;
    }
    default:
      break;
  }
}

export const FontStyleStyle: StylePropertyConfig = {
  setNative: FontStyleNativeSet,
  shouldLayout: true,
};

export function ColorNativeSet(style: Style, _key: string, value: NSColor) {
  if (!style.node.nativeView) return;
  const nativeView = style.node.nativeView as NSText;
  nativeView.textColor = value;
}

export const ColorStyle: StylePropertyConfig = {
  setNative: ColorNativeSet,
  converter: {
    toNative: (_key, value) => (!value ? value : new Color(value).toNSColor()),
  },
};

export function BorderRadiusNativeSet(style: Style, _key: string, value: any) {
  if (!style.node.nativeView) return;
  style.node.nativeView.wantsLayer = true;
  const nativeView = style.node.nativeView as NSView;
  nativeView.layer.cornerRadius = value;
}

export const BorderRadiusStyle: StylePropertyConfig = {
  setNative: BorderRadiusNativeSet,
  shouldLayout: true,
};

export function BorderColorSetNative(style: Style, _key: string, value: any) {
  if (!style.node.nativeView) return;
  style.node.nativeView.wantsLayer = true;
  const nativeView = style.node.nativeView as NSView;
  nativeView.layer.borderColor = value;
}

export const BorderColorStyle: StylePropertyConfig = {
  setNative: BorderColorSetNative,
  converter: {
    toNative: (_key, value) =>
      !value ? value : new Color(value).toNSColor().CGColor,
  },
};

export function BorderWidthSetNative(style: Style, key: string, value: any) {
  if (!style.node.nativeView) return;
  const nativeView = style.node.nativeView as NSView;
  nativeView.wantsLayer = true;
  nativeView.layer.borderWidth = value;
  // @ts-expect-error dynamic access of setters
  Layout.Setters[key](style.node.yogaNode, value);
}

export const BorderWidthStyle: StylePropertyConfig = {
  setNative: BorderWidthSetNative,
  shouldLayout: true,
};

export function OpacitySetNative(style: Style, key: string, value: any) {
  if (!style.node.nativeView) return;
  const nativeView = style.node.nativeView as NSView;
  nativeView.alphaValue = value;
}

export const OpacityStyle: StylePropertyConfig = {
  setNative: OpacitySetNative,
};

export function TextAlignSetNative(style: Style, key: string, value: any) {
  if (!style.node.nativeView) return;
  const nativeView = style.node.nativeView as NSTextField;
  switch (value) {
    case "center":
      nativeView.alignment = NSTextAlignment.Center;
      break;
    case "right":
      nativeView.alignment = NSTextAlignment.Right;
      break;
    case "justified":
      nativeView.alignment = NSTextAlignment.Justified;
      break;
    case "left":
    default:
      nativeView.alignment = NSTextAlignment.Left;
      break;
  }
}

export const TextAlignStyle: StylePropertyConfig = {
  setNative: TextAlignSetNative,
};
