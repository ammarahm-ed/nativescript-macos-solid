import { ViewBase } from "../views/view/view-base.ts";
import { View } from "../views/view/view.ts";
import type { Slider } from "../views/slider/slider.ts";

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
  interface HTMlButtonElement extends HTMLViewBaseElement {}

  var HTMlButtonElement: {
    new (): HTMlButtonElement;
    prototype: HTMlButtonElement;
  };
  
  interface HTMLScrollViewElement extends View {}

  var HTMLScrollViewElement: {
    new (): HTMLScrollViewElement;
    prototype: HTMLViewBaseElement;
  };

  interface HTMLImageElement extends View {}

  var HTMLImageElement: {
    new (): HTMLImageElement;
    prototype: HTMLImageElement;
  };

  interface HTMLTableCellElement extends View {}

  var HTMLTableCellElement: {
    new (): HTMLTableCellElement;
    prototype: HTMLTableCellElement;
  };

  interface HTMLOutlineElement extends View {}

  var HTMLOutlineElement: {
    new (): HTMLOutlineElement;
    prototype: HTMLOutlineElement;
  };

  interface HTMlTextElement extends Text {}

  var HTMlTextElement: {
    new (): HTMlTextElement;
    prototype: HTMlTextElement;
  };

  interface HTMLSliderElement extends Slider {}
  var HTMLSliderElement: {
    new (): HTMLSliderElement;
    prototype: HTMLSliderElement;
  };

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

export {};
