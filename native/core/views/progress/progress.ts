import { native, type NativePropertyConfig } from "../decorators/native.ts";
import { view } from "../decorators/view.ts";
import { ViewBase } from "../view/view-base.ts";

const ProgressProperty: NativePropertyConfig = {
  setNative: (view: Progress, _key, value) => {
    if (view.nativeView) {
      view.nativeView.doubleValue = value;
    }
  },
  shouldLayout: true,
};

const IndeterminateProperty: NativePropertyConfig = {
  setNative: (view: Progress, _key, value) => {
    if (!view.nativeView) return;
    view.nativeView.isIndeterminate = value;
    if (value) {
      view.nativeView.startAnimation(view.nativeView);
    } else {
      view.nativeView.stopAnimation(view.nativeView);
    }
  },
  shouldLayout: true,
};

@view({
  name: "HTMLProgressElement",
  tagName: "progress",
})
export class Progress extends ViewBase {
  declare nativeView: NSProgressIndicator;
  override get isLeaf(): boolean {
    return true;
  }

  public override initNativeView(): NSProgressIndicator {
    this.nativeView = NSProgressIndicator.alloc().init();
    return this.nativeView;
  }

  public override prepareNativeView(nativeView: NSProgressIndicator): void {
    nativeView.style = NSProgressIndicatorStyle.Bar;
    nativeView.controlSize = NSControlSize.Small;
    nativeView.isIndeterminate = false;
  }

  @native(ProgressProperty)
  declare progress: number;

  @native(IndeterminateProperty)
  declare indeterminate: boolean;

  @native({
    setNative(view: Progress, _key, value) {
      if (view.nativeView) {
        view.nativeView.minValue = value;
      }
    },
  })
  declare minValue: number;

  @native({
    setNative(view: Progress, _key, value) {
      if (view.nativeView) {
        view.nativeView.maxValue = value;
      }
    },
  })
  declare maxValue: number;

  @native({
    setNative(view: Progress, _key, value) {
      if (view.nativeView) {
        view.nativeView.style =
          value === "bar"
            ? NSProgressIndicatorStyle.Bar
            : NSProgressIndicatorStyle.Spinning;
      }
    },
  })
  declare type: "bar" | "spinner";

  @native({
    setNative(view: Progress, _key, value) {
      if (view.nativeView) {
        switch (value) {
          case "regular":
            view.nativeView.controlSize = NSControlSize.Regular;
            break;
          case "small":
            view.nativeView.controlSize = NSControlSize.Small;
            break;
          case "mini":
            view.nativeView.controlSize = NSControlSize.Mini;
            break;
          case "large":
            view.nativeView.controlSize = NSControlSize.Large;
            break;
          default:
            view.nativeView.controlSize = NSControlSize.Regular;
        }
      }
    },
  })
  declare size: "regular" | "small" | "mini" | "large";
}
