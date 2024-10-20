import type { Component } from "npm:solid-js";

interface WebDisplayProps {
  url: string;
}

const WebDisplay: Component<WebDisplayProps> = (props) => {
  return (
    <view style={{ width: "100%", height: "100%" }}>
      <webview src={props.url}></webview>
    </view>
  );
};

export default WebDisplay;
