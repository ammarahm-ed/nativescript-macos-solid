function Image() {
  return (
    <image
      style={{
        width: 100,
        height: 100,
        borderRadius: 10,
      }}
      stretch="aspectFit"
      src="https://www.solidjs.com/img/logo/without-wordmark/logo.jpg"
    />
  );
}

Image.snippetName = "Image";

Image.code = `function Image() {
  return (
    <image
      style={{
        width: 100,
        height: 100,
        borderRadius: 10,
      }}
      stretch="aspectFit"
      src="https://www.solidjs.com/img/logo/without-wordmark/logo.jpg"
    />
  );
}`;

export default Image;
