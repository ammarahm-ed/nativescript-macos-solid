import "@nativescript/macos-node-api";
import "dom";
import Application from "./core/application.ts";

await import("app").then((module) => {
  // Async import ensures that objc globals are defined when module is loaded.
  module.startApp();
  Application.launch();
});
