import { copy } from "jsr:@std/fs@1.0.4/copy";
import { denoPlugins } from "https://deno.land/x/esbuild_deno_loader@0.8.1/mod.ts";
import * as esbuild from "npm:esbuild";
import { transform } from "npm:@swc/core";

const {
  app,
} = JSON.parse(
  await Deno.readTextFile("deno.json").catch(() =>
    Deno.readTextFile("deno.jsonc")
  ),
);

await Deno.remove(new URL(`../dist/${app.name}.app`, import.meta.url), {
  recursive: true,
}).catch(() => {});

await Deno.mkdir(
  new URL(`../dist/${app.name}.app/Contents/MacOS`, import.meta.url),
  { recursive: true },
);

await Deno.mkdir(
  new URL(`../dist/${app.name}.app/Contents/Frameworks`, import.meta.url),
);

await esbuild.build({
  entryPoints: [
    new URL(app.entryPoint, new URL("../", import.meta.url)).pathname,
  ],
  outfile: new URL(`../dist/app.js`, import.meta.url).pathname,
  bundle: true,
  format: "esm",
  treeShaking: false,
  minify: false,
  plugins: [...denoPlugins({
    importMapURL: new URL("../import_map.json", import.meta.url).href,
  })] as any,
  tsconfig: "deno.json",
});

const result = await transform(
  Deno.readTextFileSync(new URL(`../dist/app.js`, import.meta.url)),
  {
    jsc: {
      target: "es5",
    },
  },
);
Deno.writeTextFileSync(
  new URL(`../dist/app_es5.js`, import.meta.url),
  "try{" +
    result.code.replaceAll("import.meta.resolve", "__import_meta_resolve")
      .replaceAll("import.meta.url", "__import_meta_url").replaceAll(
        "await import(",
        "__await_import(",
      ).replaceAll(
        "result = Reflect.construct(Super, arguments, NewTarget);",
        "result = Reflect.construct(Super, Super === Object ? [] : arguments, NewTarget);",
      ) +
    "}catch(e){console.error(e.stack)}",
);

new Deno.Command("/Users/dj/Projects/gh/nativescript/runtime/runtime/hermesc", {
  args: ["-emit-binary", "-out", "./assets/app.hbc", "./dist/app_es5.js"],
  stdin: "null",
  stdout: "piped",
  stderr: "piped",
}).outputSync();

if (app.assets) {
  await copy(
    new URL(app.assets, new URL("../", import.meta.url)),
    new URL(`../dist/${app.name}.app/Contents/Resources`, import.meta.url),
  );
} else {
  await Deno.mkdir(
    new URL(`../dist/${app.name}.app/Contents/Resources`, import.meta.url),
    { recursive: true },
  );
}

await copy(
  // TODO: don't hardcode
  Deno.env.get("HOME") +
    "/Library/Caches/deno/npm/registry.npmjs.org/@nativescript/macos-node-api/0.1.2/dist/macos/NativeScript.node",
  new URL(
    `../dist/${app.name}.app/Contents/Frameworks/libNativeScript.0.1.0.dylib`,
    import.meta.url,
  ),
  { overwrite: true },
);

await Deno.copyFile(
  new URL(
    `../../yoga-node-api/build/libyoga_node_api.dylib`,
    import.meta.url,
  ),
  new URL(
    `../dist/${app.name}.app/Contents/Frameworks/libyoga_node_api.dylib`,
    import.meta.url,
  ),
);

await copy(
  new URL(
    `../../gh/nativescript/runtime/runtime/Frameworks/hermes.xcframework/macos-arm64_x86_64/hermes.framework`,
    import.meta.url,
  ),
  new URL(
    `../dist/${app.name}.app/Contents/Frameworks/hermes.framework`,
    import.meta.url,
  ),
  { overwrite: true },
);

await copy(
  new URL(
    `../../gh/nativescript/runtime/runtime/build/macos/Release/NativeScriptRuntime.framework`,
    import.meta.url,
  ),
  new URL(
    `../dist/${app.name}.app/Contents/Frameworks/NativeScriptRuntime.framework`,
    import.meta.url,
  ),
  { overwrite: true },
);

const plistProperties: Record<string, string | string[]> = {
  BuildMachineOSBuild: "22F66",
  CFBundleDevelopmentRegion: "en",
  CFBundleExecutable: app.name,
  CFBundleIdentifier: app.identifier,
  CFBundleInfoDictionaryVersion: "6.0",
  CFBundleName: app.name,
  CFBundlePackageType: "APPL",
  CFBundleShortVersionString: app.version,
  CFBundleSupportedPlatforms: ["MacOSX"],
  CFBundleVersion: app.version,
  CFBundleIconFile: "AppIcon.icns",
  DTCompiler: "com.apple.compilers.llvm.clang.1_0",
  DTPlatformBuild: "",
  DTPlatformName: "macosx",
  DTPlatformVersion: "13.3",
  DTSDKBuild: "22E245",
  DTSDKName: "macosx10.15",
  DTXcode: "1430",
  DTXcodeBuild: "14E22b",
  LSMinimumSystemVersion: "12.0",
  NSPrincipalClass: "NSApplication",
  NativeScriptApplication: "true",
};

let plist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>\n`;

for (const [key, value] of Object.entries(plistProperties)) {
  plist += `  <key>${key}</key>\n`;
  if (typeof value === "string") {
    plist += `  <string>${value}</string>\n`;
  } else {
    plist += `  <array>\n`;
    for (const item of value) {
      plist += `    <string>${item}</string>\n`;
    }
    plist += `  </array>\n`;
  }
}

plist += `</dict>
</plist>\n`;

await Deno.writeTextFile(
  new URL(`../dist/${app.name}.app/Contents/Info.plist`, import.meta.url),
  plist,
);

await Deno.writeTextFile(
  new URL(`../dist/${app.name}.app/Contents/PkgInfo`, import.meta.url),
  "APPL????",
);

await Deno.copyFile(
  new URL(
    "../../gh/nativescript/runtime/runtime/build/macos/Release/charon",
    import.meta.url,
  ),
  new URL(
    `../dist/${app.name}.app/Contents/MacOS/${app.name}`,
    import.meta.url,
  ),
);

console.log(`Bundled ${app.name}.app`);
