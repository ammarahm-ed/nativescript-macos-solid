import { SOLID_LOGO } from "./common.ts";

export default function Setup() {
    return <view
    style={{
      width: "100%",
      height: "100%",
    }}
  >
    <view
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
      }}
    >
      <image
        style={{
          width: 50,
          height: 50,
        }}
        stretch="aspectFit"
        src={SOLID_LOGO}
      ></image>
      <text
        style={{
          fontSize: 18,
          marginLeft: 8,
        }}
      >
        Solid macOS Setup
      </text>
    </view>
  </view>
}