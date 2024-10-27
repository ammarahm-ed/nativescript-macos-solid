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
                <WebDisplay url="https://docs.solidjs.com/quick-start" />
              </Match>
              <Match when={selectedComponent() === "overview"}>
                <WebDisplay url="https://docs.solidjs.com/#overview" />
              </Match>
              <Match when={selectedComponent() === "setup"}>
                <WebDisplay url="https://www.solidjs.com/tutorial/introduction_basics" />
              </Match>
              <Match when={selectedComponent() === "components"}>
                <WebDisplay url="https://nativescript.org" />
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
