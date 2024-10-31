import "@nativescript/macos-node-api";

@NativeClass
export class NativeView extends NSView {
  //@ts-ignore
  isFlipped() {
    return true;
  }

  static ObjCExposedMethods = {
    isFlipped: { returns: interop.types.bool, params: [] },
  };
}
