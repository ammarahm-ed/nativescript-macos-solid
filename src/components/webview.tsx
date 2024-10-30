function Webview() {
  return (
    <webview
      style={{ width: "100%", height: "100%" }}
      src="https://solidjs.com"
      onLoadStarted={(e) => {
        console.log(e.url);
      }}
      onLoadFinished={(e) => {
        console.log(e.url);
      }}
    />
  );
}


Webview.code = `function WebView() {
  return (
    <webview
      src="https://solidjs.com"
      onLoadStarted={(e) => {
        console.log(e.url);
      }}
      onLoadFinished={(e) => {
        console.log(e.url);
      }}
    />
  );
}`

export default Webview;