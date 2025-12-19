#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/build/NPMBuilder.ts
import { Result } from "@onyx-ignition/forge";
import { $Transform, CalcCodeSize } from "./a43b20000-30000-9ba4-40000-9b34d579780000500001126.mjs";
import { LibraryBuilder } from "./0834e0000-f0000-ea4b-00000-9b34d57978000010000fc18.mjs";
import { $BuildTypes } from "./274160000-70000-902c-80000-9b34d57978000090000e343.mjs";
async function $BuildNPM(builderOptions, bin, library) {
  const npmResult = new Result();
  const totalTime = Date.now();
  {
    const startTimne = Date.now();
    const { files, name } = library;
    const result = await $BuildTypes({ files }, name, { ...builderOptions, bundled: "merge" });
    if (result.success === false) return npmResult.merge(result).reject();
    const { code } = result.or({ code: true }).first;
    npmResult.add({ code }, { code: true, types: true });
    const size = CalcCodeSize(code);
    const elapsed = Date.now() - startTimne;
    npmResult.add({ elapsed, size }, { stats: true, types: true });
    console.blue("index.d.ts compiled in ", Date.now() - startTimne, "s");
  }
  if (bin) {
    const startTimne = Date.now();
    builderOptions.format = "cjs";
    builderOptions.platform = "node";
    const result = await $Transform(bin, builderOptions);
    if (result.success === false) return npmResult.merge(result).reject();
    let { code } = result.or({ code: true }).first;
    code = String(code).replace(/#! \/usr\/bin\/env node/, `#! /usr/bin/env node
require("index");
`);
    npmResult.add({ code }, { code: true, npx: true });
    const size = CalcCodeSize(code);
    const elapsed = Date.now() - startTimne;
    npmResult.add({ elapsed, size }, { stats: true, npx: true });
  }
  {
    const { files, root, join, ext } = library;
    const formats = [["cjs", ext.cjs], ["esm", ext.esm]];
    for (const [format, ext2] of formats) {
      const startTime = Date.now();
      const library2 = new LibraryBuilder();
      builderOptions.format = format;
      builderOptions.bundled = "mangle";
      if (builderOptions.bundled == "mangle" || builderOptions.bundled == "preserve") {
        const result = await library2.$export({ files, root }, builderOptions, { join, ext: ext2 });
        if (result.success === false) return npmResult.merge(result).reject();
        for (const [component, attributes] of result.or({ code: true })) {
          let { code, path } = component;
          const size = CalcCodeSize(code);
          const elapsed = startTime - Date.now();
          if (path == "{index}") {
            path = `index${ext2}`;
            npmResult.add({ code, path }, { code: true, library: true, index: true, format });
            npmResult.add({ elapsed, size }, { stats: true, library: true, index: true, format });
          } else {
            npmResult.add({ code, path }, { code: true, library: true, format });
            npmResult.add({ elapsed, size }, { stats: true, library: true, format });
          }
        }
      } else if (builderOptions.bundled == "merge") {
        const code = await library2.$bundle({ files, root }, builderOptions);
        npmResult.add({ code }, { code: true, library: true, index: true, format });
      } else {
        throw new Error(`Invalid bundle option: ${builderOptions.bundled}`);
      }
    }
  }
  console.blue("NPM package compiled in ", Date.now() - totalTime, "s");
  return npmResult;
}
export {
  $BuildNPM
};
