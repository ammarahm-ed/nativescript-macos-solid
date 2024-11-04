import "@nativescript/macos-node-api";
import { Event } from "../../dom/dom-utils.ts";
import { Layout } from "../../layout/index.ts";
import { native } from "../decorators/native.ts";
import { view } from "../decorators/view.ts";
import { Text } from "../text/text.ts";

export class TextChangeEvent extends Event {
  constructor(public value: string, eventDict?: EventInit) {
    super("textChange", eventDict);
    this.value = value;
  }
}

@NativeClass
export class NativeTextViewDelegate
  extends NSObject
  implements NSTextViewDelegate
{
  static ObjCProtocols = [NSTextViewDelegate];

  declare _owner: WeakRef<TextView>;
  static initWithOwner(owner: WeakRef<TextView>) {
    const delegate = NativeTextViewDelegate.new();
    delegate._owner = owner;
    return delegate;
  }

  controlTextDidChange(_obj: NSNotification): void {
    const owner = this._owner?.deref();
    if (owner) {
      owner._defaultValueSet = true;
      // @ts-ignore Notification emits as base class of NSTextField so use it's property
      owner.dispatchEvent(new TextChangeEvent(owner.nativeView!.stringValue));
      owner.yogaNode.markDirty();
      Layout.computeAndLayout(owner);
    }
  }
}

@view({
  name: "HTMLTextViewElement",
  tagName: "text-view",
})
export class TextView extends Text {
  declare nativeView?: NSTextView;
  _delegate?: NSTextViewDelegate;

  public initNativeView(): NSTextView {
    const nativeView = super.initNativeView() as NSTextView;
    nativeView.delegate = NativeTextViewDelegate.initWithOwner(
      new WeakRef(this)
    );
    this._delegate = nativeView.delegate;
    nativeView.string = "";
    nativeView.focusRingType = NSFocusRingType.None;
    nativeView.delegate = this._delegate;
    return nativeView;
  }

  public prepareNativeView(nativeView: NSTextField): void {
    super.prepareNativeView(nativeView);
    nativeView.isEditable = true;
  }

  updateTextContent() {
    if (this.nativeView) {
      this.nativeView.string = this.textContent || "";
      Layout.computeAndLayout(this);
    }
  }

  @native({
    setNative: (view: TextView, _key, value) => {
      if (view.nativeView) {
        view.nativeView.string = value;
      }
      view._defaultValueSet = true;
    },
    shouldLayout: true,
  })
  declare value: string;

  _defaultValueSet: boolean = false;

  @native({
    setNative: (view: TextView, _key, value) => {
      if (view._defaultValueSet) return;
      if (view.nativeView && !view.nativeView.string) {
        view.nativeView.string = value;
      }
    },
    shouldLayout: true,
  })
  declare defaultValue: string;

  @native({
    setNative: (view: TextView, _key, value) => {
      if (view.nativeView) {
        view.nativeView.isEditable = value;
      }
    },
  })
  declare editable: boolean;

  @native({
    setNative: (view: TextView, _key, value) => {
      if (view.nativeView) {
        view.nativeView.isSelectable = value;
      }
    },
  })
  declare selectable: boolean;

  @native({
    setNative: (view: TextView, _key, value) => {
      if (view.nativeView) {
        view.nativeView.isRichText = value;
      }
    },
  })
  declare richText: boolean;

  focus(): void {
    (this.nativeView as NSTextView).becomeFirstResponder();
  }

  blur(): void {
    (this.nativeView as NSTextView).resignFirstResponder();
  }

  clear(): void {
    this.nativeView!.string = "";
  }
}
