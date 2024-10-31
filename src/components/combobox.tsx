import { createSignal } from "npm:solid-js";

const comboItems = [
  "Ryan Carniato",
  "David Di Biase",
  "Alexandre Mouton Brady",
  "Milo M.",
  "Ryan Turnquist",
  "Nikhil Saraf",
];

function Combobox() {
  const [selected, setSelected] = createSignal(0);
  return (
    <view
      style={{
        flexDirection: "row",
        gap: 10,
      }}
    >
      <combobox
        items={comboItems}
        selectedIndex={0}
        onChange={(event) => {
          setSelected(event.index);
        }}
      />
      <text>Selected: {comboItems[selected()]}</text>
    </view>
  );
}

Combobox.snippetName = "Combobox";

Combobox.code = `function Combobox() {
  const [selected, setSelected] = createSignal(0);
  return (
    <view
      style={{
        flexDirection: "row",
        gap: 10,
      }}
    >
      <combobox
        items={comboItems}
        selectedIndex={0}
        onChange={(event) => {
          setSelected(event.index);
        }}
      />
      <text>Selected: {comboItems[selected()]}</text>
    </view>
  );
}`;

export default Combobox;
