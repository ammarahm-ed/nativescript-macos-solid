import { SOLID_LOGO } from "./common.ts";


export default function Components() {
    return <view
    style={{
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <image
      style={{
        width: 200,
        height: 200,
      }}
      stretch="aspectFit"
      src={SOLID_LOGO}
    ></image>
    <text
      style={{
        fontSize: 20,
        padding: 18,
      }}
    >
      Solid macOS Components
    </text>
    <text
      style={{
        fontSize: 16,

        color: "#999",
      }}
    >
      Try AppKit for yourself
    </text>
    <text
      style={{
        fontSize: 16,
        fontStyle: "italic",
        color: "#999",
        marginTop: 16,
      }}
    >
      Copy Solid component snippets for your own use
    </text>
  </view>
}