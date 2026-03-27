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

// ../Forge-Typescript-Source/src/ts/build/npm/NPMBuilder.ts
var NPMBuilder_exports = {};
__export(NPMBuilder_exports, {
  $BuildNPM: () => $BuildNPM
});
module.exports = __toCommonJS(NPMBuilder_exports);
var import_forge = require("@onyx-ignition/forge");
var import_Core = require("./02e263f9546d01d4d379d2a91cf19496.js");
var import_LibraryBuilder = require("./2815fdad886e131d5b813285c76cdcc5.js");
var import_TypesBuilder = require("./e564693af5f22bea6e40aaee8b0ec30d.js");
async function $BuildNPM(packages) {
  (0, import_Core.VerifyPackages)(packages, {
    "NPM packaging validation failed": import_forge.QuerySequence.And({ validate: true, npm: true }),
    "NPM packaging sanitation failed": import_forge.QuerySequence.And({ sanitize: true, npm: true })
  });
  const validations = (0, import_forge.MergeValidations)(packages);
  const forgeOptions = (0, import_forge.MergePackages)(packages, import_forge.QuerySequence.Traverse({ forge: true }));
  const builderOptions = (0, import_forge.MergePackages)(packages, import_forge.QuerySequence.Traverse({ builder: true }));
  const results = new import_forge.Result();
  const totalTime = Date.now();
  const manifest = [];
  {
    if (process.env.verbose == import_Core.Verbosity.all) console.blue(`starting index.d.ts >>>`);
    const { files, name } = forgeOptions;
    const typesPackage = new import_forge.ArgumentPackage({ validations });
    typesPackage.add({ ...builderOptions, bundled: import_Core.Bundle.merge }, { builder: true });
    typesPackage.add({ files, name, out: "./index.d.ts" }, { forge: true });
    const typesResult = await (0, import_TypesBuilder.$BuildTypes)([typesPackage]);
    if (typesResult.success === false) return results.merge(typesResult).reject();
    const { code, path } = typesResult.or({ code: true }).first;
    results.add({ code, path }, { code: true, types: true });
    manifest.push("./index.d.ts");
    const stats = typesResult.or({ stats: true }).first;
    results.add(stats, { stats: true, types: true, npm: true });
    console.blue(`index.d.ts compiled in: ${(0, import_Core.FormatElapsedTime)(stats.elapsed)} s`);
  }
  {
    const startTime = Date.now();
    const { files, root, lib, ext } = forgeOptions;
    const formats = [["cjs", "./index.js", ext.cjs], ["esm", "./index.mjs", ext.esm]];
    const bundled = builderOptions.bundled;
    for (const [format, index, ext2] of formats) {
      const library = new import_LibraryBuilder.LibraryBuilder();
      if (bundled == import_Core.Bundle.mangle_static || bundled == import_Core.Bundle.mangle_random || bundled == import_Core.Bundle.preserve) {
        const libraryExportPackage = new import_forge.ArgumentPackage({ validations });
        libraryExportPackage.add({
          sources: {
            files,
            root
          },
          formats,
          files,
          root,
          lib,
          ext: ext2,
          index
        }, { forge: true });
        libraryExportPackage.add({ ...builderOptions, format, bundled }, { builder: true });
        libraryExportPackage.validations = (0, import_forge.MergeValidations)(packages);
        const libraryResults = await library.$export([libraryExportPackage]).catch(function(error) {
          console.parse("-".repeat(20), "\n" + error.message, "\n" + "-".repeat(20));
          process.exit();
        });
        if (libraryResults.success === false) return results.merge(libraryResults).reject();
        for (const [component, attributes] of libraryResults.or({ code: true })) {
          let { code, path } = component;
          manifest.push(path);
          const size = (0, import_Core.CalcCodeSize)(code);
          const elapsed2 = startTime - Date.now();
          if (attributes.index === true) {
            results.add({ code, path }, { code: true, library: true, index: true, format });
            results.add({ elapsed: elapsed2, size }, { stats: true, library: true, index: true, format });
          } else {
            results.add({ code, path }, { code: true, library: true, dependency: true, format });
            results.add({ elapsed: elapsed2, size }, { stats: true, library: true, dependency: true, format });
          }
        }
      } else if (builderOptions.bundled == import_Core.Bundle.merge) {
        const code = await library.$bundle(packages);
        results.add({ code, path: index }, { code: true, library: true, index: true, format });
        manifest.push(index);
      } else {
        throw new Error(`Invalid bundle option: ${builderOptions.bundled}`);
      }
    }
    const elapsed = Date.now() - startTime;
    results.add({ elapsed }, { stats: true, library: true, npm: true });
    results.add({ manifest }, { manifest: true });
    console.blue(`library compiled in: ${(0, import_Core.FormatElapsedTime)(elapsed)}s`);
  }
  if (forgeOptions.bin) {
    builderOptions.format = "cjs";
    builderOptions.platform = "node";
    const npxResults = await (0, import_Core.$Transform)(forgeOptions.bin, builderOptions);
    if (npxResults.success === false) return results.merge(npxResults).reject();
    let { code } = npxResults.or({ code: true }).first;
    results.add({ code, path: "./bin.js" }, { code: true, npx: true });
    const stats = npxResults.or({ stats: true }).first;
    results.add(stats, { stats: true, npx: true, npm: true });
    console.blue("bin.js compiled in:", (0, import_Core.FormatElapsedTime)(stats.elapsed), "s");
  }
  console.blue("NPM package compiled in", (0, import_Core.FormatElapsedTime)(Date.now() - totalTime), "s");
  return results;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $BuildNPM
});
