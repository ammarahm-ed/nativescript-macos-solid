import "npm:@nativescript/macos-node-api@~0.1.1";
import { view } from "../decorators/view.ts";
import { ViewBase } from "../view/view-base.ts";
import { native } from "../decorators/native.ts";

@view({
  name: "HTMLImageElement",
  tagName: "image",
})
export class Image extends ViewBase {
  nativeView?: NSImageView = undefined;

  public initNativeView(): NSImageView | undefined {
    this.nativeView = NSImageView.alloc().init();
    return this.nativeView;
  }

  public disposeNativeView(): void {
    if (!this.nativeView?.superview) {
      this.nativeView?.dealloc();
      this.nativeView = undefined;
    } else {
      console.warn(
        "Trying to dispose a view that is still attached to it's parent",
        new Error().stack,
      );
    }
  }

  @native({
    setNative(view: Image, _key, value) {
      const img = NSImage.alloc().initWithContentsOfFile(
        value instanceof URL ? value.pathname : value,
      );
      view.nativeView!.image = img;
    },
  })
  declare src: string | URL;

  @native({
    setNative(view: Image, _key, value) {
      const img = NSImage.imageWithSystemSymbolNameAccessibilityDescription(
        value,
        null,
      );
      view.nativeView!.image = img;
    },
  })
  declare symbol: string;
}
