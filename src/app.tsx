/// <reference lib="dom" />
import { createSignal } from "npm:solid-js";
import { render } from "../solid-native/renderer.js";
import AppMenus from "./app-menus.tsx";
import ContentView from "./contentview.tsx";
import Sidebar, { type SidebarItem } from "./sidebar.tsx";
import { selectedView } from "./state.tsx";
import Toolbar from "./toolbar.tsx";

function App() {
  const [currentSidebarItem, setCurrentSidebarItem] =
    createSignal<SidebarItem>();
  return (
    <window
      title="Solid macOS"
      subtitle="Develop macOS with Solid"
      style={{
        width: 800,
        height: 600,
        justifyContent: "center",
        alignItems: "center",
      }}
      styleMask={
        NSWindowStyleMask.Titled |
        NSWindowStyleMask.Closable |
        NSWindowStyleMask.Miniaturizable |
        NSWindowStyleMask.Resizable |
        NSWindowStyleMask.FullSizeContentView
      }
      transparentTitleBar={false}
    >
      <AppMenus />
      <Toolbar />

      <split-view
        style={{
          flexDirection: "row",
        }}
        vertical={true}
      >
        <Sidebar
          selectedView={selectedView()}
          onSelectedItemChange={(item) => {
            setCurrentSidebarItem(item);
          }}
          selectedItem={currentSidebarItem()}
        />

        <content-list
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
          enableSafeAreaPaddings={true}
        >
          <ContentView component={currentSidebarItem()?.component} />
        </content-list>
      </split-view>
    </window>
  );
}

/**
 * A function export is required here to launch the app
 * in the correct context of the native app. This is because the
 * solid app needs to be pre-built seperately using esbuild.
 * See ./scripts/bundle.solid.ts for more information.
 */
export function startApp() {
  render(() => <App />, document.body);
}
