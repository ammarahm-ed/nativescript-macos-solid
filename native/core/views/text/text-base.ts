import { MeasureMode } from "npm:yoga-layout/load";
import { ViewBase } from "../view/view-base.ts";

export class TextBase extends ViewBase {
  override get isLeaf(): boolean {
    // Text is always a leaf node.
    return true;
  }

  override updateTextContent() {
    console.warn("TextBase.updateTextContent() is not implemented ");
  }

  override onMeasureFunction(
    width: number,
    widthMode: MeasureMode,
    height: number,
    heightMode: MeasureMode
  ) {
    if (this.nativeView?.sizeThatFits) {
      return super.onMeasureFunction(width, widthMode, height, heightMode);
    }

    const constrainedWidth =
      widthMode === MeasureMode.Undefined ? Number.MAX_VALUE : width;
    const constrainedHeight =
      heightMode === MeasureMode.Undefined ? Number.MAX_VALUE : height;

    const text = this.nativeView as NSTextView;

    const size = !text
      ? { width: 0, height: 0 }
      : NSAttributedString.alloc()
          .initWithStringAttributes(text.string || "", {
            [NSFontAttributeName]: text.font,
            [NSKernAttributeName]: 1
          })
          .boundingRectWithSizeOptionsContext(
            {
              width: constrainedWidth,
              height: constrainedHeight,
            },
            NSStringDrawingOptions.UsesFontLeading |
              NSStringDrawingOptions.UsesLineFragmentOrigin,
            null
          ).size;

    return {
      width: this.measure(
        constrainedWidth,
        Math.ceil(size.width + 10),
        widthMode
      ),
      height: this.measure(
        constrainedHeight,
        Math.ceil(size.height),
        heightMode
      ),
    };
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.updateTextContent();
  }
}
