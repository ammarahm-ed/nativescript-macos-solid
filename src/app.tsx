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
      title="Solid macOS"
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
              <table-cell>
                <image symbol="house"></image>
                <text>Getting Started</text>

                <table-cell>
                  <image symbol="lightbulb.max"></image>
                  <text>Overview</text>
                </table-cell>
                <table-cell>
                  <image symbol="gear.badge.checkmark"></image>
                  <text>Setup</text>
                </table-cell>
              </table-cell>

              <table-cell>
                <image symbol="list.star"></image>
                <text>Components</text>

                <table-cell>
                  <image symbol="photo"></image>
                  <text>Image</text>
                </table-cell>
                <table-cell>
                  <image symbol="slider.horizontal.3"></image>
                  <text>Slider</text>
                </table-cell>
                <table-cell>
                  <image symbol="textformat"></image>
                  <text>Text</text>
                </table-cell>
              </table-cell>
            </outline>
          </scroll-view>
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
