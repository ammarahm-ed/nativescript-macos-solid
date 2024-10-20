import type { Component } from "npm:solid-js";

interface WebDisplayProps {
  url: string;
}

const WebDisplay: Component<WebDisplayProps> = (props) => {
  return (
    <webview
      src={props.url}
      style={{ width: "100%", height: "100%" }}
    ></webview>
  );
};

export default WebDisplay;
