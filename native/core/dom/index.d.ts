import { ViewBase } from "../views/view/view-base.ts";
import { View } from "../views/view/view.ts";

declare global {
  // undom
  var Scope: {
    Node: typeof Node;
    Element: typeof Element;
    Text: typeof Text;
    Comment: typeof Comment;
    Document: typeof Document;
    DocumentFragment: typeof DocumentFragment;
    HTMLElement: typeof HTMLElement;
    EventTarget: typeof EventTarget;
    CharacterData: typeof CharacterData;
  };

  // Defining views as elements is done as following
  interface HTMLViewBaseElement extends ViewBase {}
  var HTMLViewBaseElement: {
    new (): HTMLViewBaseElement;
    prototype: HTMLViewBaseElement;
  };

  interface HTMLViewElement extends View {}
  var HTMLViewElement: {
    new (): HTMLViewElement;
    prototype: HTMLViewBaseElement;
  };

  // Register your view here if needed, this is not required for JSX since JSX Intrinsic elements
  // are registered separately in jsx/index.d.ts
  interface HTMLElementTagNameMap {
    view: HTMLViewElement;
  }

  function registerElement(tagName: string, element: any): void;
  function createElement(tagName: string): Node;

  interface Node {
    connectedCallback?(): void;
    disconnectedCallback?(): void;
    updateTextContent?(): void;
  }
}

export { };