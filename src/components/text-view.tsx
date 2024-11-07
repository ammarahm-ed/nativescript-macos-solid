import { useColorScheme } from "../hooks/use-color-scheme.ts";

function TextView() {
  const colorScheme = useColorScheme();

  return (
    <view
      style={{
        width: "100%",
        height: "100%",
        margin: 20,
        padding: 20,
        backgroundColor: colorScheme == "dark" ? "#000000" : "#efefef",
        borderRadius: 10,
      }}
    >
      <text-view
        style={{
          padding: 10,
          width: "100%",
          height: "100%",
          borderRadius: 10,
        }}
        richText={true}
        isEditable={true}
        onTextChange={(args) => {
          console.log(args.value);
        }}
      >
        Hello macOS, ❤️ Solid
      </text-view>
    </view>
  );
}
TextView.snippetName = "TextView";
TextView.code = `function Text() {
    return (
      <text-view
        style={{
          padding: 10,
          width: "100%",
          height: "100%",
        }}
      >
        Hello macOS, ❤️ Solid
      </text-view>
    );
  }`;

export default TextView;
