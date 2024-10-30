export function getSolidLogo() {
  if (
    NSBundle.mainBundle?.objectForInfoDictionaryKey("NativeScriptApplication")
  ) {
    return "file://" +
      NSBundle.mainBundle.URLForResourceWithExtension("solid", "png");
  } else {
    return `file://${Deno.cwd()}/icon/icon-512.png`;
  }
}
