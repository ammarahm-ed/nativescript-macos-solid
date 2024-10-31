import { createSignal, Show } from "npm:solid-js";

function FileDialog() {
  const [chosenFiles, setChosenFiles] = createSignal();
  return (
    <view
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <fileopenbutton
        options={{
          chooseFiles: true,
          chooseDirectories: false,
          multiple: true,
          fileTypes: [
            "txt",
            "md",
            "pdf",
            "png",
            "jpg",
            "jpeg",
            "doc",
            "docx",
            "xls",
            "xlsx",
            "ppt",
            "pptx",
            "zip",
            "ts",
            "tsx",
            "js",
            "jsx",
          ],
        }}
        onFileChosen={(event) => {
          setChosenFiles(event.paths?.join("\n"));
        }}
      >
        Open File Dialog...
      </fileopenbutton>
      <Show when={chosenFiles()}>
        <text>{chosenFiles()}</text>
      </Show>
    </view>
  );
}

FileDialog.snippetName = "FileDialog";

FileDialog.code = `function FileDialog() {
  const [chosenFiles, setChosenFiles] = createSignal();
  return (
    <view
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <fileopenbutton
        options={{
          chooseFiles: true,
          chooseDirectories: false,
          multiple: true,
          fileTypes: [
            "txt",
            "md",
            "pdf",
            "png",
            "jpg",
            "jpeg",
            "doc",
            "docx",
            "xls",
            "xlsx",
            "ppt",
            "pptx",
            "zip",
            "ts",
            "tsx",
            "js",
            "jsx",
          ],
        }}
        onFileChosen={(event) => {
          setChosenFiles(event.paths?.join("\n"));
        }}
      >
        Open File Dialog...
      </fileopenbutton>
      <Show when={chosenFiles()}>
        <text>{chosenFiles()}</text>
      </Show>
    </view>
  );
}`;

export default FileDialog;
