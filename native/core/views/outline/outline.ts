import "npm:@nativescript/macos-node-api@~0.1.1";
import { view } from "../decorators/view.ts";
import { View } from "../view/view.ts";
import { native } from "../decorators/native.ts";
import { TableCell } from "../table/table-cell.ts";

@NativeClass
class OutlineViewDataSource
  extends NSObject
  implements NSOutlineViewDataSource, NSOutlineViewDelegate
{
  static ObjCProtocols = [NSOutlineViewDataSource, NSOutlineViewDelegate];

  static initWithOwner(owner: WeakRef<Outline>) {
    const dataSource = OutlineViewDataSource.new();
    dataSource._owner = owner;
    return dataSource;
  }

  _owner?: WeakRef<Outline>;

  get outline() {
    return this._owner?.deref();
  }

  outlineViewNumberOfChildrenOfItem(
    _outlineView: NSOutlineView,
    item: View | null
  ): number {
    if (item) {
      return item.children.length - 2;
    } else {
      return this.outline!.children.length;
    }
  }

  outlineViewViewForTableColumnItem(
    _outlineView: NSOutlineView,
    _tableColumn: NSTableColumn | null,
    item: TableCell
  ): NSView {
    return item.nativeView!;
  }

  outlineViewIsItemExpandable(
    _outlineView: NSOutlineView,
    item: View
  ): boolean {
    return item.children.length > 2;
  }

  outlineViewChildOfItem(
    _outlineView: NSOutlineView,
    index: number,
    item: View | null
  ) {
    if (item) {
      return item.children[index + 2];
    } else {
      return this.outline!.children[index];
    }
  }

  outlineViewObjectValueForTableColumnByItem(
    _outlineView: NSOutlineView,
    _tableColumn: NSTableColumn | null,
    item: interop.Object | null
  ) {
    return item;
  }
}

@view({
  name: "HTMLOutlineElement",
  tagName: "outline",
})
export class Outline extends View {
  nativeView?: NSOutlineView = undefined;

  dataSource!: OutlineViewDataSource;

  public initNativeView(): NSOutlineView | undefined {
    const outline = NSOutlineView.new();

    this.dataSource = OutlineViewDataSource.initWithOwner(new WeakRef(this));

    // @ts-expect-error It's nullable
    outline.headerView = null;
    outline.autosaveExpandedItems = true;
    outline.indentationPerLevel = 10;
    outline.allowsColumnReordering = false;
    outline.allowsColumnResizing = false;
    outline.allowsColumnSelection = false;
    outline.allowsEmptySelection = false;
    outline.rowSizeStyle = NSTableViewRowSizeStyle.Medium;

    outline.delegate = this.dataSource;
    outline.dataSource = this.dataSource;

    const tableColumn = NSTableColumn.alloc().initWithIdentifier("Column");
    outline.addTableColumn(tableColumn);
    outline.outlineTableColumn = tableColumn;

    this.nativeView = outline;
    // expand all items by default
    this.nativeView.expandItemExpandChildren(null, true);

    return this.nativeView;
  }

  @native({
    setNative(view: Outline, _key, value) {
      if (view.nativeView) {
        view.nativeView.indentationPerLevel = value;
      }
    },
  })
  declare identationPerLevel: number;

  @native({
    setNative(view: Outline, _key, value) {
      if (view.nativeView) {
        view.nativeView.rowSizeStyle = value;
      }
    },
  })
  declare rowSizeStyle: (typeof NSTableViewRowSizeStyle)[keyof typeof NSTableViewRowSizeStyle];

  public addNativeChild(_child: any) {}

  public removeNativeChild(_child: any): void {}
}
