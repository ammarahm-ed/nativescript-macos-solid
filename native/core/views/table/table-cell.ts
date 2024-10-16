import "npm:@nativescript/macos-node-api@~0.1.1";
import { view } from "../decorators/view.ts";
import { Image } from "../image/image.ts";
import { Text } from "../text/text.ts";
import { ViewBase } from "../view/view-base.ts";

@view({
  name: "HTMLTableCellElement",
  tagName: "table-cell",
})
export class TableCell extends ViewBase {
  nativeView?: NSTableCellView = undefined;

  _isEnabled: boolean = false;

  public initNativeView(): NSTableCellView | undefined {
    this.nativeView = NSTableCellView.new();
    return this.nativeView;
  }

  public addNativeChild(child: Image | Text) {
    if (child.nodeName === "IMAGE") {
      this.nativeView!.imageView = child.nativeView! as NSImageView;
    } else if (child.nodeName === "TEXT") {
      this.nativeView!.textField = child.nativeView! as NSTextField;
    }

    this.nativeView!.addSubview(child.nativeView!);
  }

  public removeNativeChild(child: Image | Text): void {
    if (child.nodeName === "IMAGE") {
      // @ts-expect-error imageView is nullable
      this.nativeView.imageView = null;
    } else if (child.nodeName === "TEXT") {
      // @ts-expect-error textField is nullable
      this.nativeView.textField = null;
    }
    child.nativeView?.removeFromSuperview();
  }
}
