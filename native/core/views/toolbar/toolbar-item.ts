import "@nativescript/macos-node-api";
import { view } from "../decorators/view.ts";
import { ViewBase } from "../view/view-base.ts";
import { ImageLoadEvent } from "../image/image.ts";
import { Event } from "../../dom/dom-utils.ts";
import { native } from "../decorators/native.ts";

export class ToolbarItemClickEvent extends Event {
  constructor(eventDict?: EventInit) {
    super("click", eventDict);
  }
}

@NativeClass
export class NativeToolbarItem extends NSToolbarItem {
  static ObjCExposedMethods = {
    click: { returns: interop.types.void, params: [interop.types.id] },
  };

  private _owner?: WeakRef<ToolbarItem>;

  public static initWithOwner(owner: WeakRef<ToolbarItem>): NativeToolbarItem {
    const item = NativeToolbarItem.alloc().initWithItemIdentifier(
      crypto.randomUUID(),
    );
    item._owner = owner;
    item.target = item;
    item.action = "click";
    return item;
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
  override nativeView?: NSToolbarItem = undefined;

  public override initNativeView(): NSToolbarItem | undefined {
    this.nativeView = NativeToolbarItem.initWithOwner(new WeakRef(this));
    return this.nativeView;
  }

  public override disposeNativeView(): void {
    this.nativeView = undefined;
  }

  onImageLoad?: (e: ImageLoadEvent) => void;

  public addNativeChild(child: ViewBase): void {
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
    } else if (this.nativeView) {
      this.nativeView.view = child.nativeView;
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
    } else if (this.nativeView) {
      // @ts-expect-error it can be null
      this.nativeView.view = null;
    }
  }

  @native({
    setNative: (view: ToolbarItem, _key, value) => {
      if (view.nativeView) {
        view.nativeView.label = value;
      }
    },
  })
  declare label: string;

  @native({
    setNative: (view: ToolbarItem, _key, value) => {
      if (view.nativeView) {
        view.nativeView.paletteLabel = value;
      }
    },
  })
  declare paletteLabel: string;

  @native({
    setNative: (view: ToolbarItem, _key, value) => {
      if (view.nativeView) {
        view.nativeView.title = value;
      }
    },
  })
  declare title: string;

  @native({
    setNative: (view: ToolbarItem, _key, value) => {
      if (view.nativeView) {
        view.nativeView.toolTip = value;
      }
    },
  })
  declare toolTip: string;

  @native({
    setNative: (view: ToolbarItem, _key, value) => {
      if (view.nativeView) {
        view.nativeView.isBordered = value;
      }
    },
  })
  declare bordered: boolean;

  @native({
    setNative: (view: ToolbarItem, _key, value) => {
      if (view.nativeView) {
        view.nativeView.isNavigational = value;
      }
    },
  })
  declare navigational: boolean;

  @native({
    setNative: (view: ToolbarItem, _key, value) => {
      if (view.nativeView) {
        view.nativeView.isEnabled = value;
      }
    },
  })
  declare enabled: boolean;
}
