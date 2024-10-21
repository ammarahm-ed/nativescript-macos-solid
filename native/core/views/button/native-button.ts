import "@nativescript/macos-node-api";
import { Event } from "../../dom/dom-utils.ts";

export class ButtonClickEvent extends Event {
  declare state?: boolean;
  constructor(state: boolean, eventDict?: EventInit) {
    super("click", eventDict);
    this.state = state;
  }
}

export class NativeButton extends NSButton {
  static ObjCExposedMethods = {
    clicked: { returns: interop.types.void, params: [interop.types.id] },
  };
  _attributedTitle?: NSMutableAttributedString;
  _color?: NSColor;
  _title?: string;
  static {
    NativeClass(this);
  }

  public button?: HTMLViewBaseElement;

  clicked(_id: this) {
    this.button?.dispatchEvent(new ButtonClickEvent(this.state === NSOnState));
  }

  setTitle(title: string) {
    this._title = title;
    this.updateButtonTitleStyle();
  }

  setTitleColor(color: NSColor) {
    this._color = color;
    this.updateButtonTitleStyle();
  }

  updateButtonTitleStyle() {
    if (!this._attributedTitle) {
      this._attributedTitle = NSMutableAttributedString.alloc().init();
    }

    this._attributedTitle.mutableString.setString(this._title || "");
    this._attributedTitle.setAttributesRange(
      {
        [NSForegroundColorAttributeName]: this._color,
      },
      { location: 0, length: this._title?.length || 0 },
    );

    this.attributedTitle = this._attributedTitle;
  }
}
