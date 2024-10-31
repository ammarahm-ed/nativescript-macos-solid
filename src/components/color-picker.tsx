import { createSignal } from "npm:solid-js";

function ColorDialog() {
  const [chosenColor, setChosenColor] = createSignal("white");
  return (
    <view
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <view
        style={{
          width: 100,
          height: 100,
          backgroundColor: chosenColor(),
          borderRadius: 10,
        }}
      />
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
        Open Color Picker
      </coloropenbutton>
    </view>
  );
}

ColorDialog.snippetName = "ColorDialog";

ColorDialog.code = `function ColorPicker() {
  const [chosenColor, setChosenColor] = createSignal("white");
  return (
    <view
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <view
        style={{
          width: 100,
          height: 100,
          backgroundColor: chosenColor(),
          borderRadius: 10,
        }}
      />
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
        Open Color Picker
      </coloropenbutton>
    </view>
  );
}`;

export default ColorDialog;
