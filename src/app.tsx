/// <reference lib="dom" />
import { render } from "../solid-native/renderer.js";

function App() {
  return (
    <window
      style={{
        width: 800,
        height: 600,
        justifyContent:'center',
        alignItems: 'center'
      }}
      styleMask={
        NSWindowStyleMask.Titled |
        NSWindowStyleMask.Closable |
        NSWindowStyleMask.Miniaturizable |
        NSWindowStyleMask.Resizable |
        NSWindowStyleMask.FullSizeContentView
      }
      transparentTitleBar={false}
      title="Nativescript"
    >
      <view
        style={{
          width: 100,
          height: 100,
          backgroundColor: "aliceblue",
        }}
      />
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
