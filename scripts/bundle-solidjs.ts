import { denoPlugins } from "esbuild-deno-loader";
import * as esbuild from "npm:esbuild";
import { solidPlugin } from "npm:esbuild-plugin-solid";

async function bundleSolidJSApp(file: string, outFile: string) {
  if (!file) {
    console.error("Please provide a file to bundle.");
    return false;
  }

  if (!outFile) {
    console.error("Please provide an output file.");
    return false;
  }

  if (!file.endsWith(".ts") && !file.endsWith(".tsx")) {
    console.error("Please provide a .ts file to bundle.");
    console.error("Given file: ", file);
    return false;
  }

  if (!outFile.endsWith(".js")) {
    console.error("Please provide a .js output file.");
    console.error("Given file: ", outFile);
    return false;
  }

  const [denoResolver, denoLoader] = [...denoPlugins({
    importMapURL: import.meta.resolve("../import_map.json"),
    configPath: Deno.cwd() + "/deno.json",
  })];
  await esbuild.build({
    entryPoints: [file],
    outfile: outFile,
    bundle: true,
    format: "esm",
    treeShaking: false,
    minify: false,
    plugins: [
      denoResolver,

      // Solid handles the JSX, so it needs to be sandwiched between the deno plugins
      solidPlugin({
        solid: {
          moduleName: "solid-native-renderer",
          generate: "universal",
        },
      }) as any,

      denoLoader,
    ],
  });
}

// Get first argument
const file = Deno.args[0];
const outFile = Deno.args[1];

await bundleSolidJSApp(file, outFile);
