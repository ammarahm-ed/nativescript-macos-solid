import { createSignal } from "npm:solid-js";

function Slider() {
  const [value, setValue] = createSignal(0);
  const [type, setType] = createSignal<"linear" | "circular">("linear");
  return (
    <view
      style={{
        gap: 10,
      }}
    >
      <view
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          maxWidth: 200,
        }}
      >
        <slider
          numberOfTickMarks={100}
          allowsTickMarkValuesOnly={true}
          onSliderChanged={(event) => {
            setValue(event.value || 0);
          }}
          minValue={0.2}
          value={0.5}
          type={type()}
        />
        <text>{(value() * 100).toFixed(0)}</text>
      </view>
      <button
        title="Change slider type"
        onClick={() => {
          setType(type() === "linear" ? "circular" : "linear");
        }}
      />
    </view>
  );
}

Slider.snippetName = "Slider";

Slider.code = `function Slider() {
  const [value, setValue] = createSignal(0);
  const [type, setType] = createSignal<"linear" | "circular">("linear");
  return (
    <view
      style={{
        gap: 10,
      }}
    >
      <view
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          maxWidth: 200
        }}
      >
        <slider
          numberOfTickMarks={100}
          allowsTickMarkValuesOnly={true}
          onSliderChanged={(event) => {
            setValue(event.value || 0);
          }}
          minValue={0.2}
          value={0.5}
          type={type()}
        />
        <text>{(value() * 100).toFixed(0)}</text>
      </view>
      <button
        title="Change slider type"
        onClick={() => {
          setType(type() === "linear" ? "circular" : "linear");
        }}
      />
    </view>
  );
}`;

export default Slider;
