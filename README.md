<p align="center">
  <img src="./icon//icon-128.png" alt="Solid for macOS">
</p>

<h1 align="center">Solid for macOS</h1>

Solid for macOS empowers you to build truly native desktop apps, leveraging
native [AppKit](https://developer.apple.com/documentation/appkit) components for
a seamless and performant user experience. Unlike purely webview based
cross-platform frameworks (_or frameworks that attempt to recreate the entire
platform interface_), Solid for macOS directly integrates with macOS's native
APIs, ensuring your apps behave, look and feel right at home on macOS. This
integration allows you to develop 100% native macOS apps that utilize _all_ the
nuanced capabilities of the entire platform, providing users with a smooth and
responsive experience.

The first macOS app built with [Solid](https://www.solidjs.com/) is already
available on the
[Mac App Store here](https://apps.apple.com/us/app/solid-for-macos/id1574916360).
We welcome you to install and give it a try (_compatible with macOS 14+ and
M-series arm64 machines_).

You can also try out the example app in this repository. To run the example,
clone this repository and run the following commands:

```bash
deno task bundle
```

```bash
deno task start
```

Yes, **you don't need Xcode installed** to run and develop the app for macOS.
You can start the app directly from the terminal, it's as simple as that. Only
when you are ready to release your app would you need Xcode and an Apple
developer account to publish to the store.

## Architecture

To fully understand the capabilities and architecture of Solid for macOS, it's
essential to delve into the various components that work together to bring this
framework to life. Each component plays a crucial role in ensuring seamless
integration with macOS native APIs. Let's explore these components in detail to
see how they contribute to the overall functionality of Solid for macOS.

### Runtime

The runtime is a critical component that bridges the gap between macOS APIs and
the JavaScript environment. Written in Objective-C++, it leverages
[Node-API](https://nodejs.org/api/n-api.html#node-api) to facilitate seamless
communication with the JavaScript engine. This open-source runtime, available at
[macos-node-api](https://github.com/NativeScript/runtime-node-api), handles the
complex task of synchronizing the JavaScript and native macOS environments. By
doing so, it ensures both environments remain in perfect harmony, allowing
developers to access native APIs with maximum efficiency.

## DOM

DOM provides the simplest possible implementation of a
[DOM Document](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model),
just enough to expose the most basic DOM Apis needed by Solid. We are using
[undom-ng](https://github.com/ClassicOldSong/undom-ng) as a simple and
lightweight DOM implementation.

## Foundation

The foundation of Solid for macOS takes the integration of web and native
concepts to the next level, making the process of building native macOS apps
intuitive and familiar for web developers. By combining the best ideas from both
worlds, it ensures that developers can leverage their existing web development
skills to create high-quality native apps from day one.

One of foundation's primary responsibilities is to handle various aspects of the
application, including styling, layout, rendering, windowing, menubars, and the
overall application lifecycle. This comprehensive approach ensures that all
essential elements of a macOS app are seamlessly managed, providing a cohesive
development experience.

To achieve this, foundation enables each AppKit UI component to be a DOM element
and registers it with the global document object. This enablement allows
developers to interact with native components using familiar web development
paradigms.

For layout management, foundation utilizes the flexbox layout engine provided by
[Meta's Yoga](https://github.com/facebook/yoga), enabling developers to apply
almost all flexbox properties to DOM elements. This approach simplifies the
process of creating complex and responsive layouts.

The most basic UI element provided by foundation is the view, which internally
creates an [NSView](https://developer.apple.com/documentation/appkit/nsview).
This foundational element serves as the building block for more complex
components. Foundation already includes a comprehensive set of basic AppKit
components, and ongoing efforts are being made to expand this library further,
ensuring that developers have access to all AppKit has to offer.

## Solid Renderer

A custom renderer, implemented at [renderer](./solid-native/renderer.js), is
used to transform JSX into our DOM implementation. This renderer seamlessly
integrates Solid's reactive capabilities with native macOS components.

## Deployment

If you have noticed, our
[Solid Desktop app on Mac App Store](https://apps.apple.com/us/app/solid-for-macos/id1574916360)
is just 5.5 MB in size. That is possible with
[Hermes](https://github.com/facebook/hermes), a JavaScript engine developed by
Meta. Credit to [Tzvetan Mikov](https://github.com/tmikov) for his continued
excellence on the engine. Hermes provides optimal performance while having
minimal footprint.
