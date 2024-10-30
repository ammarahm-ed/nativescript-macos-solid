import "@nativescript/macos-node-api";

@NativeClass
export class NativeTarget extends NSObject {
  static ObjCExposedMethods = {
    action: { returns: interop.types.void, params: [interop.types.id] },
  };
  selector = "action";
  _action?: () => void;

  static initWithAction(action: any): NativeTarget {
    const target = NativeTarget.new();
    target.action = action;
    return target;
  }

  action() {
    this._action?.();
  }
}
