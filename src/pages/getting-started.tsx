import { SOLID_LOGO } from "./common.ts";

export default function GettingStarted() {
  return (
    <view
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
      />
      <text
        style={{
          fontSize: 20,
          padding: 18,
        }}
      >
        Hello Solid macOS
      </text>
      <text
        style={{
          fontSize: 18,
          color: "#999",
        }}
      >
        Let's build something Solid ❤️ together
      </text>
      <view
        style={{
          backgroundColor: "#efefef",
          borderRadius: 10,
          marginTop: 16,
          padding: 10,
        }}
      >
        <text
          style={{
            fontSize: 14,
            fontStyle: "italic",
            color: "#999",
          }}
        >
          1. Explore AppKit components to use in your app
        </text>
        <text
          style={{
            fontSize: 14,
            marginTop: 4,
            fontStyle: "italic",
            color: "#999",
          }}
        >
          2. Explore complete examples by switching views on top
        </text>
        <text
          style={{
            fontSize: 14,
            marginTop: 4,
            fontStyle: "italic",
            color: "#999",
          }}
        >
          3. Share videos of your app on X, Discord, GitHub, LinkedIn, etc.
        </text>
      </view>
    </view>
  );
}
