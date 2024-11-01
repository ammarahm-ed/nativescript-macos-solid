import { getSolidLogo } from "./common.ts";

export default function Setup() {
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
      <view>
        <scroll-view
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <view>
            <view
              style={{
                backgroundColor: "#2c4f7c",
                borderRadius: 10,
                marginLeft: 18,
                marginRight: 18,
                padding: 18,
              }}
            >
              <text
                style={{
                  fontSize: 14,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Setup your own Solid macOS app by cloning this template:
              </text>
              <view
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  style={{
                    width: 300,
                    marginTop: 18,
                    marginBottom: 18,
                  }}
                  onClick={() => {
                    NSWorkspace.sharedWorkspace.openURL(
                      NSURL.URLWithString("https://github.com/NativeScript/template-macos-solid")
                    );
                  }}
                >
                  Open Solid macOS Starter Template
                </button>
              </view>
            </view>
            <view
              style={{
                marginTop: 24,
                marginLeft: 18,
                marginRight: 18,
                padding: 18,
              }}
            >
              <text
                style={{
                  fontSize: 14,
                  color: "#999",
                  textAlign: "center",
                }}
              >
                This template provides all the necessary setup to get started
                with Solid macOS.
              </text>
              <text
                style={{
                  fontSize: 14,
                  marginTop: 18,
                  color: "#999",
                  textAlign: "center",
                }}
              >
                You can explore all the UI components available here in this app on the
                left. Use the copy snippet button to use any UI control for your
                own Solid macOS app.
              </text>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  );
}
