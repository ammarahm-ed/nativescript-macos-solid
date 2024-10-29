import "@nativescript/macos-node-api";
import { Application, RunLoop } from "@nativescript/foundation";

@NativeClass
export class AppDelegate extends NSObject implements NSApplicationDelegate {
  running = true;
  isActive = true;
  static windowTitle: string;
  static ObjCProtocols = [NSApplicationDelegate];
  static ObjCExposedMethods = {
    openDocs: { returns: interop.types.void, params: [interop.types.id] },
    openGithub: { returns: interop.types.void, params: [interop.types.id] },
    openDiscord: { returns: interop.types.void, params: [interop.types.id] },
    themeChanged: { returns: interop.types.void, params: [interop.types.id] },
  };

  applicationDidFinishLaunching(_notification: NSNotification) {
    NSApp.activateIgnoringOtherApps(false);
    NSApp.stop(this);
    // Allow users to customize the app's Touch Bar items
    NSApplication.sharedApplication.isAutomaticCustomizeTouchBarMenuItemEnabled =
      true;
    NSDistributedNotificationCenter.defaultCenter.addObserverSelectorNameObject(
      this,
      "themeChanged",
      "AppleInterfaceThemeChangedNotification",
      null
    );
    // event loop
    RunLoop();
  }

  applicationWillTerminate(_notification: NSNotification): void {
    this.running = false;
  }

  openDocs(_id: this) {
    NSWorkspace.sharedWorkspace.openURL(
      NSURL.URLWithString("https://solidjs.com")
    );
  }

  openGithub(_id: this) {
    NSWorkspace.sharedWorkspace.openURL(
      NSURL.URLWithString("https://github.com/solidjs/solid")
    );
  }

  openDiscord(_id: this) {
    NSWorkspace.sharedWorkspace.openURL(
      NSURL.URLWithString("https://discord.com/invite/solidjs")
    );
  }

  themeChanged(_id: this) {
    console.log(
      "themeChanged",
      NSApp.effectiveAppearance.name === "NSAppearanceNameDarkAqua"
        ? "dark"
        : "light"
    );
  }
}

// Application.createMenu = () => {
//   const menu = NSMenu.new();
//   menu.delegate = Application.delegate;
//   NSApp.mainMenu = menu;
//   const appMenuItem = NSMenuItem.alloc().initWithTitleActionKeyEquivalent(
//     "Solid macOS",
//     "",
//     ""
//   );
//   menu.addItem(appMenuItem);
//   const submenu = NSMenu.new();
//   appMenuItem.submenu = submenu;
//   submenu.addItem(
//     NSMenuItem.alloc().initWithTitleActionKeyEquivalent(
//       "Quit",
//       "terminate:",
//       "q"
//     )
//   );

//   const helpMenu = NSMenu.new();
//   helpMenu.delegate = Application.delegate;
//   NSApp.helpMenu = helpMenu;
//   const helpMenuItem = NSMenuItem.alloc().initWithTitleActionKeyEquivalent(
//     "Help",
//     "",
//     ""
//   );
//   menu.addItem(helpMenuItem);

//   const helpSubmenu = NSMenu.new();
//   helpMenuItem.submenu = helpSubmenu;
//   helpSubmenu.addItem(
//     NSMenuItem.alloc().initWithTitleActionKeyEquivalent(
//       "Open Docs",
//       "openDocs",
//       "i"
//     )
//   );
//   helpSubmenu.addItem(
//     NSMenuItem.alloc().initWithTitleActionKeyEquivalent(
//       "Open Github",
//       "openGithub",
//       "g"
//     )
//   );
//   helpSubmenu.addItem(
//     NSMenuItem.alloc().initWithTitleActionKeyEquivalent(
//       "Discord",
//       "openDiscord",
//       "d"
//     )
//   );
// };
