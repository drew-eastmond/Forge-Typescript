#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/build/npm/NPMBuilder.ts
import { ArgumentPackage, MergePackages, MergeValidations, QuerySequence, Result } from "@onyx-ignition/forge";
import { $Transform, Bundle, CalcCodeSize, FormatElapsedTime, Verbosity, VerifyPackages } from "./fda017fd934f5aa37610fc2a70164a5e.mjs";
import { LibraryBuilder } from "./e1ea2b1d17e55c7011350ffc1464ef0e.mjs";
import { $BuildTypes } from "./71c2299d17c8b0e03c17edc196a9ee0a.mjs";
async function $BuildNPM(packages) {
  VerifyPackages(packages, {
    "NPM packaging validation failed": QuerySequence.And({ validate: true, npm: true }),
    "NPM packaging sanitation failed": QuerySequence.And({ sanitize: true, npm: true })
  });
  const validations = MergeValidations(packages);
  const forgeOptions = MergePackages(packages, QuerySequence.Traverse({ forge: true }));
  const builderOptions = MergePackages(packages, QuerySequence.Traverse({ builder: true }));
  const results = new Result();
  const totalTime = Date.now();
  const manifest = [];
  {
    if (process.env.verbose == Verbosity.all) console.blue(`starting index.d.ts >>>`);
    const { files, name } = forgeOptions;
    const typesPackage = new ArgumentPackage({ validations });
    typesPackage.add({ ...builderOptions, bundled: Bundle.merge }, { builder: true });
    typesPackage.add({ files, name, out: "./index.d.ts" }, { forge: true });
    const typesResult = await $BuildTypes([typesPackage]);
    if (typesResult.success === false) return results.merge(typesResult).reject();
    const { code, path } = typesResult.or({ code: true }).first;
    results.add({ code, path }, { code: true, types: true });
    manifest.push("./index.d.ts");
    const stats = typesResult.or({ stats: true }).first;
    results.add(stats, { stats: true, types: true, npm: true });
    console.blue(`index.d.ts compiled in: ${FormatElapsedTime(stats.elapsed)} s`);
  }
  {
    const startTime = Date.now();
    const { files, root, lib, ext } = forgeOptions;
    const formats = [["cjs", "./index.js", ext.cjs], ["esm", "./index.mjs", ext.esm]];
    const bundled = builderOptions.bundled;
    for (const [format, index, ext2] of formats) {
      const library = new LibraryBuilder();
      if (bundled == Bundle.mangle_static || bundled == Bundle.mangle_random || bundled == Bundle.preserve) {
        const libraryExportPackage = new ArgumentPackage({ validations });
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
        libraryExportPackage.validations = MergeValidations(packages);
        const libraryResults = await library.$export([libraryExportPackage]).catch(function(error) {
          console.parse("-".repeat(20), "\n" + error.message, "\n" + "-".repeat(20));
          process.exit();
        });
        if (libraryResults.success === false) return results.merge(libraryResults).reject();
        for (const [component, attributes] of libraryResults.or({ code: true })) {
          let { code, path } = component;
          manifest.push(path);
          const size = CalcCodeSize(code);
          const elapsed2 = startTime - Date.now();
          if (attributes.index === true) {
            results.add({ code, path }, { code: true, library: true, index: true, format });
            results.add({ elapsed: elapsed2, size }, { stats: true, library: true, index: true, format });
          } else {
            results.add({ code, path }, { code: true, library: true, dependency: true, format });
            results.add({ elapsed: elapsed2, size }, { stats: true, library: true, dependency: true, format });
          }
        }
      } else if (builderOptions.bundled == Bundle.merge) {
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
    console.blue(`library compiled in: ${FormatElapsedTime(elapsed)}s`);
  }
  if (forgeOptions.bin) {
    builderOptions.format = "cjs";
    builderOptions.platform = "node";
    const npxResults = await $Transform(forgeOptions.bin, builderOptions);
    if (npxResults.success === false) return results.merge(npxResults).reject();
    let { code } = npxResults.or({ code: true }).first;
    results.add({ code, path: "./bin.js" }, { code: true, npx: true });
    const stats = npxResults.or({ stats: true }).first;
    results.add(stats, { stats: true, npx: true, npm: true });
    console.blue("bin.js compiled in:", FormatElapsedTime(stats.elapsed), "s");
  }
  console.blue("NPM package compiled in", FormatElapsedTime(Date.now() - totalTime), "s");
  return results;
}
export {
  $BuildNPM
};
