/// <reference lib="dom" />
import { render } from "../solid-native/renderer.js";
import { For, Show } from "npm:solid-js";
import {
  setSelectedView,
  sidebarItems,
  setSidebarItems,
  sidebarItemsData,
  selectedView,
  changeContent,
  changeToolbar,
  activeCredit,
  selectedComponent,
} from "./state.ts";

const comboItems = ["Angular", "React", "Solid", "Svelte", "Vue"];

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
          changeToolbar(event.selectedIndex);
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
            <outline
              onClick={(event) => {
                changeContent(event.index);
              }}
            >
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

        {/* Requires flag above, but does not work with Show component
        <content-list style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}> */}
        <content-list>
          <Show when={selectedView() === 0}>
            <view
              style={{
                width: "100%",
                height: "100%",
                paddingTop: 52,
                backgroundColor: "gray",
              }}
            >
              <Show when={selectedComponent() === "button"}>
                <button
                  style={{
                    width: 200,
                    height: 100,
                    backgroundColor: "blue",
                    color: "white",
                  }}
                  onClick={(_event) => {
                    console.log("Button clicked");
                  }}
                >
                  Tap Me
                </button>
              </Show>
              <Show when={selectedComponent() === "checkbox"}>
                <checkbox
                  style={{
                    width: 200,
                    height: 100,
                    backgroundColor: "blue",
                    color: "white",
                  }}
                  onClick={(event) => {
                    console.log("Checkbox clicked", event.state);
                  }}
                >
                  Check me if you ❤️ Solid
                </checkbox>
              </Show>
              <Show when={selectedComponent() === "combobox"}>
                <combobox
                  items={comboItems}
                  selectedIndex={2}
                  style={{
                    width: 200,
                    height: 100,
                  }}
                  onChange={(event) => {
                    console.log("ComboBox change", comboItems[event.index]);
                  }}
                ></combobox>
              </Show>
              <Show when={selectedComponent() === "image"}>
                <image
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  stretch="aspectFit"
                  src="https://www.solidjs.com/img/logo/without-wordmark/logo.jpg"
                ></image>
              </Show>
              <Show when={selectedComponent() === "slider"}>
                <slider
                  style={{
                    width: 200,
                    height: 100,
                  }}
                  numberOfTickMarks={10}
                  allowsTickMarkValuesOnly={true}
                  onSliderChanged={(event) => {
                    console.log(event.value);
                  }}
                ></slider>
              </Show>
              <Show when={selectedComponent() === "text"}>
                <text
                  style={{
                    padding: 50,
                  }}
                >
                  Hello macOS, ❤️ Solid
                </text>
              </Show>
            </view>
          </Show>
          <Show when={selectedView() === 1}>
            <view
              style={{
                width: "100%",
                height: "100%",
                paddingTop: 52,
                backgroundColor: "gray",
              }}
            >
              <text>Hello</text>
            </view>
          </Show>
          <Show when={selectedView() === 2}>
            <view
              style={{
                width: "100%",
                height: "100%",
                paddingTop: 52,
                backgroundColor: "gray",
              }}
            >
              <webview
                style={{
                  width: "100%",
                  height: "100%",
                }}
                src={activeCredit()}
                onLoadStarted={(e) => {
                  console.log(e.url);
                }}
                onLoadFinished={(e) => {
                  console.log(e.url);
                }}
              ></webview>
            </view>
          </Show>
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
