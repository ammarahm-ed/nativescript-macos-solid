import "@nativescript/macos-node-api";
import { Event } from "../../dom/dom-utils.ts";
import { native } from "../decorators/native.ts";
import { view } from "../decorators/view.ts";
import { Image } from "../image/image.ts";
import { Text } from "../text/text.ts";
import { ViewBase } from "../view/view-base.ts";

export class TableCellSelectedEvent extends Event {
  declare target: TableCell | null;
  constructor(eventDict?: EventInit) {
    super("selected", eventDict);
  }
}

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

  public addNativeChild(child: Image | Text | TableCell) {
    if (child.nodeName === "IMAGE") {
      this.nativeView!.imageView = child.nativeView! as NSImageView;
    } else if (child.nodeName === "TEXT") {
      this.nativeView!.textField = child.nativeView! as NSTextField;
    }

    this.nativeView!.addSubview(child.nativeView!);
  }

  public removeNativeChild(child: Image | Text | TableCell): void {
    if (child.nodeName === "IMAGE") {
      // @ts-expect-error imageView is nullable
      this.nativeView.imageView = null;
    } else if (child.nodeName === "TEXT") {
      // @ts-expect-error textField is nullable
      this.nativeView.textField = null;
    }

    child.nativeView?.removeFromSuperview();
  }

  getOwner(): any {
    let node: any = this.parentNode;
    while (node) {
      if (node.nodeName !== "TABLE-CELL") {
        break;
      }
      node = node.parentNode as any;
    }
    return node;
  }

  @native({
    setNative: (view: TableCell, _key, value) => {
      if (value) {
        view.getOwner()?.selectCell?.(view);
      } else {
        if (view.getOwner()?.nativeView.selectedCell === view.nativeView) {
          view.getOwner()?.selectCell(null);
        }
      }
    },
  })
  declare selected: boolean;

  @native({
    setNative: (view: TableCell, _key, value) => {
      if (view.nativeView) {
        view.nativeView!.identifier = value;
      }
    },
  })
  declare identifier: string;

  dispatchSelectedEvent() {
    this.dispatchEvent(new TableCellSelectedEvent());
  }
}
