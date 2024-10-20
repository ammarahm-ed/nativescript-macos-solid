import { Component, Show } from "npm:solid-js";
import { createSignal } from "npm:solid-js";
import type { WebView } from '../native/core/views/webview/webview.ts';

const comboItems = [
  "Ryan Carniato",
  "David Di Biase",
  "Alexandre Mouton Brady",
  "Milo M.",
  "Ryan Turnquist",
  "Nikhil Saraf",
];

interface SnippetProps {
  type: string | undefined;
}

const Snippet: Component<SnippetProps> = (props) => {
  const url = `file://${Deno.cwd()}/snippets/dist/index.html`;
  let webRef: WebView;

  return (
    <view style={{ width: "100%", height: "100%" }}>
      <view
        style={{
          width: "100%",
          height: "50%",
        }}
      >
        <webview
            ref={(el: WebView) => webRef = el}
          style={{
            width: "100%",
            height: "100%",
          }}
          src={url}
          onLoadStarted={(e) => {
            console.log(e.url);
          }}
          onLoadFinished={(e) => {
            console.log(e.url);
            webRef.executeJavaScript(`document.body.style.backgroundColor = "yellow";`);
          }}
        ></webview>
      </view>
      <view
        style={{
          width: "100%",
          height: "50%",
          paddingTop: 52,
          backgroundColor: "gray",
        }}
      >
        <Show when={props.type === "button"}>
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
        <Show when={props.type === "checkbox"}>
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
        <Show when={props.type === "combobox"}>
          <combobox
            items={comboItems}
            selectedIndex={0}
            style={{
              width: 200,
              height: 100,
            }}
            onChange={(event) => {
              console.log("ComboBox change", comboItems[event.index]);
            }}
          ></combobox>
        </Show>
        <Show when={props.type === "image"}>
          <image
            style={{
              width: "100%",
              height: "100%",
            }}
            stretch="aspectFit"
            src="https://www.solidjs.com/img/logo/without-wordmark/logo.jpg"
          ></image>
        </Show>
        <Show when={props.type === "slider"}>
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
        <Show when={props.type === "text"}>
          <text
            style={{
              padding: 50,
            }}
          >
            Hello macOS, ❤️ Solid
          </text>
        </Show>
        <Show when={props.type === "webview"}>
          <webview
            style={{
              width: "100%",
              height: "100%",
            }}
            src="https://solidjs.com"
            onLoadStarted={(e) => {
              console.log(e.url);
            }}
            onLoadFinished={(e) => {
              console.log(e.url);
            }}
          ></webview>
        </Show>
      </view>
    </view>
  );
};

export default Snippet;
