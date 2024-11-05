function Window() {
  let windowRef: HTMLWindowElement;

  return (
    <view>
      <window
        ref={(el: HTMLWindowElement) => (windowRef = el)}
        title="Window"
        styleMask={NSWindowStyleMask.Titled |
          NSWindowStyleMask.Closable |
          NSWindowStyleMask.Resizable}
        style={{
          width: 200,
          height: 200,
        }}
      >
        <view
          style={{
            width: 200,
            height: 200,
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <text>A Solid Window</text>

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
}

Window.code = `function Window() {
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
            width: 200,
            height: 200,
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <text>A Solid Window</text>

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
}`;

export default Window;
