import "@nativescript/macos-node-api";
/**
 * A decorator function that registers a view with the global scope.
 *
 * @param name - The name of the View to be registered.
 * @param tagName - The tag name of the view.
 * @returns A function that takes a constructor and defines a `register` method on it.
 *
 * The `register` method, when called, will:
 * 1. Assign the constructor to the global scope using the provided `name`.
 * 2. Register the view with the global document object.
 *
 * Example usage:
 *
 * ```typescript
 * @view('HTMLViewElement', 'my-element-tag')
 * class View extends ViewBase {
 *   // Custom view logic
 * }
 *
 * // To register the view
 * View.register();
 * ```
 */
export function view({
  name,
  tagName,
}: {
  /**
   * The name of the View class in the global scope
   */
  name: string;
  /**
   * The tag name of the view
   */
  tagName: string;
}) {
  return function (constructor: any) {
    Object.defineProperty(constructor, "_register", {
      value: () => {
        //@ts-expect-error dynamically adding to globalThis
        globalThis[name] = constructor;
        //@ts-expect-error dynamically adding to globalThis
        globalThis.registerElement(tagName, globalThis[name]);
      },
    });
  };
}
