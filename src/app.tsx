/// <reference lib="dom" />
import { render } from "../solid-native/renderer.js";
import { For, Show, Switch, Match } from "npm:solid-js";
import {
  sidebarItems,
  selectedView,
  changeContent,
  changeToolbar,
  activeCredit,
  selectedComponent,
} from "./state.ts";
import Snippet from "./snippet.tsx";

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
        <content-list
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
          enableSafeAreaPaddings={true}
        >
          <Show when={selectedView() === 0}>
            <view>
              
            </view>
          </Show>
          <Show when={selectedView() === 1}>
            <text>Hello</text>
          </Show>
          <Show when={selectedView() === 2}>
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
