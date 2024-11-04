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

export class TextSubmitEvent extends Event {
  constructor(public value: string, eventDict?: EventInit) {
    super("submit", eventDict);
    this.value = value;
  }
}

@NativeClass
export class NativeTextFieldDelegate
  extends NSObject
  implements NSTextFieldDelegate
{
  static ObjCProtocols = [NSTextFieldDelegate];

  declare _owner: WeakRef<TextField>;
  static initWithOwner(owner: WeakRef<TextField>) {
    const delegate = NativeTextFieldDelegate.new();
    delegate._owner = owner;
    return delegate;
  }

  controlTextDidChange(_obj: NSNotification): void {
    const owner = this._owner?.deref();
    if (owner) {
      owner._defaultValueSet = true;
      owner.dispatchEvent(new TextChangeEvent(owner.nativeView!.stringValue));
      owner.yogaNode.markDirty();
      Layout.computeAndLayout(owner);
    }
  }

  controlTextSubmit() {
    const owner = this._owner?.deref();
    if (owner) {
      if (!owner.nativeView?.stringValue) return;
      owner.dispatchEvent(new TextSubmitEvent(owner.nativeView!.stringValue));
    }
  }

  static ObjCExposedMethods = {
    controlTextSubmit: { returns: interop.types.void, params: [] },
  };
}

@view({
  name: "HTMLTextFieldElement",
  tagName: "text-field",
})
export class TextField extends Text {
  declare nativeView?: NSTextField;
  _delegate?: NSTextFieldDelegate;

  public initNativeView(): NSTextField {
    const nativeView = super.initNativeView() as NSTextField;
    nativeView.delegate = NativeTextFieldDelegate.initWithOwner(
      new WeakRef(this)
    );
    this._delegate = nativeView.delegate;
    nativeView.stringValue = "";
    nativeView.focusRingType = NSFocusRingType.None;
    nativeView.usesSingleLineMode = true;
    nativeView.target = this._delegate;
    nativeView.action = "controlTextSubmit";
    return nativeView;
  }

  public prepareNativeView(nativeView: NSTextField): void {
    super.prepareNativeView(nativeView);
    nativeView.isEditable = true;
  }

  updateTextContent() {}

  @native({
    setNative: (view: TextField, _key, value) => {
      if (view.nativeView) {
        view.nativeView.stringValue = value;
      }
      view._defaultValueSet = true;
    },
    shouldLayout: true
  })
  declare value: string;

  _defaultValueSet: boolean = false;

  @native({
    setNative: (view: TextField, _key, value) => {
      if (view._defaultValueSet) return;
      if (view.nativeView && !view.nativeView.stringValue) {
        view.nativeView.stringValue = value;
      }
    },
    shouldLayout: true
  })
  declare defaultValue: string;

  @native({
    setNative: (view: TextField, _key, value) => {
      if (view.nativeView) {
        view.nativeView.placeholderString = value;
      }
    },
    shouldLayout: true
  })
  declare placeholder: string | null;

  @native({
    setNative: (view: TextField, _key, value) => {
      if (view.nativeView) {
        view.nativeView.isEditable = value;
      }
    },
  })
  declare editable: boolean;

  @native({
    setNative: (view: TextField, _key, value) => {
      if (view.nativeView) {
        view.nativeView.usesSingleLineMode = value;
      }
    },
    shouldLayout: true
  })
  declare multiline: boolean;

  focus(): void {
    (this.nativeView as NSTextField).becomeFirstResponder();
  }

  blur(): void {
    (this.nativeView as NSTextField).resignFirstResponder();
  }

  clear(): void {
    this.nativeView!.stringValue = "";
  }
}
