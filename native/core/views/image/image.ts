import "@nativescript/macos-node-api";
import type { YogaNodeLayout } from "../../layout/index.ts";
import { native } from "../decorators/native.ts";
import { view } from "../decorators/view.ts";
import { ViewBase } from "../view/view-base.ts";
import { Event } from "../../dom/dom-utils.ts";

export class ImageLoadEvent extends Event {
  constructor(eventDict?: EventInit) {
    super("load", eventDict);
  }
}

export class ImageErrorEvent extends Event {
  constructor(eventDict?: EventInit) {
    super("error", eventDict);
  }
}

export type ImageStretch = "none" | "fit" | "fill" | "aspectFit";

@view({
  name: "HTMLImageElement",
  tagName: "image",
})
export class Image extends ViewBase {
  nativeView?: NSImageView = undefined;

  override get isLeaf(): boolean {
    // Text is always a leaf node.
    return true;
  }

  public initNativeView(): NSImageView | undefined {
    this.nativeView = NSImageView.alloc().init();
    return this.nativeView;
  }

  private setImage(value: NSImage | null) {
    if (this.nativeView) {
      // @ts-expect-error it can be null
      this.nativeView.image = value;

      if (value) {
        this.dispatchEvent(new ImageLoadEvent());
      } else {
        this.dispatchEvent(new ImageErrorEvent());
      }
    }
  }

  @native({
    setNative(view: Image, _key, value) {
      let img: NSImage;
      if (typeof value === "string" && value?.indexOf("http") > -1) {
        img = NSImage.alloc().initWithContentsOfURL(NSURL.URLWithString(value));
      } else {
        img = NSImage.alloc().initWithContentsOfFile(
          (value instanceof URL ? value.pathname : value).replace('file://', ''),
        );
      }

      view.setImage(img);
    },
  })
  declare src: string | URL;

  @native({
    setNative(view: Image, _key, value) {
      const img = NSImage.imageWithSystemSymbolNameAccessibilityDescription(
        value,
        null,
      );

      view.setImage(img);
    },
  })
  declare symbol: string;

  @native({
    setNative(view: Image, _key, value: ImageStretch) {
      if (view.nativeView) {
        switch (value) {
          case "aspectFit":
            view.nativeView.imageScaling =
              NSImageScaling.ImageScaleProportionallyUpOrDown;
            break;
          case "fill":
            view.nativeView.imageScaling =
              NSImageScaling.ImageScaleAxesIndependently;
            break;
          case "fit":
            view.nativeView.imageScaling = NSImageScaling.ScaleToFit;
            break;
          default:
            view.nativeView.imageScaling = NSImageScaling.ScaleNone;
            break;
        }
      }
    },
  })
  declare stretch: ImageStretch;

  applyLayout(parentLayout?: YogaNodeLayout): void {
    super.applyLayout(parentLayout);
    if (this.nativeView) {
      this.nativeView.translatesAutoresizingMaskIntoConstraints = true;
    }
  }
}
