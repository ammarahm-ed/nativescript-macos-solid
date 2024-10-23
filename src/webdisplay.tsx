import { type Component, createSignal, Show } from "npm:solid-js";

interface WebDisplayProps {
  url: string;
}

const WebDisplay: Component<WebDisplayProps> = (props) => {
  const [isLoading, setIsLoading] = createSignal<boolean>(false);
  return (
    <view style={{ width: "100%", height: "100%" }}>
      <Show when={isLoading()}>
        <progress
          style={{
            width: "100%",
            height: 20,
          }}
          indeterminate={true}
        />
      </Show>
      <webview
        src={props.url}
        style={{ width: "100%", height: "100%" }}
        onLoadStarted={() => {
          setIsLoading(true);
        }}
        onLoadFinished={() => {
          setIsLoading(false);
        }}
      >
      </webview>
    </view>
  );
};

export default WebDisplay;
