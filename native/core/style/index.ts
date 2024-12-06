// deno-lint-ignore-file ban-ts-comment
import { FlexStyle, Layout } from "../layout/index.ts";
import {
  BackgroundColorStyle,
  BorderColorStyle,
  BorderRadiusStyle,
  BorderWidthStyle,
  ColorStyle,
  FontSizeStyle,
  FontStyleStyle,
  FontWeightStyle,
  OpacityStyle,
  TextAlignStyle,
  ZIndexStyle,
} from "./properties.ts";
import { colors } from "./utils/color.ts";

export type StylePropertyConfig<T = any> = {
  setNative: (
    style: Style,
    key: string,
    value: T,
    config: StylePropertyConfig<T>,
  ) => void;
  getNative?: (style: Style) => any;
  shouldLayout?: boolean;
  hasChanged?: (oldValue: T, newValue: T) => boolean;
  converter?: {
    toNative?: (key: string, value: T) => any;
    fromNative?: (key: string, value: any) => T;
  };
  defaultValue?: T;
};

/**
 * A function that decorates properties on the style object.
 */
export function style<T>(config: StylePropertyConfig<T>) {
  return function (_target: Style, property: string) {
    if (config.defaultValue !== undefined) {
      _target._nativeStyleDefaults.set(property, config.defaultValue);
    }
    Object.defineProperty(_target, property, {
      get() {
        if (config.getNative && config.converter?.fromNative) {
          return config.converter.fromNative(property, config.getNative(this));
        }
        return this.get(property);
      },
      set(value: T) {
        const oldValue = this.get(property);

        const hasChanged = !config.hasChanged
          ? oldValue !== value
          : config.hasChanged?.(oldValue, value);

        if (!hasChanged) return;

        this.set(property, value);
        const nativeValue = config.converter?.toNative?.(property, value) ??
          value;
        const SetNativeKey = `${property}SetNative`;

        const pendingSetNative = function (this: Style) {
          if (this.node[SetNativeKey]) {
            this.node[SetNativeKey].call(this.node, property, value, config);
          } else {
            config.setNative(this, property, nativeValue, config);
          }

          if (config.shouldLayout) {
            if (this.node.isLeaf) {
              this.node.yogaNode.markDirty();
            }
            Layout.computeAndLayout(this.node);
          }
        };
        if (!this.node.nativeView) {
          this.pendingSetNative.set(property, pendingSetNative.bind(this));
          return;
        } else {
          pendingSetNative.call(this);
        }
      },
    });
  };
}

export function flex() {
  return style({
    setNative: (style, key, value) => {
      //@ts-ignore
      if (!Layout.Setters[key]) {
        console.error(`Flex property ${key} is not supported`);
        return;
      }
      if (style.node) {
        //@ts-ignore
        Layout.Setters[key](style.node.yogaNode, value);
        Layout.computeAndLayout(style.node);
      }
    },
    hasChanged: (oldValue, newValue) => oldValue !== newValue,
    converter: {
      toNative: (key, value) =>
        Layout.ConvertToYogaValue[
          key as unknown as keyof typeof Layout.ConvertToYogaValue
        ](value as any),
    },
  });
}

export interface ViewStyle extends FlexStyle {
  backgroundColor?: `${Lowercase<keyof typeof colors>}` | ({} & string);
  borderColor?: `${Lowercase<keyof typeof colors>}` | ({} & string);
  borderRadius?: number;
  opacity?: number;
}

export interface TextStyle extends ViewStyle {
  color?: `${Lowercase<keyof typeof colors>}` | ({} & string);
  fontSize?: string | number;
  fontFamily?: string;
  fontStyle?: string;
  textAlign?: "center" | "left" | "right" | "justified";
  fontWeight?: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "ultralight" | "light" | "normal" | "bold" | "medium" | "semibold" | "extrabold" | "black";
}

export interface CombinedStyle extends ViewStyle, TextStyle {}

export class Style extends Map {
  /**
   * Install a new style property.
   */
  static install = style;
  _nativeStyleDefaults: Map<string, any> = new Map();
  pendingSetNative: Map<string, () => void> = new Map();

  constructor(public node: any) {
    super();
  }

  override set<Key extends keyof CombinedStyle>(
    key: Key,
    value: CombinedStyle[Key],
  ): this {
    super.set(key, value);
    return this;
  }

  override get<Key extends keyof CombinedStyle>(
    key: Key,
  ): CombinedStyle[Key] | undefined {
    return super.get(key);
  }

  override clear(): void {
    for (const key of this.keys()) {
      //@ts-ignore
      this[key] = undefined;
    }
    super.clear();
  }

  @flex()
  declare alignContent: FlexStyle["alignContent"];

  @flex()
  declare position: FlexStyle["position"];

  @flex()
  declare alignItems: FlexStyle["alignItems"];

  @flex()
  declare alignSelf: FlexStyle["alignSelf"];

  @flex()
  declare aspectRatio: FlexStyle["aspectRatio"];

  // @flex()
  // declare borderLeftWidth: FlexStyle["borderLeftWidth"];

  // @flex()
  // declare borderRightWidth: FlexStyle["borderRightWidth"];

  // @flex()
  // declare borderTopWidth: FlexStyle["borderTopWidth"];

  // @flex()
  // declare borderBottomWidth: FlexStyle["borderBottomWidth"];

  @style(BorderWidthStyle)
  declare borderWidth: FlexStyle["borderWidth"];

  @flex()
  declare direction: FlexStyle["direction"];

  @flex()
  declare display: FlexStyle["display"];

  @flex()
  declare flex: FlexStyle["flex"];

  @flex()
  declare flexBasis: FlexStyle["flexBasis"];

  @flex()
  declare flexDirection: FlexStyle["flexDirection"];

  @flex()
  declare flexGrow: FlexStyle["flexGrow"];

  @flex()
  declare flexShrink: FlexStyle["flexShrink"];

  @flex()
  declare flexWrap: FlexStyle["flexWrap"];

  @flex()
  declare width: FlexStyle["width"];

  @flex()
  declare height: FlexStyle["height"];

  @flex()
  declare justifyContent: FlexStyle["justifyContent"];

  @flex()
  declare gap: FlexStyle["gap"];

  @flex()
  declare rowGap: FlexStyle["rowGap"];

  @flex()
  declare columnGap: FlexStyle["columnGap"];

  @flex()
  declare marginLeft: FlexStyle["marginLeft"];

  @flex()
  declare marginRight: FlexStyle["marginRight"];

  @flex()
  declare marginTop: FlexStyle["marginTop"];

  @flex()
  declare marginBottom: FlexStyle["marginBottom"];

  @flex()
  declare maxHeight: FlexStyle["maxHeight"];

  @flex()
  declare maxWidth: FlexStyle["maxWidth"];

  @flex()
  declare minHeight: FlexStyle["minHeight"];

  @flex()
  declare minWidth: FlexStyle["minWidth"];

  @flex()
  declare overflow: FlexStyle["overflow"];

  @flex()
  declare paddingLeft: FlexStyle["paddingLeft"];

  @flex()
  declare paddingRight: FlexStyle["paddingRight"];

  @flex()
  declare paddingTop: FlexStyle["paddingTop"];

  @flex()
  declare paddingBottom: FlexStyle["paddingBottom"];

  @flex()
  declare padding: FlexStyle["padding"];

  @flex()
  declare top: FlexStyle["top"];

  @flex()
  declare left: FlexStyle["left"];

  @flex()
  declare right: FlexStyle["right"];

  @flex()
  declare bottom: FlexStyle["bottom"];

  @flex()
  declare end: FlexStyle["end"];

  @flex()
  declare start: FlexStyle["start"];

  @flex()
  declare marginBlock: FlexStyle["marginBlock"];

  @flex()
  declare marginBlockEnd: FlexStyle["marginBlockEnd"];

  @flex()
  declare marginBlockStart: FlexStyle["marginBlockStart"];

  @flex()
  declare paddingBlock: FlexStyle["paddingBlock"];

  @flex()
  declare paddingBlockEnd: FlexStyle["paddingBlockEnd"];

  @flex()
  declare paddingBlockStart: FlexStyle["paddingBlockStart"];

  @flex()
  declare paddingHorizontal: FlexStyle["paddingHorizontal"];

  @flex()
  declare paddingVertical: FlexStyle["paddingVertical"];

  @flex()
  declare marginVertical: FlexStyle["marginVertical"];

  @flex()
  declare marginHorizontal: FlexStyle["marginHorizontal"];

  @flex()
  declare marginStart: FlexStyle["marginStart"];

  @flex()
  declare marginEnd: FlexStyle["marginEnd"];

  @flex()
  declare paddingStart: FlexStyle["paddingStart"];

  @style(BackgroundColorStyle)
  declare backgroundColor: ViewStyle["backgroundColor"];

  @style(ZIndexStyle)
  declare zIndex: ViewStyle["zIndex"];

  @style(FontSizeStyle)
  declare fontSize: TextStyle["fontSize"];

  @style(FontStyleStyle)
  declare fontStyle: TextStyle["fontStyle"];

  @style(ColorStyle)
  declare color: TextStyle["color"];

  @style(BorderRadiusStyle)
  declare borderRadius: ViewStyle["borderRadius"];

  // @style(BorderRadiusStyle)
  // declare borderTopRightRadius: number;

  // @style(BorderRadiusStyle)
  // declare borderTopLeftRadius: number;

  // @style(BorderRadiusStyle)
  // declare borderBottomRightRadius: number;

  // @style(BorderRadiusStyle)
  // declare borderBottomLeftRadius: number;

  @style(BorderColorStyle)
  declare borderColor: ViewStyle["borderColor"];

  // @style(BorderColorStyle)
  // declare borderTopColor: string;

  // @style(BorderColorStyle)
  // declare borderBottomColor: string;

  // @style(BorderColorStyle)
  // declare borderLeftColor: string;

  // @style(BorderColorStyle)
  // declare borderRightColor: string;

  @style(OpacityStyle)
  declare opacity: ViewStyle["opacity"];

  @style(TextAlignStyle)
  declare textAlign: TextStyle["textAlign"];

  @style(FontWeightStyle)
  declare fontWeight: TextStyle["fontWeight"]
}
