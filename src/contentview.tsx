import { Component, createEffect } from "npm:solid-js";
import type { WebView } from "../native/core/views/webview/webview.ts";
import { useColorScheme } from "./hooks/use-color-scheme.ts";

interface SnippetProps {
  component(): JSX.Element;
}
const url = `file://${Deno.cwd()}/snippets/dist/index.html`;

const ContentView: Component<Partial<SnippetProps>> = (props) => {
  let webRef: WebView;

  function updateSnippetPreview(component: any) {
    const colorScheme = useColorScheme();
    const data = {
      type: "jsx",
      snippet: encodeURIComponent(component.code),
      dark: colorScheme === "dark",
    };
    webRef?.executeJavaScript(
      `window.updateSnippet("${component.name}", '${JSON.stringify(data)}')`
    );
  }

  createEffect(() => {
    if ((props.component as any)?.code && webRef) {
      updateSnippetPreview(props.component);
    }
  });

  return (
    <view style={{ width: "100%", height: "100%" }}>
      {(props.component as any)?.code ? (
        <view
          style={{
            width: "100%",
            height: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <webview
            ref={(el: WebView) => (webRef = el)}
            src={url}
            debug={true}
            onLoadStarted={(e) => {
              console.log(e.url);
            }}
            onLoadFinished={(e) => {
              updateSnippetPreview(props.component);
            }}
          />
        </view>
      ) : null}
      <view
        style={{
          width: "100%",
          height: (props.component as any)?.code ? "50%" : "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.component?.()}
      </view>
    </view>
  );
};

export default ContentView;
