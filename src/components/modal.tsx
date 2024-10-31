function Modal() {
  let modalRef: HTMLWindowElement;
  return (
    <view>
      <window
        ref={(el: HTMLWindowElement) => (modalRef = el)}
        title="Modal"
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
          <text>A Solid Modal</text>

          <button
            title="Close"
            onClick={() => {
              modalRef.closeModalWindow();
            }}
          />
        </view>
      </window>
      <button
        onClick={(_event) => {
          modalRef.openAsModal();
        }}
        title="Open Modal"
      />
    </view>
  );
}

Modal.snippetName = "Modal";

Modal.code = `function Modal() {
  let modalRef: HTMLWindowElement;
  return (
    <view>
      <window
        ref={(el: HTMLWindowElement) => (modalRef = el)}
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
            width: 200,
            height: 200,
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <text>A Solid Modal</text>

          <button
            title="Close"
            onClick={() => {
              modalRef.closeModalWindow();
            }}
          />
        </view>
      </window>
      <button
        onClick={(_event) => {
          modalRef.openAsModal();
        }}
        title="Open Modal"
      />
    </view>
  );
}`;

export default Modal;
