import { createSignal } from "npm:solid-js";

function Button() {
  const [taps, setTaps] = createSignal(0);
  return (
    <button
      onClick={() => {
        setTaps(taps() + 1);
      }}
      tooltip="Click me to increment the counter"
    >
      Taps: {taps()}
    </button>
  );
}

Button.code = `function Button() {
  const [taps, setTaps] = createSignal(0);
  return (
    <button
      onClick={() => {
        setTaps(taps() + 1);
      }}
    >
      Taps: {taps()}
    </button>
  );
}`;

export default Button;
