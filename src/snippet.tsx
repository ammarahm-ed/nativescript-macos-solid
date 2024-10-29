import { Component, createEffect, Show } from "npm:solid-js";
import type { ButtonClickEvent } from "../native/core/views/button/native-button.ts";
import type { WebView } from "../native/core/views/webview/webview.ts";
import { useColorScheme } from "./hooks/use-color-scheme.ts";
import {
  chosenColor,
  chosenFiles,
  currentSnippet,
  saveFilePath,
  setChosenColor,
  setChosenFiles,
  setCurrentSnippet,
  setSaveFilePath,
} from "./state.tsx";

interface SnippetProps {
  type: string | undefined;
}
const url = `file://${Deno.cwd()}/snippets/dist/index.html`;
let webRef: WebView;

function updateSnippetJSX(type: string | undefined) {
  if (!type) return;
  switch (type) {
    case "button":
      setCurrentSnippet(
        <button
          onClick={(_event) => {
            console.log("Button clicked");
          }}
        >
          Tap Me
        </button>
      );
      break;
    case "checkbox":
      setCurrentSnippet(
        <checkbox
          onClick={(event) => {
            console.log("Checkbox clicked", event.state);
          }}
        >
          Check me if you ❤️ Solid
        </checkbox>
      );
      break;
    case "combobox":
      setCurrentSnippet(
        <combobox
          items={comboItems}
          selectedIndex={0}
          onChange={(event) => {
            console.log("ComboBox change", comboItems[event.index]);
          }}
        ></combobox>
      );
      break;
    case "image":
      setCurrentSnippet(
        <image
          style={{
            width: 100,
            height: 100,
            borderRadius: 10,
          }}
          stretch="aspectFit"
          src="https://www.solidjs.com/img/logo/without-wordmark/logo.jpg"
        ></image>
      );
      break;
    case "open color dialog":
      setCurrentSnippet(
        <view
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: chosenColor(),
          }}
        >
          <coloropenbutton
            style={{
              width: 100,
              height: 75,
            }}
            options={{
              change: (color) => {
                setChosenColor(color);
              },
            }}
          >
            Open Color Dialog
          </coloropenbutton>
        </view>
      );
      break;
    case "open file dialog":
      setCurrentSnippet(
        <view
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
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
          <view>
            <Show when={chosenFiles()}>
              <text
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                }}
              >
                {chosenFiles()}
              </text>
            </Show>
          </view>
        </view>
      );
      break;
    case "progress":
      setCurrentSnippet(
        <progress
          style={{
            width: 200,
            height: 20,
          }}
          indeterminate={true}
        />
      );
      break;
    case "radiobutton":
      setCurrentSnippet(
        <view>
          <radiobutton
            onClick={(event: ButtonClickEvent) => {
              console.log("RadioButton clicked", event.state);
            }}
          >
            Select me if you ❤️ Solid
          </radiobutton>
          <radiobutton
            onClick={(event: ButtonClickEvent) => {
              console.log("RadioButton clicked", event.state);
            }}
          >
            Select me if you ❤️ NativeScript
          </radiobutton>
        </view>
      );
      break;
    case "save file dialog":
      setCurrentSnippet(
        <view
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <filesavebutton
            style={{
              width: 100,
              height: 75,
            }}
            options={{
              filename: "sample.txt",
              fileTypes: ["txt"],
              createDirectories: true,
            }}
            onFileSave={(event) => {
              console.log("Save file", event.path);
              setSaveFilePath(event.path);
            }}
          >
            Save File
          </filesavebutton>
          <view>
            <Show when={saveFilePath()}>
              <text
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                }}
              >
                {saveFilePath()}
              </text>
            </Show>
          </view>
        </view>
      );
      break;
    case "slider":
      setCurrentSnippet(
        <slider
          numberOfTickMarks={10}
          allowsTickMarkValuesOnly={true}
          onSliderChanged={(event) => {
            console.log(event.value);
          }}
        ></slider>
      );
      break;
    case "text":
      setCurrentSnippet(
        <text
          style={{
            padding: 50,
          }}
        >
          Hello macOS, ❤️ Solid
        </text>
      );
      break;

    case "text field":
      setCurrentSnippet(
        <text-field
          onTextChange={(event) => {
            console.log(event.value);
          }}
          placeholder="Type something here"
        />
      );
      break;

    case "window":
      setCurrentSnippet(
        (() => {
          let windowRef: HTMLWindowElement;
          return (
            <view>
              <window
                ref={(el: HTMLWindowElement) => (windowRef = el)}
                title="Window"
                styleMask={
                  NSWindowStyleMask.Titled |
                  NSWindowStyleMask.Closable |
                  NSWindowStyleMask.Resizable
                }
                style={{
                  width: 200,
                  height: 200,
                }}
              >
                <view
                  style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <text>Hello, I'm a window</text>

                  <button
                    title="Close"
                    onClick={() => {
                      windowRef.close();
                    }}
                  />
                </view>
              </window>
              <button
                onClick={(_event) => {
                  windowRef.open();
                }}
                title="Open window"
              />
            </view>
          );
        })()
      );
      break;

    case "modal":
      setCurrentSnippet(
        (() => {
          let windowRef: HTMLWindowElement;
          return (
            <view>
              <window
                ref={(el: HTMLWindowElement) => (windowRef = el)}
                title="Modal"
                styleMask={
                  NSWindowStyleMask.Titled |
                  NSWindowStyleMask.Closable |
                  NSWindowStyleMask.Resizable
                }
                style={{
                  width: 200,
                  height: 200,
                }}
              >
                <view
                  style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <text>Hello, I'm a modal</text>

                  <button
                    title="Close"
                    onClick={() => {
                      windowRef.closeModalWindow();
                    }}
                  />
                </view>
              </window>
              <button
                onClick={(_event) => {
                  windowRef.openAsModal();
                }}
                title="Open Modal"
              />
            </view>
          );
        })()
      );
      break;
    case "popover":
      setCurrentSnippet(
        (() => {
          let popoverRef: HTMLPopoverElement;
          return (
            <>
              <popover
                style={{
                  width: 200,
                  height: 200,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                ref={(el: HTMLPopoverElement) => (popoverRef = el)}
              >
                <text>Hello!</text>
              </popover>
              <button
                onClick={(event) => {
                  if (!popoverRef?.isShown()) {
                    popoverRef!.show(event.target);
                  } else {
                    popoverRef.hide();
                  }
                }}
              />
            </>
          );
        })()
      );
      break;
    case "webview":
      setCurrentSnippet(
        <webview
          src="https://solidjs.com"
          onLoadStarted={(e) => {
            console.log(e.url);
          }}
          onLoadFinished={(e) => {
            console.log(e.url);
          }}
        ></webview>
      );
      break;
  }
  console.log("updating snippet:", type);
  updateSnippetPreview(type);
}

function getJSXSnippetString(type: string | undefined) {
  switch (type) {
    case "button":
      return `<button
  onClick={(_event) => {
    console.log("Button clicked");
  }}
>
  Tap Me
</button>`;
    case "checkbox":
      return `<checkbox
  onClick={(event) => {
    console.log("Checkbox clicked", event.state);
  }}
>
  Check me if you ❤️ Solid
</checkbox>`;
    case "combobox":
      return `<combobox
  items={comboItems}
  selectedIndex={0}
  onChange={(event) => {
    console.log("ComboBox change", comboItems[event.index]);
  }}
></combobox>`;
    case "image":
      return `<image
  style={{
    width: 100,
    height: 100,
    borderRadius: 10,
  }}
  stretch="aspectFit"
  src="https://www.solidjs.com/img/logo/without-wordmark/logo.jpg"
></image>`;
    case "open color dialog":
      return `<view
  style={{
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: chosenColor(),
  }}
>
  <coloropenbutton
    style={{
      width: 100,
      height: 75,
    }}
    options={{
      change: (color) => {
        setChosenColor(color);
      },
    }}
  >
    Open Color Dialog
  </coloropenbutton>
</view>`;
    case "open file dialog":
      return `<view
  style={{
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
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
      console.log("Chosen files", event.paths);
      setChosenFiles(event.paths?.join("\n"));
    }}
  >
    Open File Dialog...
  </fileopenbutton>
  <view>
    <Show when={chosenFiles()}>
      <text
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        {chosenFiles()}
      </text>
    </Show>
  </view>
</view>`;
    case "progress":
      return `<progress
  style={{
    width: 200,
    height: 20,
  }}
  indeterminate={true}
/>`;
    case "radiobutton":
      return `<view>
  <radiobutton
    onClick={(event: ButtonClickEvent) => {
      console.log("RadioButton clicked", event.state);
    }}
  >
    Select me if you ❤️ Solid
  </radiobutton>
  <radiobutton
    onClick={(event: ButtonClickEvent) => {
      console.log("RadioButton clicked", event.state);
    }}
  >
    Select me if you ❤️ NativeScript
  </radiobutton>
</view>`;
    case "save file dialog":
      return `<view
  style={{
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <filesavebutton
    style={{
      width: 100,
      height: 75,
    }}
    options={{
      filename: "sample.txt",
      fileTypes: ["txt"],
      createDirectories: true,
    }}
    onFileSave={(event) => {
      console.log("Save file", event.path);
      setSaveFilePath(event.path);
    }}
  >
    Save File
  </filesavebutton>
  <view>
    <Show when={saveFilePath()}>
      <text
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        {saveFilePath()}
      </text>
    </Show>
  </view>
</view>`;
    case "slider":
      return `<slider
  numberOfTickMarks={10}
  allowsTickMarkValuesOnly={true}
  onSliderChanged={(event) => {
    console.log(event.value);
  }}
></slider>`;
    case "text":
      return `<text
  style={{
    padding: 50,
  }}
>
  Hello macOS, ❤️ Solid
</text>`;
    case "text field":
      return `<text-field
  style={{
    padding: 50,
  }}
  onTextChange={(event) => {
    console.log(event.value)
  }}
  placeholder="Type something here"
/>`;
    case "window":
      return `<window ref={(el: HTMLWindowElement) => (windowRef = el)}
  title="Window"
  styleMask={
    NSWindowStyleMask.Titled |
    NSWindowStyleMask.Closable |
    NSWindowStyleMask.Resizable
  }
  style={{
    width: 200,
    height: 200,
  }}
/>`;
    case "modal":
      return `<view>
  <window
    ref={(el: HTMLWindowElement) => (windowRef = el)}
    title="Modal"
    styleMask={
      NSWindowStyleMask.Titled |
      NSWindowStyleMask.Closable |
      NSWindowStyleMask.Resizable
    }
    style={{
      width: 200,
      height: 200,
    }}
  >
    <view
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <text>Hello modal</text>

      <button
        title="Close"
        onClick={() => {
          windowRef.closeModalWindow();
        }}
      />
    </view>
  </window>
  <button
    onClick={(_event) => {
      windowRef.openAsModal();
    }}
    title="Open Modal"
  />
</view>`;

    case "popover":
      return `<>
  <popover ref={(el: HTMLPopoverElement) => popoverRef = el}>
    <text>Popover</text>
  </popover>
  <button
    onClick={(event) => {
      if (!popoverRef?.nativeView?.isShown) {
        popoverRef!.show(event.target);
      } else {
        popoverRef.hide();
      }
    }}
  />
</>`;
    case "webview":
      return `<webview
  src="https://solidjs.com"
  onLoadStarted={(e) => {
    console.log(e.url);
  }}
  onLoadFinished={(e) => {
    console.log(e.url);
  }}
></webview>`;
  }
}

function updateSnippetPreview(type: string | undefined) {
  const colorScheme = useColorScheme();
  const data = {
    type,
    snippet: encodeURIComponent(getJSXSnippetString(type)?.trim() as string),
    dark: colorScheme === "dark",
  };
  webRef?.executeJavaScript(
    `typeof window.updateSnippet !== 'undefined' && window.updateSnippet('${type}', '${JSON.stringify(
      data
    )}')`
  );
}

const comboItems = [
  "Ryan Carniato",
  "David Di Biase",
  "Alexandre Mouton Brady",
  "Milo M.",
  "Ryan Turnquist",
  "Nikhil Saraf",
];

const Snippet: Component<SnippetProps> = (props) => {
  createEffect(() => {
    updateSnippetJSX(props.type);
  });
  return (
    <view style={{ width: "100%", height: "100%" }}>
      <view
        style={{
          width: "100%",
          height: "50%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <webview
          ref={(el: WebView) => (webRef = el)}
          src={url}
          debug={true}
          onLoadStarted={(e) => {
            console.log(e.url);
          }}
          onLoadFinished={(e) => {
            console.log(e.url);
            updateSnippetPreview(props.type);
          }}
        />
      </view>
      <view
        style={{
          width: "100%",
          height: "50%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {currentSnippet()}
      </view>
    </view>
  );
};

export default Snippet;
