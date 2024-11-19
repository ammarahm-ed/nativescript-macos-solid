import { Application } from "./core/index.ts";

await import("app").then((module) => {
  // Async import ensures that objc globals are defined when module is loaded.
  module.startApp();
  Application.launch();
});
