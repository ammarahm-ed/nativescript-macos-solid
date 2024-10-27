import $ from "jsr:@david/dax@0.42.0";
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

await copy(
  new URL(app.icon, new URL("../", import.meta.url)),
  new URL(`../dist/${app.name}.app/Contents/AppIcon.icns`, import.meta.url),
);

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
    `../dist/${app.name}.app/Contents/Frameworks/libNativeScript.dylib`,
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
  CFBundleIconFile: "AppIcon",
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
};

let plist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>\n`;

for (const [key, value] of Object.entries(plistProperties)) {
  plist += `  <key>${key}</key>\n`;
  if (typeof value === "string") {
    plist += `<string>${value}</string>\n`;
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
  new URL(`../dist/app.js`, import.meta.url),
  result.code,
);

await $`deno compile -A --unstable-sloppy-imports --no-check -o ${
  new URL(`../dist/${app.name}.app/Contents/MacOS/${app.name}`, import.meta.url)
    .pathname
} ${new URL("../dist/app.js", import.meta.url).pathname}`;

console.log(`Bundled ${app.name}.app`);
