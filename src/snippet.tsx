import { Component } from "npm:solid-js";
import type { WebView } from "../native/core/views/webview/webview.ts";
import { currentSnippet, setCurrentSnippet } from "./state.tsx";
import { createEffect } from "npm:solid-js";

interface SnippetProps {
  type: string | undefined;
}
const url = `file://${Deno.cwd()}/snippets/dist/index.html`;
let webRef: WebView;

function updateSnippetJSX(type: string | undefined) {
  switch (type) {
    case "button":
      setCurrentSnippet(
        <button
          style={{
            backgroundColor: "blue",
            color: "white",
          }}
          onClick={(_event) => {
            console.log("Button clicked");
          }}
        >
          Tap Me
        </button>
      );
      break;
    case "checkbox":
      setCurrentSnippet(
        <checkbox
          style={{
            color: "white",
          }}
          onClick={(event) => {
            console.log("Checkbox clicked", event.state);
          }}
        >
          Check me if you ❤️ Solid
        </checkbox>
      );
      break;
    case "combobox":
      setCurrentSnippet(
        <combobox
          items={comboItems}
          selectedIndex={0}
          onChange={(event) => {
            console.log("ComboBox change", comboItems[event.index]);
          }}
        ></combobox>
      );
      break;
    case "image":
      setCurrentSnippet(
        <image
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
          }}
          stretch="aspectFit"
          src="https://www.solidjs.com/img/logo/without-wordmark/logo.jpg"
        ></image>
      );
      break;
    case "progress":
      setCurrentSnippet(
        <progress
          style={{
            width: "100%",
            height: 20,
          }}
          indeterminate={true}
        />
      );
      break;
    case "slider":
      setCurrentSnippet(
        <slider
          numberOfTickMarks={10}
          allowsTickMarkValuesOnly={true}
          onSliderChanged={(event) => {
            console.log(event.value);
          }}
        ></slider>
      );
      break;
    case "text":
      setCurrentSnippet(
        <text
          style={{
            padding: 50,
          }}
        >
          Hello macOS, ❤️ Solid
        </text>
      );
      break;
    case "webview":
      setCurrentSnippet(
        <webview
          src="https://solidjs.com"
          onLoadStarted={(e) => {
            console.log(e.url);
          }}
          onLoadFinished={(e) => {
            console.log(e.url);
          }}
        ></webview>
      );
      break;
  }
  console.log("updating snippet:", type);
  updateSnippetPreview(type);
}

function updateSnippetPreview(type: string | undefined) {
  webRef?.executeJavaScript(
    `window.updateSnippet('${type}', '${
      (currentSnippet() as HTMLElement)?.outerHTML
    }')`
  );
}

const comboItems = [
  "Ryan Carniato",
  "David Di Biase",
  "Alexandre Mouton Brady",
  "Milo M.",
  "Ryan Turnquist",
  "Nikhil Saraf",
];

const Snippet: Component<SnippetProps> = (props) => {
  createEffect(() => {
    updateSnippetJSX(props.type);
  });
  return (
    <view style={{ width: "100%", height: "100%" }}>
      <view
        style={{
          width: "100%",
          height: "50%",
        }}
      >
        <webview
          ref={(el: WebView) => (webRef = el)}
          src={url}
          onLoadStarted={(e) => {
            console.log(e.url);
          }}
          onLoadFinished={(e) => {
            console.log(e.url);
            updateSnippetPreview(props.type);
          }}
        ></webview>
      </view>
      <view
        style={{
          width: "100%",
          height: "50%",
          backgroundColor: "gray",
        }}
      >
        {currentSnippet()}
      </view>
    </view>
  );
};

export default Snippet;
