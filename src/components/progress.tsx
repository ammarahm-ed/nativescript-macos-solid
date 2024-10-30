import { createSignal } from "npm:solid-js";

function Progress() {
  const [progress, setProgress] = createSignal(0);

  setInterval(() => {
    setProgress((progress) => Math.min(progress + 1, 101));
  }, 150);

  return (
    <view
      style={{
        gap: 10,
      }}
    >
      <progress
        style={{
          width: 200,
          height: 20,
        }}
        indeterminate={true}
      />

      <progress
        style={{
          width: 200,
          height: 20,
        }}
        progress={progress()}
      />

      <progress
        style={{
          width: 200,
          height: 20,
        }}
        type="spinner"
        progress={progress()}
      />
    </view>
  );
}

Progress.code = `function Progress() {
  return (
    <progress
      style={{
        width: 200,
        height: 20,
      }}
      indeterminate={true}
    />
  );
}`;

export default Progress;
