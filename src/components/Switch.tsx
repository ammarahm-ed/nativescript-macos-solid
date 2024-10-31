import { createSignal } from "npm:solid-js";

function Switch() {
  const [on, setOn] = createSignal(false);
  return (
    <view
      style={{
        backgroundColor: on() ? "yellow" : undefined,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 10,
        borderRadius: 10,
      }}
    >
      <text
        style={{
          fontSize: 14,
        }}
      >
        Turn on lights
      </text>
      <switch
        onClick={() => {
          setOn(!on());
        }}
      />
    </view>
  );
}

Switch.snippetName = "Switch";

Switch.code = `function Switch() {
  const [on, setOn] = createSignal(false);
  return (
    <view
      style={{
        backgroundColor: on() ? "yellow" : undefined,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 10,
        borderRadius: 10,
      }}
    >
      <text style={{
        fontSize: 14
      }}>Turn on lights</text>
      <switch onClick={() => {
        setOn(!on());
      }} />
    </view>
  );
}`;

export default Switch;
