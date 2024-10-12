import { CombinedStyle } from "../../style/index.ts";
import { NativePropertyConfig } from "./native.ts";

/**
 * A decorator function that can be used for style and view properties to override default native setter functions.
 * @param propertyName - The name of the property for which the native setter will be defined.
 *
 * Example usage:
 *
 * ```typescript
 * class Example {
 *   @overrides('exampleProperty')
 *   someMethod<T = any>(key: string, value: T, config: NativePropertyConfig<T>) {
 *     this.nativeView.exampleProperty = value;
 *   }
 * }
 * ```
 */
export function overrides(propertyName: keyof CombinedStyle | {} & string) {
  return function (_target: any, setNativeName: string) {
    Object.defineProperty(_target, `${propertyName}SetNative`, {
      value: _target[setNativeName] as NativePropertyConfig["setNative"],
    });
  };
}
