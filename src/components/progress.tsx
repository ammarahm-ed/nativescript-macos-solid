import { createSignal } from "npm:solid-js";

interface ProgressContext {
  interval?: number;
}

function Progress(this: ProgressContext) {
  const [progress, setProgress] = createSignal(0);

  if (this.interval) {
    clearInterval(this.interval);
  }

  this.interval = setInterval(() => {
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

Progress.snippetName = "Progress";

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
