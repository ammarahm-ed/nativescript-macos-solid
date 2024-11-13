import { JSX as SolidJSX } from "npm:solid-js";
import type { ColorDialogOptions } from "../native/core/dialogs/color/color-dialog.ts";
import type {
  FileDialogOptions,
  SaveFileDialogOptions,
} from "../native/core/dialogs/file/file-dialog.ts";
import { type TextStyle, ViewStyle } from "../native/core/style/index.ts";
import type { ButtonClickEvent } from "../native/core/views/button/native-button.ts";
import type { ColorChosenEvent } from "../native/core/views/coloropenbutton/native-coloropenbutton.ts";
import type { ComboBoxChangeEvent } from "../native/core/views/combobox/native-combobox.ts";
import type { FileChosenEvent } from "../native/core/views/fileopenbutton/native-fileopenbutton.ts";
import type { FileSaveEvent } from "../native/core/views/filesavebutton/native-filesavebutton.ts";
import type {
  ImageErrorEvent,
  ImageLoadEvent,
  ImageStretch,
} from "../native/core/views/image/image.ts";
import type { MenuItemClickEvent } from "../native/core/views/menu/menu-item.ts";
import type { ScrollChangeEvent } from "../native/core/views/scroll-view/scroll-view.ts";
import type { SliderChangeEvent } from "../native/core/views/slider/slider.ts";
import type { TableCellSelectedEvent } from "../native/core/views/table/table-cell.ts";
import type {
  TextChangeEvent,
  TextSubmitEvent,
} from "../native/core/views/text-field/text-field.ts";
import type {
  ToolbarGroupSelectedEvent,
  ToolbarGroupSelectionMode,
} from "../native/core/views/toolbar/toolbar-group.ts";
import type { ToolbarItemClickEvent } from "../native/core/views/toolbar/toolbar-item.ts";
import type {
  LoadFinishedEvent,
  LoadStartedEvent,
  WebViewMessageEvent,
} from "../native/core/views/webview/webview.ts";
import { WindowResizeEvent } from "../native/core/views/window/native-window.ts";
import type { OutlineViewItemSelectedEvent } from "../native/core/views/outline/outline.ts";
import type { SwitchClickEvent } from "../native/core/views/switch/switch.ts";
import type { DatePickerChangeEvent } from "../native/core/views/date-picker/date-picker.ts";

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
  /**
   * SF Symbol name
   */
  icon?: string;
  onClick?: (event: ButtonClickEvent) => void;
}

interface ColorOpenButtonAttributes extends ButtonAttributes {
  options?: ColorDialogOptions;
  onColorChosen?: (event: ColorChosenEvent) => void;
}

interface ComboBoxAttributes extends ViewAttributes {
  items?: Array<string>;
  selectedIndex?: number;
  onChange?: (event: ComboBoxChangeEvent) => void;
}

interface FileOpenButtonAttributes extends ButtonAttributes {
  options?: FileDialogOptions;
  onFileChosen?: (event: FileChosenEvent) => void;
}

interface FileSaveButtonAttributes extends ButtonAttributes {
  options?: SaveFileDialogOptions;
  onFileSave?: (event: FileSaveEvent) => void;
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
  onItemSelected?: (item: OutlineViewItemSelectedEvent) => void;
}

interface ScrollViewAtributes extends ViewAttributes {
  documentViewStyle?: ViewStyle;
  horizontal?: boolean;
  onScroll?: (event: ScrollChangeEvent) => void;
  /**
   * Disable default document view. When set to false, the scroll-view expects a single direct child which becomes the documentView
   */
  disableDefaultDocumentView?: boolean;
}

interface SliderAttributes extends ViewAttributes {
  numberOfTickMarks?: number;
  allowsTickMarkValuesOnly?: boolean;
  value?: number;
  maxValue?: number;
  minValue?: number;
  incrementValue?: number;
  type?: "linear" | "circular";
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
  ref?: HTMLWebViewElement | ((e: HTMLWebViewElement) => void);
  src?: string | URL;
  messagingEnabled?: boolean;
  onLoadStarted?: (event: LoadStartedEvent) => void;
  onLoadFinished?: (event: LoadFinishedEvent) => void;
  onMessage?: (event: WebViewMessageEvent) => void;
}

interface ProgressAttributes extends ViewAttributes {
  progress?: number;
  indeterminate?: boolean;
  minValue?: number;
  maxValue?: number;
  type?: "bar" | "spinner";
  size?: "small" | "regular" | "large" | "mini";
}

interface SwitchAttributes extends ViewAttributes {
  value?: boolean;
  onClick?: (event: SwitchClickEvent) => void;
  continuous?: boolean;
  enabled?: boolean;
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

interface ToolbarSpaceAttributes {}

interface ToolbarAttributes {
  [name: string]: any;
}

interface TableCellAttributes extends ViewAttributes {
  selected?: boolean;
  identifier?: string;
  onSelected?: (event: TableCellSelectedEvent) => void;
}

interface TextFieldAttributes extends TextAttributes {
  onTextChange?: (event: TextChangeEvent) => void;
  onSubmit?: (event: TextSubmitEvent) => void;
  placeholder?: string;
  editable?: boolean;
  multiline?: boolean;
  defaultValue?: string;
  value?: string;
}

interface TextViewAttributes extends TextAttributes {
  onTextChange?: (event: TextChangeEvent) => void;
  editable?: boolean;
  selectable?: boolean;
  richText?: boolean;
  defaultValue?: string;
  value?: string;
}

interface CheckboxAttributes extends ButtonAttributes {
  checked?: boolean;
}

interface MenuAttributes extends ViewAttributes {
  title?: string;
  attachToMainMenu?: boolean;
}

interface MenuItemAttributes extends ViewAttributes {
  title?: string;
  icon?: string;
  shortcutKey?: string;
  state?: "on" | "off" | "mixed";
  onIcon?: string;
  offIcon?: string;
  mixedIcon?: string;
  enabled?: boolean;
  isHidden?: boolean;
  onClick?: (event: MenuItemClickEvent) => void;
}

interface MenuSeperatorAttributes extends ViewAttributes {}

interface MenuSectionHeaderAttributes extends ViewAttributes {
  title?: string;
}

interface StaturBarAttributes extends ViewAttributes {
  title?: string;
}

interface PopoverAttributes extends ViewAttributes {
  animates?: boolean;
  behavior?: number;
}

interface DatePickerAttributes extends ViewAttributes {
  date?: Date;
  minDate?: Date;
  maxDate?: Date;
  onDateChange?: (date: DatePickerChangeEvent) => void;
  datePickerStyle?: "textFieldAndStepper" | "clockAndCalendar" | "textField";
  datePickerElements?: number;
  datePickerMode?: "single" | "range";
}

// Define elements here
interface JSXIntrinsicElements {
  button: ButtonAttributes;
  checkbox: CheckboxAttributes;
  coloropenbutton: ColorOpenButtonAttributes;
  combobox: ComboBoxAttributes;
  "content-list": SplitViewItemAttributes;
  fileopenbutton: FileOpenButtonAttributes;
  filesavebutton: FileSaveButtonAttributes;
  image: ImageAttributes;
  outline: OutlineAttributes;
  "scroll-view": ScrollViewAtributes;
  "side-bar": SplitViewItemAttributes;
  slider: SliderAttributes;
  "split-view": SplitViewAttributes;
  "table-cell": TableCellAttributes;
  text: TextAttributes;
  view: ViewAttributes;
  webview: WebviewAttributes;
  window: WindowAttributes;
  progress: ProgressAttributes;
  radiobutton: ButtonAttributes;
  "toolbar-item": ToolbarItemAttributes;
  toolbar: ToolbarAttributes;
  "toolbar-sidebar-tracking-separator": ToolbarSidebarTrackingSeparatorAttributes;
  "toolbar-toggle-sidebar": ToolbarToggleSidebarAttributes;
  "toolbar-flexible-space": ToolbarFlexibleSpaceAttributes;
  "toolbar-group": ToolbarGroupAttributes;
  "toolbar-space": ToolbarSpaceAttributes;
  "text-field": TextFieldAttributes;
  "text-view": TextViewAttributes;
  menu: MenuAttributes;
  "menu-item": MenuItemAttributes;
  "menu-separator": MenuSeperatorAttributes;
  "menu-section-header": MenuSectionHeaderAttributes;
  "status-bar": StaturBarAttributes;
  popover: PopoverAttributes;
  switch: SwitchAttributes;
  "date-picker": DatePickerAttributes;
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
