import { JSX as SolidJSX } from "npm:solid-js";
import { ViewStyle } from "../native/core/style/index.ts";
import { WindowResizeEvent } from "../native/core/views/window/native-window.ts";
import type { SliderChangeEvent } from "../native/core/views/slider/slider.ts";

interface ViewAttributes {
  ref?: unknown | ((e: unknown) => void);
  style?: ViewStyle;
  [name: string]: any;
}

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

// Define elements here
interface JSXIntrinsicElements {
  slider: SliderAttributes;
  "split-view": SplitViewAttributes;
  "side-bar": SplitViewItemAttributes;
  "content-list": SplitViewItemAttributes;
  view: ViewAttributes;
  window: WindowAttributes
}

export namespace JSX {
  export interface IntrinsicElements extends JSXIntrinsicElements {}

  export interface IntrinsicElements {
    // allow arbitrary native elements and props
    // @ts-ignore suppress ts:2374 = Duplicate string index signature.
    [name: string]: any;
  }

  export function mapElementTag<K extends keyof IntrinsicElements>(
    tag: K
  ): IntrinsicElements[K];

  export function createElement<
    Element extends IntrinsicElements,
    Key extends keyof IntrinsicElements
  >(element: Key | undefined | null, attrs: Element[Key]): Element[Key];

  export function createElement<
    Element extends IntrinsicElements,
    Key extends keyof IntrinsicElements,
    T
  >(
    element: Key | undefined | null,
    attrsEnhancers: T,
    attrs: Element[Key] & T
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
      tag: K
    ): IntrinsicElements[K];

    export function createElement<
      Element extends IntrinsicElements,
      Key extends keyof IntrinsicElements
    >(element: Key | undefined | null, attrs: Element[Key]): Element[Key];

    export function createElement<
      Element extends IntrinsicElements,
      Key extends keyof IntrinsicElements,
      T
    >(
      element: Key | undefined | null,
      attrsEnhancers: T,
      attrs: Element[Key] & T
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
