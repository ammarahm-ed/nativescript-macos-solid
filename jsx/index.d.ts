import { JSX as SolidJSX } from "npm:solid-js";
import { type TextStyle, ViewStyle } from "../native/core/style/index.ts";
import {
  WindowResizeEvent,
} from "../native/core/views/window/native-window.ts";
import type { SliderChangeEvent } from "../native/core/views/slider/slider.ts";
import type {
  LoadFinishedEvent,
  LoadStartedEvent,
} from "../native/core/views/webview/webview.ts";
import type { ButtonClickEvent } from "../native/core/views/button/native-button.ts";
import type {
  ImageErrorEvent,
  ImageLoadEvent,
  ImageStretch,
} from "../native/core/views/image/image.ts";
import type { ToolbarItemClickEvent } from "../native/core/views/toolbar/toolbar-item.ts";
import type { OutlineClickEvent } from "../native/core/views/outline/outline.ts";
import type { ComboBoxChangeEvent } from "../native/core/views/combobox/native-combobox.ts";
import type {
  ToolbarGroupSelectedEvent,
  ToolbarGroupSelectionMode,
} from "../native/core/views/toolbar/toolbar-group.ts";

interface ViewAttributes {
  ref?: unknown | ((e: unknown) => void);
  style?: ViewStyle;
  [name: string]: any;
  enableSafeAreaPaddings?: boolean;
}

interface TextAttributes {
  ref?: unknown | ((e: unknown) => void);
  style?: TextStyle;
  [name: string]: any;
}

interface ButtonAttributes extends TextAttributes {
  title?: string;
  /**
   * NSBezelStyle
   */
  bezelStyle?: number;
  /**
   * NSButtonType
   */
  buttonType?: number;
  onClick?: (event: ButtonClickEvent) => void;
}

interface ComboBoxAttributes extends ViewAttributes {
  items?: Array<string>;
  selectedIndex?: number;
  onChange?: (event: ComboBoxChangeEvent) => void;
}

interface ImageAttributes {
  src?: string | URL;
  symbol?: string;
  ref?: unknown | ((e: unknown) => void);
  style?: TextStyle;
  stretch?: ImageStretch;
  onLoad?: (event: ImageLoadEvent) => void;
  onError?: (event: ImageErrorEvent) => void;
  [name: string]: any;
}

interface OutlineAttributes extends ViewAttributes {
  onClick?: (item: OutlineClickEvent) => void;
}

interface ScrollViewAtributes extends ViewAttributes {}

interface SliderAttributes extends ViewAttributes {
  numberOfTickMarks?: number;
  allowsTickMarkValuesOnly?: boolean;
  onSliderChanged?: (event: SliderChangeEvent) => void;
}

interface SplitViewAttributes extends ViewAttributes {
  vertical?: boolean;
}

interface SplitViewItemAttributes {
  ref?: unknown | ((e: unknown) => void);
  style?: ViewStyle;
  minWidth?: number;
  maxWidth?: number;
  [name: string]: any;
}

interface WindowAttributes extends ViewAttributes {
  title?: string;
  subtitle?: string;
  transparentTitleBar?: boolean;
  /**
   * NSWindowStyleMask
   */
  styleMask?: number;
  isReleasedWhenClosed?: boolean;
  onResize?: (event: WindowResizeEvent) => void;
  onClose?: (event: Event) => void;
  onFocus?: (event: Event) => void;
  [name: string]: any;
}

interface WebviewAttributes extends ViewAttributes {
  src?: string | URL;
  onLoadStarted?: (event: LoadStartedEvent) => void;
  onLoadFinished?: (event: LoadFinishedEvent) => void;
}

interface ProgressAttributes extends ViewAttributes {
  progress?: number;
  indeterminate?: boolean;
  minValue?: number;
  maxValue?: number;
  type?: "bar" | "spinner";
}

interface ToolbarItemAttributes {
  onClick?: (event: ToolbarItemClickEvent) => void;
  label?: string;
  paletteLabel?: string;
  title?: string;
  toolTip?: string;
  bordered?: boolean;
  navigational?: boolean;
  enabled?: boolean;
  [name: string]: any;
}

interface ToolbarGroupAttributes extends ToolbarItemAttributes {
  onSelected?: (event: ToolbarGroupSelectedEvent) => void;
  selectedIndex?: number;
  selectionMode?: ToolbarGroupSelectionMode;
  titles?: string[];
}

interface ToolbarSidebarTrackingSeparatorAttributes {}

interface ToolbarToggleSidebarAttributes {}

interface ToolbarFlexibleSpaceAttributes {}

interface ToolbarAttributes {
  [name: string]: any;
}

// Define elements here
interface JSXIntrinsicElements {
  button: ButtonAttributes;
  checkbox: ButtonAttributes;
  combobox: ComboBoxAttributes;
  "content-list": SplitViewItemAttributes;
  image: ImageAttributes;
  outline: OutlineAttributes;
  "scroll-view": ScrollViewAtributes;
  "side-bar": SplitViewItemAttributes;
  slider: SliderAttributes;
  "split-view": SplitViewAttributes;
  "table-cell": ViewAttributes;
  text: TextAttributes;
  view: ViewAttributes;
  webview: WebviewAttributes;
  window: WindowAttributes;
  progress: ProgressAttributes;
  "toolbar-item": ToolbarItemAttributes;
  toolbar: ToolbarAttributes;
  "toolbar-sidebar-tracking-separator":
    ToolbarSidebarTrackingSeparatorAttributes;
  "toolbar-toggle-sidebar": ToolbarToggleSidebarAttributes;
  "toolbar-flexible-space": ToolbarFlexibleSpaceAttributes;
  "toolbar-group": ToolbarGroupAttributes;
}

export namespace JSX {
  export interface IntrinsicElements extends JSXIntrinsicElements {}

  export interface IntrinsicElements {
    // allow arbitrary native elements and props
    // @ts-ignore suppress ts:2374 = Duplicate string index signature.
    [name: string]: any;
  }

  export function mapElementTag<K extends keyof IntrinsicElements>(
    tag: K,
  ): IntrinsicElements[K];

  export function createElement<
    Element extends IntrinsicElements,
    Key extends keyof IntrinsicElements,
  >(element: Key | undefined | null, attrs: Element[Key]): Element[Key];

  export function createElement<
    Element extends IntrinsicElements,
    Key extends keyof IntrinsicElements,
    T,
  >(
    element: Key | undefined | null,
    attrsEnhancers: T,
    attrs: Element[Key] & T,
  ): Element[Key];

  export type Element = SolidJSX.Element;
  export interface ArrayElement extends Array<Element> {}

  export interface FunctionElement {
    (): Element;
  }

  interface IntrinsicAttributes {
    ref?: unknown | ((e: unknown) => void);
  }

  export interface ElementClass {
    // empty, libs can define requirements downstream
  }
  export interface ElementAttributesProperty {
    // empty, libs can define requirements downstream
  }
  export interface ElementChildrenAttribute {
    children: {};
  }

  interface ArrayElement extends Array<Element> {}

  type Accessor<T> = () => T;

  interface CustomEvents {}
  interface CustomCaptureEvents {}
}

declare global {
  namespace JSX {
    export interface IntrinsicElements extends JSXIntrinsicElements {}

    export interface IntrinsicElements {
      // allow arbitrary elements
      // @ts-ignore suppress ts:2374 = Duplicate string index signature.
      [name: string]: any;
    }

    export function mapElementTag<K extends keyof IntrinsicElements>(
      tag: K,
    ): IntrinsicElements[K];

    export function createElement<
      Element extends IntrinsicElements,
      Key extends keyof IntrinsicElements,
    >(element: Key | undefined | null, attrs: Element[Key]): Element[Key];

    export function createElement<
      Element extends IntrinsicElements,
      Key extends keyof IntrinsicElements,
      T,
    >(
      element: Key | undefined | null,
      attrsEnhancers: T,
      attrs: Element[Key] & T,
    ): Element[Key];

    export type Element = SolidJSX.Element;
    export interface ArrayElement extends Array<Element> {}

    export interface FunctionElement {
      (): Element;
    }

    interface IntrinsicAttributes {
      ref?: unknown | ((e: unknown) => void);
    }

    export interface ElementClass {
      // empty, libs can define requirements downstream
    }
    export interface ElementAttributesProperty {
      // empty, libs can define requirements downstream
    }
    export interface ElementChildrenAttribute {
      children: {};
    }

    interface ArrayElement extends Array<Element> {}

    type Accessor<T> = () => T;

    interface CustomEvents {}
    interface CustomCaptureEvents {}
  }
}

declare function Fragment(props: { children: JSX.Element }): JSX.Element;
declare function jsx(type: any, props: any): () => any;
export { Fragment, jsx, jsx as jsxDEV, jsx as jsxs };
