/// <reference lib="dom" />
import { For, Match, Show, Switch } from "npm:solid-js";
import { render } from "../solid-native/renderer.js";
import { Counter } from "./examples/counter.tsx";
import { TodoMVP } from "./examples/todo.tsx";
import Snippet from "./snippet.tsx";
import {
  activeCredit,
  changeContent,
  changeToolbar,
  selectedComponent,
  selectedView,
  sidebarItems,
} from "./state.tsx";
import WebDisplay from "./webdisplay.tsx";

const solidLogo = `file://${Deno.cwd()}/icon/icon-512.png`;

function App() {
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
      <toolbar>
        <toolbar-toggle-sidebar />

        <toolbar-sidebar-tracking-separator />

        <toolbar-flexible-space />

        <toolbar-group
          selectionMode="selectOne"
          titles={["Building", "Examples", "Credits"]}
          label="View"
          paletteLabel="View"
          toolTip="Change the selected view"
          selectedIndex={0}
          onSelected={(event) => changeToolbar(event.selectedIndex)}
        />

        <toolbar-item />

        <toolbar-group
          selectionMode="momentary"
          titles={["Docs", "GitHub", "Discord"]}
          label="Learn More"
          paletteLabel="Learn More"
          toolTip="Continue your learning"
          onSelected={(event) =>
            NSWorkspace.sharedWorkspace.openURL(
              NSURL.URLWithString(
                {
                  0: "https://docs.solidjs.com",
                  1: "https://github.com/solidjs/solid",
                  2: "https://discord.gg/solidjs",
                }[event.selectedIndex]!
              )
            )
          }
        />
      </toolbar>

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
          <scroll-view style={{
            width:'100%',
            height:'100%'
          }}>
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
                        <table-cell selected={child.title === selectedComponent()}  >
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
            <Switch fallback={<Snippet type={selectedComponent()} />}>
              <Match when={selectedComponent() === "getting started"}>
                <view
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <image
                    style={{
                      width: 200,
                      height: 200,
                    }}
                    stretch="aspectFit"
                    src={solidLogo}
                  ></image>
                  <text
                    style={{
                      fontSize: 20,
                      padding: 18,
                    }}
                  >
                    Hello Solid macOS
                  </text>
                  <text
                    style={{
                      fontSize: 18,
                      color: "#999",
                    }}
                  >
                    Let's build something Solid ❤️ together
                  </text>
                  <view
                    style={{
                      backgroundColor: "#efefef",
                      borderRadius: 10,
                      marginTop: 16,
                      padding: 10,
                    }}
                  >
                    <text
                      style={{
                        fontSize: 14,
                        fontStyle: "italic",
                        color: "#999",
                      }}
                    >
                      1. Explore AppKit components to use in your app
                    </text>
                    <text
                      style={{
                        fontSize: 14,
                        marginTop: 4,
                        fontStyle: "italic",
                        color: "#999",
                      }}
                    >
                      2. Explore complete examples by switching views on top
                    </text>
                    <text
                      style={{
                        fontSize: 14,
                        marginTop: 4,
                        fontStyle: "italic",
                        color: "#999",
                      }}
                    >
                      3. Share videos of your app on X, Discord, GitHub,
                      LinkedIn, etc.
                    </text>
                  </view>
                </view>
              </Match>
              <Match when={selectedComponent() === "overview"}>
                <view
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <view
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 16,
                    }}
                  >
                    <image
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      stretch="aspectFit"
                      src={solidLogo}
                    ></image>
                    <text
                      style={{
                        fontSize: 18,
                        marginLeft: 8,
                      }}
                    >
                      Solid macOS Overview
                    </text>
                  </view>
                  <view
                    style={{
                      backgroundColor: "#efefef",
                      borderRadius: 10,
                      marginLeft: 16,
                      marginRight: 16,
                      padding: 10,
                    }}
                  >
                    <text
                      style={{
                        fontSize: 14,
                        color: "#999",
                      }}
                    >
                      Solid macOS is a macOS app built with Solid and
                      NativeScript.
                    </text>
                    <text
                      style={{
                        fontSize: 14,
                        marginTop: 4,
                        color: "#999",
                      }}
                    >
                      It uses native components from Apple's AppKit, used to
                      build the user interface for a macOS app.
                    </text>
                  </view>
                </view>
              </Match>
              <Match when={selectedComponent() === "setup"}>
                <view
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <view
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 16,
                    }}
                  >
                    <image
                      style={{
                        width: 50,
                        height: 50,
                      }}
                      stretch="aspectFit"
                      src={solidLogo}
                    ></image>
                    <text
                      style={{
                        fontSize: 18,
                        marginLeft: 8,
                      }}
                    >
                      Solid macOS Setup
                    </text>
                  </view>
                </view>
              </Match>
              <Match when={selectedComponent() === "components"}>
                <view
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <image
                    style={{
                      width: 200,
                      height: 200,
                    }}
                    stretch="aspectFit"
                    src={solidLogo}
                  ></image>
                  <text
                    style={{
                      fontSize: 20,
                      padding: 18,
                    }}
                  >
                    Solid macOS Components
                  </text>
                  <text
                    style={{
                      fontSize: 16,
                      
                      color: "#999",
                    }}
                  >
                    Try AppKit for yourself
                  </text>
                  <text
                    style={{
                      fontSize: 16,
                      fontStyle: "italic",
                      color: "#999",
                      marginTop: 16,
                    }}
                  >
                    Copy Solid component snippets for your own use
                  </text>
                </view>
              </Match>
            </Switch>
          </Show>
          <Show when={selectedView() === 1}>
            <Switch fallback={<Counter />}>
              <Match when={selectedComponent() === "Counter"}>
                <Counter />
              </Match>

              <Match when={selectedComponent() === "Simple Todos"}>
                <TodoMVP />
              </Match>
            </Switch>
          </Show>
          <Show when={selectedView() === 2}>
            <WebDisplay url={activeCredit()} />
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
