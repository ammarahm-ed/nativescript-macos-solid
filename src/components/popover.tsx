function Popover() {
  let popoverRef: HTMLPopoverElement;
  return (
    <>
      <popover
        style={{
          width: 200,
          height: 200,
          justifyContent: "center",
          alignItems: "center",
        }}
        ref={(el: HTMLPopoverElement) => (popoverRef = el)}
      >
        <text>Hello!</text>
      </popover>
      <button
        onClick={(event) => {
          if (!popoverRef?.isShown()) {
            popoverRef!.show(event.target);
          } else {
            popoverRef.hide();
          }
        }}
      />
    </>
  );
}

Popover.snippetName = "Popover";

Popover.code = `function Popover() {
  let popoverRef: HTMLPopoverElement;
  return (
    <>
      <popover
        style={{
          width: 200,
          height: 200,
          justifyContent: "center",
          alignItems: "center",
        }}
        ref={(el: HTMLPopoverElement) => (popoverRef = el)}
      >
        <text>Hello!</text>
      </popover>
      <button
        onClick={(event) => {
          if (!popoverRef?.isShown()) {
            popoverRef!.show(event.target);
          } else {
            popoverRef.hide();
          }
        }}
      />
    </>
  );
}`;

export default Popover;
