const SOLID_LOGO = `file://${Deno.cwd()}/icon/icon-512.png`;
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
          src={SOLID_LOGO}
        ></image>
        <text
          style={{
            fontSize: 18,
            marginLeft: 8,
          }}
        >
          Solid macOS Overview
        </text>
      </view>
      <view
        style={{
          backgroundColor: "#efefef",
          borderRadius: 10,
          marginLeft: 16,
          marginRight: 16,
          padding: 10,
        }}
      >
        <text
          style={{
            fontSize: 14,
            color: "#999",
          }}
        >
          Solid macOS is a macOS app built with Solid and NativeScript.
        </text>
        <text
          style={{
            fontSize: 14,
            marginTop: 4,
            color: "#999",
          }}
        >
          It uses native components from Apple's AppKit, used to build the user
          interface for a macOS app.
        </text>
      </view>
    </view>
  );
}
