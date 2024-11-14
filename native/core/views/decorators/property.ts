export type ElementPropertyConfig = {
  onChange?(this: any, newValue: any, oldValue: any): void;
  defaultValue?: any
};
export function property(config?: ElementPropertyConfig) {
  return function (_target: any, property: string) {
    Object.defineProperty(_target, property, {
      get() {
        return this.getAttribute(property);
      },
      set(value: any) {
        const oldValue = this.getAttribute(property);
        this.setAttribute(property, value);
        if (config?.onChange) {
          config.onChange.call(this, value, oldValue);
        }
      },
    });
  };
}
