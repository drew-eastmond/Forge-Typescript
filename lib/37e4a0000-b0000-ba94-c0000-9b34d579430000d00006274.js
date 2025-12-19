#! /usr/bin/env node

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../Forge-Typescript-Source/src/ts/build/NPMBuilder.ts
var NPMBuilder_exports = {};
__export(NPMBuilder_exports, {
  $BuildNPM: () => $BuildNPM
});
module.exports = __toCommonJS(NPMBuilder_exports);
var import_forge = require("@onyx-ignition/forge");
var import_Core = require("./7dd00000-0000-3afb-0000-9b34d5794200000000d7f0.js");
var import_LibraryBuilder = require("./d8ec60000-70000-1686-80000-9b34d579430000900006f71.js");
var import_TypesBuilder = require("./edc0e0000-f0000-05b1-00000-9b34d579430000100008616.js");
async function $BuildNPM(builderOptions, bin, library) {
  const npmResult = new import_forge.Result();
  const totalTime = Date.now();
  {
    const startTimne = Date.now();
    const { files, name } = library;
    const result = await (0, import_TypesBuilder.$BuildTypes)({ files }, name, { ...builderOptions, bundled: "merge" });
    if (result.success === false) return npmResult.merge(result).reject();
    const { code } = result.or({ code: true }).first;
    npmResult.add({ code }, { code: true, types: true });
    const size = (0, import_Core.CalcCodeSize)(code);
    const elapsed = Date.now() - startTimne;
    npmResult.add({ elapsed, size }, { stats: true, types: true });
    console.blue("index.d.ts compiled in ", Date.now() - startTimne, "s");
  }
  if (bin) {
    const startTimne = Date.now();
    builderOptions.format = "cjs";
    builderOptions.platform = "node";
    const result = await (0, import_Core.$Transform)(bin, builderOptions);
    if (result.success === false) return npmResult.merge(result).reject();
    let { code } = result.or({ code: true }).first;
    code = String(code).replace(/#! \/usr\/bin\/env node/, `#! /usr/bin/env node
require("index");
`);
    npmResult.add({ code }, { code: true, npx: true });
    const size = (0, import_Core.CalcCodeSize)(code);
    const elapsed = Date.now() - startTimne;
    npmResult.add({ elapsed, size }, { stats: true, npx: true });
  }
  {
    const { files, root, join, ext } = library;
    const formats = [["cjs", ext.cjs], ["esm", ext.esm]];
    for (const [format, ext2] of formats) {
      const startTime = Date.now();
      const library2 = new import_LibraryBuilder.LibraryBuilder();
      builderOptions.format = format;
      builderOptions.bundled = "mangle";
      if (builderOptions.bundled == "mangle" || builderOptions.bundled == "preserve") {
        const result = await library2.$export({ files, root }, builderOptions, { join, ext: ext2 });
        if (result.success === false) return npmResult.merge(result).reject();
        for (const [component, attributes] of result.or({ code: true })) {
          let { code, path } = component;
          const size = (0, import_Core.CalcCodeSize)(code);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $BuildNPM
});
