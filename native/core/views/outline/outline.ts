import "@nativescript/macos-node-api";
import { Event } from "../../dom/dom-utils.ts";
import { native } from "../decorators/native.ts";
import { view } from "../decorators/view.ts";
import { TableCell } from "../table/table-cell.ts";
import { View } from "../view/view.ts";

export class OutlineViewItemSelectedEvent extends Event {
  declare index: number;
  declare item: TableCell;
  constructor(index: number, item: TableCell, eventDict?: EventInit) {
    super("itemSelected", eventDict);
    this.index = index;
    this.item = item;
  }
}

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

  outlineViewSelectionDidChange(notification: NSNotification): void {
    const outlineView = notification.object as NSOutlineView;
    const owner = this.outline;
    if (owner && outlineView) {
      const item = outlineView.itemAtRow(outlineView.selectedRow) as TableCell;
      owner.dispatchEvent(new OutlineViewItemSelectedEvent(outlineView.selectedRow, item));
      if (item) {
        item.dispatchSelectedEvent();
      }
    }
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

  public addNativeChild(_child: any) {
    this.nativeView?.reloadData();
    this.nativeView?.expandItem(_child);
    if (this.__pendingCellSelection) {
      this.selectCell(this.__pendingCellSelection);
      this.__pendingCellSelection = null;
    }
  }

  public removeNativeChild(_child: any): void {
    this.nativeView?.reloadData();
  }

  public connectedCallback(): void {
    super.connectedCallback();
  }

  private __pendingCellSelection: TableCell | null = null;

  expandParentsOfItem(item: TableCell) {
    while (item !== null && this.nativeView) {
      const parent = this.nativeView.parentForItem(item);
      if (!this.nativeView.isExpandable(parent)) {
        break;
      }
      if (!this.nativeView.isItemExpanded(parent)) {
        this.nativeView.expandItem(parent);
      }
      item = parent;
    }
  }

  public selectCell(cell: TableCell) {
    if (cell) {
      this.__pendingCellSelection = cell;
      if (cell.nativeView) {
        let index = this.nativeView?.rowForItem(cell) || 0;
        if (index < 0) {
          this.expandParentsOfItem(cell);
          index = this.nativeView?.rowForItem(cell) || 0;
          if (index < 0) return;
        }
        this.nativeView?.selectRowIndexesByExtendingSelection(
          NSIndexSet.indexSetWithIndex(index),
          false
        );
        this.__pendingCellSelection = null;
      }
    } else {
      this.nativeView?.deselectAll(null);
    }
  }
}
