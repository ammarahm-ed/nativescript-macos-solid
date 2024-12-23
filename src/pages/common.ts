export function getSolidLogo() {
  if (
    NSBundle.mainBundle?.objectForInfoDictionaryKey("NativeScriptApplication")
  ) {
    const logo = NSBundle.mainBundle.pathForResourceOfType("solid", "png");
    console.log("logo:", logo);
    return logo;
  } else {
    return import.meta.resolve("../assets/solid.png");
  }
}
