/// <reference lib="dom" />
import { For } from "npm:solid-js";
import { render } from "../solid-native/renderer.js";
import {
  setSelectedView,
  setSidebarItems,
  sidebarItems,
  sidebarItemsData,
} from "./state.ts";

function App() {
  return (
    <window
      title="Solid macOS"
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
      onToolbarSelected={(event) => {
        try {
          console.log("onToolbarSelected", event.selectedIndex);
          setSelectedView(event.selectedIndex);
          setSidebarItems(sidebarItemsData[event.selectedIndex]);
        } catch (err) {
          console.error(err);
        }
      }}
    >
      <split-view
        style={{
          flexDirection: "row",
        }}
        vertical={true}
      >
        <side-bar
          style={{
            maxWidth: 250,
            minWidth: 200,
          }}
        >
          <scroll-view>
            <outline>
              <For each={sidebarItems()}>
                {(item, _index) => (
                  <table-cell>
                    <image symbol={item.icon}></image>
                    <text>{item.title}</text>

                    <For each={item.children}>
                      {(child, _index) => (
                        <table-cell>
                          <image symbol={child.icon}></image>
                          <text>{child.title}</text>
                        </table-cell>
                      )}
                    </For>
                  </table-cell>
                )}
              </For>
            </outline>
          </scroll-view>
        </side-bar>
        <content-list style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <view
            style={{
              width: 100,
              height: 100,
              backgroundColor: "gray",
            }}
          >
            <slider
              numberOfTickMarks={10}
              allowsTickMarkValuesOnly={true}
              onSliderChanged={(event) => {
                console.log(event.value);
              }}
            ></slider>
          </view>
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
