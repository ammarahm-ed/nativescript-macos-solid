import { createSignal, Show } from "npm:solid-js";

function SaveFile() {
  const [saveFilePath, setSaveFilePath] = createSignal();
  return (
    <view
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <filesavebutton
        options={{
          filename: "sample.txt",
          fileTypes: ["txt"],
          createDirectories: true,
        }}
        onFileSave={(event) => {
          setSaveFilePath(event.path);
        }}
      >
        Save File
      </filesavebutton>

      <Show when={saveFilePath()}>
        <text>{saveFilePath()}</text>
      </Show>
    </view>
  );
}

SaveFile.code = `function SaveFile() {
  const [saveFilePath, setSaveFilePath] = createSignal();
  return (
    <view
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <filesavebutton
        options={{
          filename: "sample.txt",
          fileTypes: ["txt"],
          createDirectories: true,
        }}
        onFileSave={(event) => {
          setSaveFilePath(event.path);
        }}
      >
        Save File
      </filesavebutton>

      <Show when={saveFilePath()}>
        <text>{saveFilePath()}</text>
      </Show>
    </view>
  );
}`;

export default SaveFile;
