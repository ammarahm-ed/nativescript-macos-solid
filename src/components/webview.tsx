function Webview() {
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
}

Webview.snippetName = "Webview";

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
}`;

export default Webview;
