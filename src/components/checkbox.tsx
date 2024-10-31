import { createSignal } from "npm:solid-js";

function Checkbox() {
  const [checked, setChecked] = createSignal(false);
  return (
    <checkbox
      onClick={() => {
        setChecked(!checked());
      }}
      checked={checked()}
    >
      Check me if you ❤️ Solid
    </checkbox>
  );
}

Checkbox.snippetName = "Checkbox";

Checkbox.code = `function Checkbox() {
  const [checked, setChecked] = createSignal(false);
  return (
    <checkbox
      onClick={() => {
        setChecked(!checked());
      }}
      checked={checked()}
    >
      Check me if you ❤️ Solid
    </checkbox>
  );
}`;

export default Checkbox;
