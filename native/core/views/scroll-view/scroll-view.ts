import "@nativescript/macos-node-api";
import { view } from "../decorators/view.ts";
import { View } from "../view/view.ts";
import type { YogaNodeLayout } from "../../layout/index.ts";

export class NSScrollViewAutoResizable extends NSScrollView {
  static {
    NativeClass(this);
  }
}

@view({
  name: "HTMLScrollViewElement",
  tagName: "scroll-view",
})
export class ScrollView extends View {
  override nativeView?: NSScrollView = undefined;

  public override initNativeView(): NSScrollView | undefined {
    this.nativeView = NSScrollViewAutoResizable.new();
    this.nativeView.hasVerticalScroller = true;
    this.nativeView.hasHorizontalScroller = false;
    this.nativeView.drawsBackground = false;
    
    return this.nativeView;
  }

  public override addNativeChild(child: any) {
    this.nativeView!.documentView = (child as View).nativeView as NSView;
  }

  public override removeNativeChild(_child: any): void {
    // @ts-expect-error documentView is nullable
    this.nativeView!.documentView = null;
  }

  applyLayout(parentLayout?: YogaNodeLayout): void {
    super.applyLayout(parentLayout);
    this.nativeView!.translatesAutoresizingMaskIntoConstraints = true;
  }
}
