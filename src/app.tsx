/// <reference lib="dom" />
import { render } from "../solid-native/renderer.js";
import { For, Show } from "npm:solid-js";
import {
  sidebarItems,
  selectedView,
  changeContent,
  changeToolbar,
  activeCredit,
  selectedComponent,
  isSnippetActive,
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
              <Show when={selectedComponent() === "getting started"}>
                <webview
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  src="https://docs.solidjs.com/quick-start"
                ></webview>
              </Show>
              <Show when={selectedComponent() === "overview"}>
                <webview
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  src="https://docs.solidjs.com/#overview"
                ></webview>
              </Show>
              <Show when={selectedComponent() === "setup"}>
                <webview
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  src="https://www.solidjs.com/tutorial/introduction_basics"
                ></webview>
              </Show>
              <Show when={isSnippetActive()}>
                <Snippet type={selectedComponent()} />
              </Show>

              {/* does not work yet */}
              {/* <Switch fallback={<Snippet type={selectedComponent()} />}>
                <Match when={selectedComponent() === "getting started"}>
                  <webview
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    src="https://docs.solidjs.com/quick-start"
                  ></webview>
                </Match>
                <Match when={selectedComponent() === "overview"}>
                  <webview
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    src="https://docs.solidjs.com/#overview"
                  ></webview>
                </Match>
                <Match when={selectedComponent() === "setup"}>
                  <webview
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    src="https://www.solidjs.com/tutorial/introduction_basics"
                  ></webview>
                </Match>
              </Switch> */}
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
