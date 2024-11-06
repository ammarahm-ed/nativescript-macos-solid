<p align="center">
  <img src="./icon//icon-128.png" alt="Solid for macOS">
</p>

<h1 align="center">Solid for macOS</h1>

Solid for macOS empowers you to build truly native macOS apps using SolidJS, leveraging native AppKit components for a seamless and performant user experience. Unlike webview or cross-platform frameworks, Solid for macOS directly integrates with macOS's native APIs, ensuring your apps look and feel right at home on macOS. This integration allows developers to 100% native macOS applications that fully utilize the capabilities of macOS, providing users with a smooth and responsive experience.

The first macOS app built with Solid for macOS is already available on the Mac App Store. You can download it [here](https://apps.apple.com/us/app/solid-for-macos/id1574916360) and see it in action.

You can also try out the example app in this repository. To run the example app, clone this repository and run the following commands:

```bash
deno task bundle
```

```bash
deno task start
```

Yes, **you don't need Xcode installed** to run and develop the app for macOS. You can start the app directly from the terminal, it's as simple as that. Only when you are ready to release your app would you need Xcode and an Apple developer account to publish to the store.

## Architecture

To fully understand the capabilities and architecture of Solid for macOS, it's essential to delve into the various components that work together to bring this framework to life. Each component plays a crucial role in ensuring seamless integration with macOS's native APIs. Let's explore these components in detail to see how they contribute to the overall functionality of Solid for macOS.

### Runtime

The runtime is a critical component that bridges the gap between macOS APIs and the JavaScript environment. Written in Objective-C++, it leverages Node-API to facilitate seamless communication with the JavaScript engine. This open-source runtime, available at [macos-node-api](https://github.com/NativeScript/runtime-node-api), handles the complex task of synchronizing the JavaScript and native macOS environments. By doing so, it ensures that both environments remain in perfect harmony, allowing developers to access native APIs with minimal overhead and maximum efficiency.

## DOM

DOM provides the simplest possible implementation of a DOM Document, just enough to expose the most basic DOM Apis needed by SolidJS. We are using [undom-ng](https://github.com/ClassicOldSong/undom-ng) as a simple and lightweight DOM implementation.

## Core

The core of Solid for macOS takes the integration of web and native concepts to the next level, making the process of building native macOS apps intuitive and familiar for web developers. By combining the best ideas from both worlds, it ensures that developers can leverage their existing web development skills to create high-quality native applications from day one.

One of the core's primary responsibilities is to handle various aspects of the application, including styling, layout, rendering, windowing, menubars, and the overall application lifecycle. This comprehensive approach ensures that all essential elements of a macOS app are seamlessly managed, providing a cohesive development experience.

To achieve this, the core transforms each AppKit UI component into a DOM element and registers it with the global document object. This transformation allows developers to interact with native components using familiar web development paradigms.

For layout management, the core utilizes the flexbox layout engine provided by [facebook/yoga](https://github.com/facebook/yoga), enabling developers to apply almost all flexbox properties to DOM elements. This approach simplifies the process of creating complex and responsive layouts.

The most basic UI element provided by the core is the view, which internally creates an NSView. This foundational element serves as the building block for more complex components. The core already includes a comprehensive set of basic AppKit components, and ongoing efforts are being made to expand this library further, ensuring that developers have access to a wide range of native UI elements.

## Solid Renderer

A custom renderer, implemented at [renderer](./solid-native/renderer.js), is used to transform JSX into our DOM implementation. This renderer seamlessly integrates SolidJS's reactive capabilities with native macOS components.


