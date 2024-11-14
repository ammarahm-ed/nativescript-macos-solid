import { getAttributeNS, setAttributeNS } from "../../dom/dom-utils.ts";
import { Layout } from "../../layout/index.ts";

export type NativePropertyConfig<T = any> = {
  setNative: (
    view: any,
    key: string,
    value: T,
    config: NativePropertyConfig<T>,
  ) => void;
  getNative?: (view: any) => any;
  shouldLayout?: boolean;
  hasChanged?: (oldValue: T, newValue: T) => boolean;
  converter?: {
    toNative?: (key: string, value: T) => any;
    fromNative?: (key: string, value: any) => T;
  };
  defaultValue?: T;
};
/**
 * The `native` decorator is used to enhance class properties with additional behavior based on a configuration object.
 * This decorator allows for advanced property management, including conversion between native and custom types,
 * default values, and change detection.
 *
 * @param {NativePropertyConfig<T>} config - An object that defines the configuration for the property. The configuration object can include the following properties:
 *   - `getNative?: (view: any) => any`: A function that retrieves the native value of the property from the given view.
 *   - `shouldLayout?: boolean`: A boolean indicating whether the layout should be updated when the property changes.
 *   - `hasChanged?: (oldValue: T, newValue: T) => boolean`: A function that determines if the property value has changed.
 *   - `converter?: { toNative?: (key: string, value: T) => any; fromNative?: (key: string, value: any) => T; }`: An object containing functions to convert the property value to and from its native representation.
 *     - `toNative?: (key: string, value: T) => any`: A function that converts the property value to its native representation.
 *     - `fromNative?: (key: string, value: any) => T`: A function that converts the native representation of the property value back to the custom type.
 *   - `defaultValue?: T`: The default value of the property if no value is set.
 *
 * @returns {Function} - A function that takes two parameters:
 *   - `_target: any`: The target object to which the property belongs.
 *   - `property: string`: The name of the property being decorated.
 *
 * The `native` decorator defines custom getters and setters for the decorated property:
 *
 * - **Getter**:
 *   - If `config.getNative` and `config.converter?.fromNative` are defined, the getter retrieves the native value using `config.getNative` and converts it using `config.converter.fromNative`.
 *   - If these functions are not defined, the getter retrieves the value from the attribute namespace using `getAttributeNS` or returns the `config.defaultValue`.
 *
 * - **Setter**:
 *   - Sets the property value, potentially using `config.converter.toNative` to convert the value to its native representation before setting it.
 */
export function native(config: NativePropertyConfig) {
  return function (_target: any, property: string) {
    if (config.defaultValue !== undefined) {
      _target.constructor._nativePropertyDefaults.set(property, config.defaultValue);
    }
    _target.constructor._nativeProperties.add(property);
    Object.defineProperty(_target, property, {
      get() {

        if (config.getNative && config.converter?.fromNative) {
          return config.converter.fromNative(property, config.getNative(this));
        }
        return getAttributeNS(this, null, property) ?? config.defaultValue;
      },
      set(value: any) {
        const oldValue = getAttributeNS(this, null, property) ??
          config.defaultValue;

        const hasChanged = !config.hasChanged
          ? oldValue !== value
          : config.hasChanged?.(oldValue, value);

        if (!hasChanged) return;

        setAttributeNS(this, null, property, value);

        const SetNativeKey = `${property}SetNative`;

        const pendingSetNative = function (this: any) {
          if (this[SetNativeKey]) {
            this[SetNativeKey].call(this, property, value, config);
          } else {
            const nativeValue = config.converter?.toNative?.(property, value) ??
              value;
            config.setNative(this, property, nativeValue, config);
          }

          if (config.shouldLayout) {
            if (this.isLeaf) {
              this.yogaNode.markDirty();
            }
            Layout.computeAndLayout(this);
          }
        };
        if (!this.nativeView) {
          this.pendingSetNative.set(property, pendingSetNative.bind(this));
        } else {
          pendingSetNative.call(this);
        }
        this.propertyChangedCallback(property, value, oldValue);
      },
    });
  };
}
