import "@nativescript/macos-node-api";

@NativeClass
export class SplitViewController extends NSSplitViewController
  implements NSSplitViewDelegate {
  static ObjCProtocols = [
    NSSplitViewDelegate,
    NSViewControllerPresentationAnimator,
  ];

  _owner?: WeakRef<HTMLViewBaseElement>;

  override viewDidLayout(): void {
    super.viewDidLayout();
    this?.resizeSubViews();
  }

  animatePresentationOfViewControllerFromViewController(
    viewController: NSViewController,
    fromViewController: NSViewController,
  ): void {
    fromViewController.view.addSubview(viewController.view);
    viewController.view.alphaValue = 1.0;
    viewController.view.frame = fromViewController.view.frame;
    viewController.view.autoresizesSubviews = true;
    this.resizeSubViews();
  }

  animateDismissalOfViewControllerFromViewController(
    viewController: NSViewController,
    _fromViewController: NSViewController,
  ): void {
    // Animate to the final state
    viewController.view.animator().alphaValue = 0.0;
    viewController.view.removeFromSuperview();
  }

  override splitViewDidResizeSubviews(_notification: NSNotification): void {
    this?.resizeSubViews();
  }

  resizeSubViews() {
    const owner = this._owner?.deref();
    let child = owner?.firstChild as any;
    while (child) {
      child.adjustSize();
      child = child.nextSibling as any;
    }
  }
}
