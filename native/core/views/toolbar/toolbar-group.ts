import "@nativescript/macos-node-api";
import { view } from "../decorators/view.ts";
import { Event } from "../../dom/dom-utils.ts";
import { ToolbarItem } from "./toolbar-item.ts";
import type { ViewBase } from "../view/view-base.ts";
import { native } from "../decorators/native.ts";

export class ToolbarGroupSelectedEvent extends Event {
  selectedIndex: number;

  constructor(selectedIndex: number, eventDict?: EventInit) {
    super("selected", eventDict);
    this.selectedIndex = selectedIndex;
  }
}

export type ToolbarGroupSelectionMode = "selectOne" | "selectAny" | "momentary";

@NativeClass
class NativeToolbarGroupTarget extends NSObject {
  static ObjCExposedMethods = {
    selected: { returns: interop.types.void, params: [interop.types.id] },
  };

  private _owner?: WeakRef<ToolbarGroup>;

  public static initWithOwner(
    owner: WeakRef<ToolbarGroup>,
  ): NativeToolbarGroupTarget {
    const item = NativeToolbarGroupTarget.new() as NativeToolbarGroupTarget;
    item._owner = owner;
    return item;
  }

  public selected(sender: NSToolbarItemGroup) {
    const owner = this._owner?.deref();
    if (owner) {
      owner.dispatchEvent(new ToolbarGroupSelectedEvent(sender.selectedIndex));
    }
  }
}

@view({
  name: "HTMLToolbarGroupElement",
  tagName: "toolbar-group",
})
export class ToolbarGroup extends ToolbarItem {
  override nativeView?: NSToolbarItemGroup = undefined;

  private target?: NativeToolbarGroupTarget;

  private items: NSToolbarItem[] = [];

  public override initNativeView(): NSToolbarItemGroup | undefined {
    this.target = NativeToolbarGroupTarget.initWithOwner(new WeakRef(this));
    this.nativeView = NSToolbarItemGroup.alloc().initWithItemIdentifier(
      NSUUID.UUID().UUIDString,
    );
    return this.nativeView;
  }

  public override disposeNativeView(): void {
    this.target = undefined;
    this.items = [];
    this.nativeView = undefined;
  }

  public addNativeChild(child: ViewBase): void {
    if (child.nodeName === "TOOLBAR-ITEM") {
      this.items.push(child.nativeView);
      if (this.nativeView) {
        this.nativeView.subitems = this.items;
      }
    } else {
      throw new Error(
        `Invalid child type added to toolbar-item: ${child.nodeName}`,
      );
    }
  }

  public removeNativeChild(child: any): void {
    if (child.nodeName === "TOOLBAR-ITEM") {
      const index = this.items.indexOf(child.nativeView);
      if (index !== -1) {
        this.items.splice(index, 1);
        if (this.nativeView) {
          this.nativeView.subitems = this.items;
        }
      }
    } else {
      throw new Error(
        `Invalid child type removed from toolbar-item: ${child.nodeName}`,
      );
    }
  }

  @native({
    setNative: (view: ToolbarGroup, _key, value) => {
      if (view.nativeView) {
        view.nativeView.selectedIndex = value;
      }
    },
  })
  declare selectedIndex: number;

  @native({
    setNative: (view: ToolbarGroup, _key, value) => {
      if (view.nativeView) {
        switch (value) {
          case "selectOne":
            view.nativeView.selectionMode =
              NSToolbarItemGroupSelectionMode.SelectOne;
            break;
          case "selectAny":
            view.nativeView.selectionMode =
              NSToolbarItemGroupSelectionMode.SelectAny;
            break;
          case "momentary":
            view.nativeView.selectionMode =
              NSToolbarItemGroupSelectionMode.Momentary;
            break;
          default:
            throw new Error(`Invalid selection mode: ${value}`);
        }
      }
    },
  })
  declare selectionMode: ToolbarGroupSelectionMode;

  @native({
    setNative: (view: ToolbarGroup, _key, value) => {
      if (view.nativeView) {
        view.nativeView = NSToolbarItemGroup
          .groupWithItemIdentifierTitlesSelectionModeLabelsTargetAction(
            NSUUID.UUID().UUIDString,
            value,
            view.nativeView.selectionMode,
            value,
            view.target,
            "selected",
          );

        view.nativeView.controlRepresentation =
          NSToolbarItemGroupControlRepresentation.Automatic;
      }
    },
  })
  declare titles: string[];
}
