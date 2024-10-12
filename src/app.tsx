/// <reference lib="dom" />
import { render } from "../solid-native/renderer.js";

function App() {
  return (
    <window
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
        NSWindowStyleMask.Resizable
      }
      transparentTitleBar={false}
      title="Nativescript"
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
            minWidth: 150,
          }}
        >
          <view
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "aliceblue",
            }}
          >
            <text>Home</text>
          </view>
        </side-bar>
        <content-list>
          <view
            style={{
              width: 100,
              height: 100,
              backgroundColor: "aliceblue",
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
