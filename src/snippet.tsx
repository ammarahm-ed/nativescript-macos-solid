import { Component, Show } from "npm:solid-js";

const comboItems = [
  "Ryan Carniato",
  "David Di Biase",
  "Alexandre Mouton Brady",
  "Milo M.",
  "Ryan Turnquist",
  "Nikhil Saraf",
];

interface GreetingProps {
  type: string | undefined;
}

const Greeting: Component<GreetingProps> = (props) => {
    const url = `file://${Deno.cwd()}/snippets/dist/index.html`;
  return (
    <view style={{ width: "100%", height: "100%" }}>
      <view
        style={{
          width: "100%",
          height: "50%",
        }}
      >
        <webview
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

export default Greeting;
