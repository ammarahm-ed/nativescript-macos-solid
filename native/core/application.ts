import "npm:@nativescript/macos-node-api@~0.1.1";
import type { NativeWindow } from "./views/window/native-window.ts";
import type { Window } from "./views/window/window.ts";
objc.import("AppKit");

@NativeClass
class AppDelegate extends NSObject implements NSApplicationDelegate {
  window?: NativeWindow
  running = true;
  isActive = true;
  static windowTitle: string;
  static ObjCProtocols = [NSApplicationDelegate];
  static ObjCExposedMethods = {
    openDiscord: { returns: interop.types.void, params: [interop.types.id] },
  };

  static {
    NativeClass(this);
  }

  applicationDidFinishLaunching(_notification: NSNotification) {
    NSApp.activateIgnoringOtherApps(false);
    NSApp.stop(this);
    // Allow users to customize the app's Touch Bar items
    NSApplication.sharedApplication.isAutomaticCustomizeTouchBarMenuItemEnabled = true;
    RunLoop();
  }

  applicationWillTerminate(_notification: NSNotification): void {
    this.running = false;
  }

  openDiscord(_id: this) {
    NSWorkspace.sharedWorkspace.openURL(NSURL.URLWithString('https://discord.com/invite/solidjs'));
  }
}

function RunLoop() {
  let delay = 2;
  let lastEventTime = 0;
  const loop = () => {
    const event = NSApp.nextEventMatchingMaskUntilDateInModeDequeue(
      NSEventMask.Any,
      null,
      "kCFRunLoopDefaultMode",
      true
    );

    const timeSinceLastEvent = Date.now() - lastEventTime;
    if (event != null) {
      NSApp.sendEvent(event);
      delay = timeSinceLastEvent < 32 ? 2 : 8;
      lastEventTime = Date.now();
    } else {
      delay =
        timeSinceLastEvent > 6000
          ? 128
          : timeSinceLastEvent > 4000
          ? 64
          : timeSinceLastEvent > 2000
          ? 16
          : 8;
    }

    if (NativeScriptApplication.delegate.running) {
      setTimeout(loop, NativeScriptApplication.ensure60FPS ? 8 : delay);
    }
  };
  setTimeout(loop, 0);
}

export default class Application {
  static delegate: AppDelegate;
  static application: NSApplication;
  static rootView: HTMLViewElement;
  static window: Window;
  static appMenu: NSMenu;
  static ensure60FPS: boolean;

  static launch() {

    if (!(document.body instanceof HTMLElement)) {
      throw new Error("document.body instance of NSView");
    }
    Application.rootView = document.body as unknown as HTMLViewElement;

    Application.rootView?.connectedCallback();

    if (NativeScriptApplication.window) {
      NativeScriptApplication.window.open();
    } else {
      throw new Error("Window is not initialized");
    }

    Application.application = NSApplication.sharedApplication;
    Application.delegate = AppDelegate.new();
    Application.delegate.window = NativeScriptApplication.window.nativeView;
    Application.createMenu();
    NSApp.delegate = Application.delegate;
    NSApp.setActivationPolicy(NSApplicationActivationPolicy.Regular);
    NSApp.run();
  }

  static createMenu() {
    const menu = NSMenu.new();
    menu.delegate = Application.delegate;
    NSApp.mainMenu = menu;
    const appMenuItem = NSMenuItem.alloc().initWithTitleActionKeyEquivalent('Solid macOS', '', '');
    menu.addItem(appMenuItem);
    const submenu = NSMenu.new();
    appMenuItem.submenu = submenu;
    submenu.addItem(NSMenuItem.alloc().initWithTitleActionKeyEquivalent('Quit', 'terminate:', 'q'))

    const helpMenu = NSMenu.new();
    helpMenu.delegate = Application.delegate;
    NSApp.helpMenu = helpMenu;
    const helpMenuItem = NSMenuItem.alloc().initWithTitleActionKeyEquivalent('Help', '', '');
    menu.addItem(helpMenuItem);
    const helpSubmenu = NSMenu.new();
    helpMenuItem.submenu = helpSubmenu;
    helpSubmenu.addItem(NSMenuItem.alloc().initWithTitleActionKeyEquivalent('Discord', 'openDiscord', 'd'))

  }
}

declare global {
  var NativeScriptApplication: typeof Application;
}
globalThis.NativeScriptApplication = Application;
