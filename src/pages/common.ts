export function getSolidLogo() {
  if (
    NSBundle.mainBundle?.objectForInfoDictionaryKey("NativeScriptApplication")
  ) {
    return "file://" +
      NSBundle.mainBundle.URLForResourceWithExtension("solid", "png");
  } else {
    return import.meta.resolve("../assets/solid.png");
  }
}
