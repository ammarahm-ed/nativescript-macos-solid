import "@nativescript/macos-node-api";
import "dom";
import Application from "./core/application.ts";
import * as module from "app";

// await import("app").then((module) => {
  // Async import ensures that objc globals are defined when module is loaded.
  module.startApp();
  Application.launch();
// });
