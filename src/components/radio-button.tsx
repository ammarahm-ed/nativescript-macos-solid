import { createSignal, For } from "npm:solid-js";

function RadioButton() {
  const [selected, setSelected] = createSignal();
  const options = [
    "Select me if you ❤️ Solid",
    "Select me if you ❤️ NativeScript",
  ];
  return (
    <view
      style={{
        gap: 10,
      }}
    >
      <For each={options}>
        {(option) => (
          <radiobutton
            onClick={(event) => {
              setSelected((event.target as HTMLButtonElement).textContent);
            }}
          >
            {option}
          </radiobutton>
        )}
      </For>
      <text>Selected: {selected}</text>
    </view>
  );
}

RadioButton.code = `function RadioButton() {
  const [selected, setSelected] = createSignal();

  const options = [
    "Select me if you ❤️ Solid",
    "Select me if you ❤️ NativeScript",
  ];
  return (
    <view
      style={{
        gap: 10,
      }}
    >
      <For each={options}>
        {(option) => (
          <radiobutton
            onClick={(event) => {
              setSelected((event.target as HTMLButtonElement).textContent);
            }}
          >
            {option}
          </radiobutton>
        )}
      </For>
      <text>Selected: {selected}</text>
    </view>
  );
}`;

export default RadioButton;
