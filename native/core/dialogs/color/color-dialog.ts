import "@nativescript/macos-node-api";

type ChangeCallback = ((color: string) => void | undefined) | undefined;
export interface ColorDialogOptions {
  color?: string;
  change?: ChangeCallback;
}
let colorDialog: NSColorPanel;
let colorTarget: NativeColorTarget;

class NativeColorTarget extends NSObject {
  static ObjCExposedMethods = {
    changeColor: { returns: interop.types.void, params: [interop.types.id] },
  };

  static {
    NativeClass(this);
  }

  declare _resolve: Function;
  declare _changeCallback: ChangeCallback;
  static initWithResolve(resolve: Function, changeCallback: ChangeCallback) {
    const delegate = NativeColorTarget.new();
    delegate._resolve = resolve;
    delegate._changeCallback = changeCallback;
    return delegate;
  }

  changeColor(_id: this) {
    if (this._changeCallback) {
      this._changeCallback(nsColorToHex(colorDialog.color));
    } else if (this._resolve) {
      this._resolve(nsColorToHex(colorDialog.color));
    }
  }
}

export function openColorDialog(options: ColorDialogOptions) {
  return new Promise<string | undefined>((resolve) => {
    colorDialog = NSColorPanel.new();
    colorDialog.setIsVisible(true);
    colorDialog.isContinuous = true;
    if (options.color) {
      colorDialog.color = hexToNSColor(options.color);
    }
    colorTarget = NativeColorTarget.initWithResolve(resolve, options.change);
    colorDialog.setTarget(colorTarget);
    colorDialog.setAction("changeColor");
  });
}

export function hexToNSColor(hex: string) {
  // Ensure that the hex string is in the format "#RRGGBB" or "RRGGBB"
  hex = hex.replace(/^#/, '');

  // Parse the red, green, and blue components
  var red = parseInt(hex.substring(0, 2), 16) / 255.0;
  var green = parseInt(hex.substring(2, 4), 16) / 255.0;
  var blue = parseInt(hex.substring(4, 6), 16) / 255.0;

  // Create and return an NSColor object
  return NSColor.colorWithSRGBRedGreenBlueAlpha(red, green, blue, 1.0); // Alpha is set to 1.0 for full opacity
}

export function nsColorToHex(color: NSColor) {
  // Get the color components
  var red = color.redComponent;
  var green = color.greenComponent;
  var blue = color.blueComponent;
  
  // Convert to 255 scale and then to hex
  var r = Math.round(red * 255).toString(16).padStart(2, '0');
  var g = Math.round(green * 255).toString(16).padStart(2, '0');
  var b = Math.round(blue * 255).toString(16).padStart(2, '0');

  // Return the hex color code
  return `#${r}${g}${b}`;
}
