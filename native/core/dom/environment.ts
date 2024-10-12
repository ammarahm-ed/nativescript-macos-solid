import { createEnvironment } from "undom-ng";
const initDocument = (document: any) => {
  document.body = document.createElement("view");
};

const {
  scope,
  createDocument,
  createElement,
  registerElement: registerElement,
} = createEnvironment({
  silent: true,
  initDocument: initDocument,
  onSetTextContent(text: string) {
    this.updateTextContent?.();
  },
  onSetData(data: any) {
    if (this.parentNode) {
      let parentElement = this.parentNode;
      while(parentElement.nodeType !== 1) {
        parentElement = parentElement.parentNode;
      }
      (parentElement as any).updateTextContent?.();
    }
  },
} as any) as unknown as {
  scope: typeof Scope;
  createDocument: (namespace: string, documentElementTag: string) => Document;
  createElement: (tagName: string) => Node;
  registerElement: (tagName: string, element: Node) => void;
};

globalThis.registerElement = registerElement;
globalThis.createElement = createElement;
globalThis.Scope = scope;
globalThis.HTMLElement = scope.HTMLElement;
globalThis.Node = scope.Node;
globalThis.EventTarget = scope.EventTarget;
globalThis.Element = scope.Element;
globalThis.Text = scope.Text;

const window = {
  Scope: scope,
  registerElement: registerElement,
  createElement: createElement,
} as any;

globalThis.window = window;

const registerGlobalDocument = (_global = globalThis) => {
  const document = createDocument("http://www.w3.org/1999/xhtml", "#view");
  window.document = document;
  globalThis.document = document;
};

export {
    createDocument, createElement,
    registerElement, registerGlobalDocument, scope
};

