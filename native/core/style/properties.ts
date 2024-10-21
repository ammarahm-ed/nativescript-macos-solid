import "@nativescript/macos-node-api";
import type { Style, StylePropertyConfig } from "./index.ts";
import { Color } from "./utils/color.ts";
import { Layout } from "../layout/index.ts";

export function BackgroundColorNativeSet(
  style: Style,
  key: string,
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
    toNative: (key, value) => (!value ? value : new Color(value).toNSColor()),
  },
};

export function BorderRadiusNativeSet(style: Style, key: string, value: any) {
  if (!style.node.nativeView) return;
  style.node.nativeView.wantsLayer = true;
  const nativeView = style.node.nativeView as NSView;
  nativeView.layer.cornerRadius = value;
}

export const BorderRadiusStyle: StylePropertyConfig = {
  setNative: BorderRadiusNativeSet,
  shouldLayout: true,
};

export function BorderColorSetNative(style: Style, key: string, value: any) {
  if (!style.node.nativeView) return;
  style.node.nativeView.wantsLayer = true;
  const nativeView = style.node.nativeView as NSView;
  nativeView.layer.borderColor = value;
}

export const BorderColorStyle: StylePropertyConfig = {
  setNative: BorderColorSetNative,
  converter: {
    toNative: (key, value) =>
      !value ? value : new Color(value).toNSColor().CGColor,
  },
};

export function BorderWidthSetNative(style: Style, key: string, value: any) {
  if (!style.node.nativeView) return;
  const nativeView = style.node.nativeView as NSView;
  nativeView.wantsLayer = true;
  nativeView.layer.borderWidth = value;
  //@ts-ignore
  Layout.Setters[key](style.node.yogaNode, value);
}

export const BorderWidthStyle: StylePropertyConfig = {
  setNative: BorderWidthSetNative,
  shouldLayout: true,
};
