import "npm:@nativescript/macos-node-api@~0.1.1";
import { view } from "../decorators/view.ts";
import { View } from "../view/view.ts";

export class NSScrollViewAutoResizable extends NSScrollView {
  static {
    NativeClass(this);
  }

  override viewDidMoveToSuperview(): void {
    if (!this.superview) {
      return;
    }

    NSLayoutConstraint.activateConstraints([
      this.topAnchor.constraintEqualToAnchor(this.superview.topAnchor),
      this.bottomAnchor.constraintEqualToAnchor(this.superview.bottomAnchor),
      this.leadingAnchor.constraintEqualToAnchor(this.superview.leadingAnchor),
      this.trailingAnchor.constraintEqualToAnchor(
        this.superview.trailingAnchor,
      ),
    ]);
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
    this.nativeView.translatesAutoresizingMaskIntoConstraints = false;
    return this.nativeView;
  }

  public override addNativeChild(child: any) {
    this.nativeView!.documentView = (child as View).nativeView as NSView;
  }

  public override removeNativeChild(_child: any): void {
    // @ts-expect-error documentView is nullable
    this.nativeView!.documentView = null;
  }
}