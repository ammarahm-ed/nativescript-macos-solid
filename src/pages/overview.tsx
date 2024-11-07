import { getSolidLogo } from "./common.ts";
export default function Overview() {
  return (
    <view
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
          src={getSolidLogo()}
        >
        </image>
        <text
          style={{
            fontSize: 18,
            marginLeft: 8,
          }}
        >
          Solid Desktop Overview
        </text>
      </view>
      <view>
        <scroll-view
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <view
            style={{
              backgroundColor: "#efefef",
              borderRadius: 10,
              marginLeft: 16,
              marginRight: 16,
              padding: 18,
            }}
          >
            <text
              style={{
                fontSize: 14,
                color: "#999",
              }}
            >
              Solid Desktop is a macOS app built with Solid and NativeScript.
            </text>
            <text
              style={{
                fontSize: 14,
                marginTop: 18,
                color: "#999",
              }}
            >
              It uses native components from Apple's AppKit, used to build the
              user interface for a macOS app.
            </text>
          </view>
        </scroll-view>
      </view>
    </view>
  );
}
