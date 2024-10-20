import "npm:@nativescript/macos-node-api@~0.1.1";
import { view } from "../decorators/view.ts";
import { ViewBase } from "../view/view-base.ts";
import { type Image, ImageLoadEvent } from "../image/image.ts";
import { Event } from "../../dom/dom-utils.ts";

export class ToolbarItemClickEvent extends Event {
  constructor(eventDict?: EventInit) {
    super("click", eventDict);
  }
}

@NativeClass
class ToolbarItemTarget extends NSObject {
  static ObjCExposedMethods = {
    click: { returns: interop.types.void, params: [interop.types.id] },
  };

  private _owner?: WeakRef<ToolbarItem>;

  public static initWithOwner(owner: WeakRef<ToolbarItem>): ToolbarItemTarget {
    const target = ToolbarItemTarget.new() as ToolbarItemTarget;
    target._owner = owner;
    return target;
  }

  public click() {
    const owner = this._owner?.deref();
    if (owner) {
      owner.dispatchEvent(new ToolbarItemClickEvent());
    }
  }
}

@view({
  name: "HTMLToolbarItemElement",
  tagName: "toolbar-item",
})
export class ToolbarItem extends ViewBase {
  static idCounter = 0;

  override nativeView?: NSToolbarItem = undefined;
  toolbarItemTarget?: ToolbarItemTarget;

  public override initNativeView(): NSToolbarItem | undefined {
    this.nativeView = NSToolbarItem.alloc().initWithItemIdentifier(
      (++ToolbarItem.idCounter).toString(),
    );
    this.toolbarItemTarget = ToolbarItemTarget.initWithOwner(new WeakRef(this));
    this.nativeView.target = this.toolbarItemTarget;
    this.nativeView.action = "click";
    return this.nativeView;
  }

  public override disposeNativeView(): void {
    this.nativeView = undefined;
  }

  onImageLoad?: (e: ImageLoadEvent) => void;

  public addNativeChild(child: Image): void {
    if (child.nodeName === "IMAGE") {
      if (this.nativeView) {
        this.onImageLoad = () => {
          if (child.nativeView!.image && this.nativeView) {
            this.nativeView.image = child.nativeView!.image;
            this.nativeView.toolbar?.validateVisibleItems();
          }
        };

        if (child.nativeView!.image) {
          this.onImageLoad(new ImageLoadEvent());
        }

        child.addEventListener("load", this.onImageLoad);
      }
    } else {
      throw new Error(
        `Invalid child type added to toolbar-item: ${child.nodeName}`,
      );
    }
  }

  public removeNativeChild(child: any): void {
    if (child.nodeName === "IMAGE") {
      if (this.nativeView) {
        // @ts-expect-error it can be null
        this.nativeView.image = null;
        if (this.onImageLoad) {
          child.removeEventListener("load", this.onImageLoad);
        }
      }
    } else {
      throw new Error(
        `Invalid child type removed from toolbar-item: ${child.nodeName}`,
      );
    }
  }
}
