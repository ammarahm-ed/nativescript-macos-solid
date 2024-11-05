// deno-lint-ignore-file ban-ts-comment
import { MeasureMode } from "npm:yoga-layout/load";
import { Layout, YogaNode, YogaNodeLayout } from "../../layout/index.ts";
import { CombinedStyle, Style } from "../../style/index.ts";
import { native, type NativePropertyConfig } from "../decorators/native.ts";
import { overrides } from "../decorators/overrides.ts";

export class ViewBase extends HTMLElement {
  private _nativePropertyDefaults: Map<string, any> = new Map();
  static register() {
    //@ts-ignore
    if (this._register) {
      //@ts-ignore
      this._register();
    } else {
      console.warn(`View ${this.name} is missing the @view decorator.`);
    }
  }
  declare parentNode: ViewBase | null;
  public shouldAttachToParentNativeView: boolean = true;
  pauseLayoutUpdates?: boolean;
  viewController?: NSViewController;
  supportedNodeTypes?: number[];
  pendingSetNative: Map<string, () => void> = new Map();
  isRoot: boolean = false;

  nativeView?: any;

  _styleInternal?: Style;

  get styleInternal(): Style {
    if (!this._styleInternal) {
      return (this._styleInternal = new Style(this));
    }
    return this._styleInternal;
  }

  _yogaNode?: YogaNode;
  _isDirty?: boolean;
  get yogaNode(): YogaNode {
    if (!this._yogaNode) {
      this._yogaNode = Layout.createYogaNode();
      if (this.isLeaf) {
        this._yogaNode.setMeasureFunc(this.onMeasureFunction.bind(this));
      }
    }
    return this._yogaNode;
  }

  _rootView?: ViewBase = undefined;

  get rootYogaNode(): YogaNode {
    if (!this._rootView) return this.yogaNode;
    return this.isRoot ? this.yogaNode : this._rootView?.yogaNode;
  }

  public initNativeView(): any | undefined {
    return undefined;
  }

  public prepareNativeView(_nativeView: any): void {}

  public disposeNativeView(): void {
    this.nativeView = undefined;
  }

  //@ts-ignore
  set style(style: CombinedStyle) {
    if (!style) {
      this.styleInternal.clear();
    }
    for (const key in style) {
      //@ts-ignore
      this.styleInternal[key] = style[key];
    }
  }

  //@ts-ignore
  get style(): Style {
    return this.styleInternal;
  }

  applyLayout(_parentLayout?: YogaNodeLayout): void {
    if (!this.isIncludedInLayout) return;
    const layout = this.yogaNode?.getComputedLayout();
    if (layout && this.nativeView) {
      // const parentHeight = parentLayout?.height || 0;

      const width = isNaN(layout.width) ? 0 : layout.width;
      const height = isNaN(layout.height) ? 0 : layout.height;

      (this.nativeView as NSView).translatesAutoresizingMaskIntoConstraints =
        false;

      const isAbsolute = this.style.position === "absolute";

      (this.nativeView as NSView).frame = {
        origin: {
          x: layout.left,
          // Reverse the origin so that view's are rendered from
          // the top left instead of default bottom right.
          y: layout.top < 0 && !isAbsolute ? 0 : layout.top,
          // y: parentLayout
          //   ? Math.max(parentHeight - layout.top - height, 0)
          //   : layout.top,
        },
        size: {
          width,
          height,
        },
      };

      this.applyLayoutToChildern(layout);
    }
  }

  applyLayoutToChildern(layout?: YogaNodeLayout) {
    let child = this.firstChild;
    while (child) {
      if (child.nodeType === 1) {
        (child as ViewBase).applyLayout?.(layout);
      }
      child = child.nextSibling;
    }
  }

  get isLeaf(): boolean {
    return false;
  }

  _isIncludedInLayout: boolean = true;
  _isEnabled: boolean = true;
  get isEnabled(): boolean {
    return this._isEnabled;
  }

  get isIncludedInLayout(): boolean {
    return this._isIncludedInLayout && this.isEnabled;
  }

  insertBefore<T extends Node>(node: T, child: Node | null): T {
    if (
      this.supportedNodeTypes &&
      !this.supportedNodeTypes.includes(node.nodeType)
    ) {
      return node;
    }

    super.insertBefore(node, child);

    if (
      node.nodeType === 1 &&
      this.isEnabled &&
      !this.isLeaf &&
      (node as any).isEnabled &&
      !(node as any).isRoot
    ) {
      this._addYogaChild(node as any, !!child);
    }
    this.setRootView(node);

    node.connectedCallback?.();

    return node;
  }

  private setRootView(node: any) {
    node._rootView =
      node.isRoot || !node.parentNode ? node : node.parentNode._rootView;

    let child = node.firstChild;
    while (child) {
      if (child.nodeType == Node.ELEMENT_NODE) {
        this.setRootView(child);
      }
      child = child.nextSibling;
    }
    if (node.isLeaf) {
      node.yogaNode.markDirty();
    }
  }

  private _addYogaChild(node?: Node, hasRef?: boolean) {
    if (hasRef) {
      // Remove all childern from yogaNode
      let child = this.firstChild;
      while (child) {
        if ((child as any).isEnabled && (child as any).yogaNode) {
          this.yogaNode.removeChild((child as any).yogaNode);
        }
        child = child.nextSibling;
      }
      // Add all childern to yogaNode
      child = this.firstChild;
      while (child) {
        if ((child as any).isEnabled && (child as any).yogaNode) {
          this.yogaNode.insertChild(
            (child as any).yogaNode,
            this.yogaNode.getChildCount()
          );
        }
        child = child.nextSibling;
      }
    } else if (node) {
      this.yogaNode.insertChild(
        (node as any).yogaNode,
        this.yogaNode.getChildCount()
      );
    }
  }

  onDocumentFragmentAdded() {
    // Reinsert all yoga childern in correct order after a document fragment is added
    this._addYogaChild(undefined, true);
  }

  /**
   * The onMeasureFunction method is responsible for determining the size
   * of a view by considering the provided width and height constraints.
   *  It uses the sizeThatFits method of the native view (if available)
   * to calculate the optimal size based on these constraints.
   * If the native view is not present, it simply returns the provided
   * dimensions.
   */
  onMeasureFunction(
    width: number,
    widthMode: MeasureMode,
    height: number,
    heightMode: MeasureMode
  ) {
    if (this.nativeView?.sizeThatFits || this.nativeView?.sizeToFit) {
      const constrainedWidth =
        widthMode === MeasureMode.Undefined ? Number.MAX_VALUE : width;
      const constrainedHeight =
        heightMode === MeasureMode.Undefined ? Number.MAX_VALUE : height;

      const fittingSize = this.nativeView?.fittingSize;

      let size = this.nativeView?.sizeThatFits?.({
        width: constrainedWidth,
        height: constrainedHeight,
      }) ||
        fittingSize || { width: 0, height: 0 };

      size = {
        width: Math.max(size.width, fittingSize.width),
        height: Math.max(size.height, fittingSize.height),
      };

      return {
        width: this.measure(constrainedWidth, size.width, widthMode),
        height: this.measure(constrainedHeight, size.height, heightMode),
      };
    }

    return { width: width, height: height };
  }

  measure(
    constrainedSize: number,
    measuredSize: number,
    measureMode: MeasureMode
  ) {
    let result;
    if (measureMode === MeasureMode.Exactly) {
      result = constrainedSize;
    } else if (measureMode === MeasureMode.AtMost) {
      result = Math.min(constrainedSize, measuredSize);
    } else {
      result = measuredSize;
    }

    return result;
  }

  removeChild<T extends Node>(child: T): T {
    if (child.nodeType == 1) {
      (child as any).shouldAttachToParentNativeView &&
        this.removeNativeChild(child);

      child.disconnectedCallback?.();
    }
    super.removeChild(child);

    return child;
  }

  public addNativeChild(child: any) {
    this.nativeView?.addSubview((child as ViewBase).nativeView as NSView);
  }

  public removeNativeChild(child: any) {
    (child as ViewBase).nativeView?.removeFromSuperview();
  }

  public connectedCallback() {
    if (this.parentNode && !this.parentNode?.isConnected) {
      return;
    }
    //@ts-ignore
    this.isConnected = true;

    if (!this._rootView && !this.parentNode) {
      this._rootView = this;
      this.isRoot = true;
    }

    if (!this.nativeView) {
      const nativeView = this.initNativeView();
      this.prepareNativeView(nativeView);
    }
    let pausedUpdates = false;
    if (this._rootView) {
      if (!this._rootView.pauseLayoutUpdates) {
        this._rootView.pauseLayoutUpdates = true;
        pausedUpdates = true;
      }
    }

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child.nodeType === 1) {
        child.connectedCallback?.();
      }
    }

    this.setNativeProperties();

    /**
     * Some views might not want to attach to the parent native view.
     * For example, the window element.
     */
    if (this.parentNode && this.shouldAttachToParentNativeView) {
      this.viewController =
        this.viewController || (this.parentNode as ViewBase).viewController;
      (this.parentNode as any).addNativeChild(this);
    }

    if (pausedUpdates && this._rootView?.pauseLayoutUpdates) {
      this._rootView.pauseLayoutUpdates = false;
      Layout.computeAndLayout(this._rootView);
    }
  }

  public disconnectedCallback() {
    //@ts-ignore
    this.isConnected = false;

    let pausedUpdates = false;
    if (this._rootView) {
      if (!this._rootView.pauseLayoutUpdates) {
        this._rootView.pauseLayoutUpdates = true;
        pausedUpdates = true;
      }
    }

    let childNode = this.firstChild;
    while (childNode) {
      if (childNode.nodeType === 1) {
        //@ts-ignore
        childNode.disconnectedCallback();
      }
      childNode = childNode.nextSibling;
    }

    if (this.isEnabled && !this.isRoot) {
      this.yogaNode.getParent()?.removeChild(this.yogaNode);
    }

    if (this.yogaNode) {
      this.yogaNode.free();
      this._yogaNode = undefined;
    }

    if (pausedUpdates && this._rootView?.pauseLayoutUpdates) {
      this._rootView.pauseLayoutUpdates = false;
      Layout.computeAndLayout(this._rootView);
    }

    this._rootView = undefined;
    this.disposeNativeView();
  }

  setAttributeNS(
    _namespace: string | null,
    qualifiedName: string,
    value: string
  ): void {
    if (qualifiedName in this) {
      //@ts-ignore
      this[qualifiedName] = value;
    } else {
      super.setAttributeNS(_namespace, qualifiedName, value);
    }
  }

  getAttributeNS(_namespace: string | null, qualifiedName: string): any {
    if (qualifiedName in this) {
      //@ts-ignore
      return this[qualifiedName];
    } else {
      return super.getAttributeNS(_namespace, qualifiedName);
    }
  }

  setNativeProperties() {
    if (this.nativeView) {
      for (const [k, v] of this._nativePropertyDefaults) {
        if (!this.pendingSetNative.has(k)) {
          this.setAttribute(k, v);
        }
      }
      this.pendingSetNative.forEach((value) => value());

      for (const [k, v] of this.style._nativeStyleDefaults) {
        if (!this.style.pendingSetNative.has(k)) {
          //@ts-ignore
          this.style[k] = v;
        }
      }
      this.style.pendingSetNative.forEach((value) => value());
    }
  }

  propertyChangedCallback(_property: string, _value: any, _oldValue: any) {}

  applySafeAreaPaddings() {
    if (this._safeAreaPadding) {
      let topSafeAreaPadding = 0;
      let window = this.nativeView.window;
      // Find nearest window element
      if (this.nodeName !== "WINDOW" && !window) {
        let currentNode: any = this.parentNode;
        while (window == null && currentNode !== null) {
          if (currentNode.nodeName === "WINDOW") {
            window = currentNode.nativeView;
            break;
          }
          currentNode = currentNode.parentNode;
        }
      }

      if (this.nodeName === "WINDOW") {
        window = this.nativeView;
      }

      if (window) {
        const frame = window.frame;
        const contentRect = window.contentLayoutRect;
        topSafeAreaPadding = frame.size.height - contentRect.size.height;
      }

      Layout.Setters.paddingTop(this.yogaNode, topSafeAreaPadding);
    } else {
      Layout.Setters.paddingTop(
        this.yogaNode,
        parseInt(this.getAttribute("paddingTop") || "")
      );
    }
  }

  _safeAreaPadding: boolean = false;
  @native({
    setNative(view, _key, value) {
      view._safeAreaPadding = value;
      view.applySafeAreaPaddings();
    },
    shouldLayout: true,
  })
  declare enableSafeAreaPaddings: boolean;

  @overrides("paddingTop")
  setPaddingTop(key: string, value: any, config: NativePropertyConfig) {
    if (this._safeAreaPadding) {
      this.applySafeAreaPaddings();
      return;
    }
    config.setNative?.(this, key, value, config);
  }
}
