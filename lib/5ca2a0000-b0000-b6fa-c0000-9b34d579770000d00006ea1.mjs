#! /usr/bin/env node

var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// ../Forge-Typescript-Source/src/ts/bin.ts
import { DecodeString, ForgeFile, ForgePath, ForgeWebSocket } from "@onyx-ignition/forge";
import { FetchArguments } from "./f0c220000-30000-3a38-40000-9b34d57978000050000dd8f.mjs";
import { BuildClient } from "./5a22e0000-f0000-cc05-00000-9b34d57978000010000d131.mjs";
import { $Build, $Clean, $Transform, $UnWrapWriteTransforms, BuilderConfig } from "./a43b20000-30000-9ba4-40000-9b34d579780000500001126.mjs";
import { LibraryBuilder } from "./0834e0000-f0000-ea4b-00000-9b34d57978000010000fc18.mjs";
import { $BuildNPM } from "./846120000-30000-f3be-40000-9b34d5797800005000071b3.mjs";
import { $BuildTypes } from "./274160000-70000-902c-80000-9b34d57978000090000e343.mjs";
import { $BuildBundle, $ClientBuildTypes, $OutputCompiledCode, $ResetBuilder, BuildLibrary } from "./dec360000-70000-e3c4-80000-9b34d57978000090000239c.mjs";
var path = __require("path");
var fs = __require("fs");
var $fs = __require("node:fs/promises");
var { spawn, fork, exec, execSync } = __require("child_process");
var application;
(async function() {
  const args = FetchArguments();
  try {
    args.compile();
    console.log([...args]);
  } catch (error) {
    console.error("The following errors were found:");
    console.error(error["message"]);
    process.exit(1);
  }
  const KEY = args.last("key");
  const OUT = args.last("out");
  const PLATFORM = args.last(/^platform$/i);
  const FORMAT = args.last(/^format$/i);
  const BUNDLE = args.last(/^bundle$/i);
  const WRITE = args.last(/^write$/i);
  const MOUNT = args.last(/^mount$/);
  const BUILD = args.last(/^b$|^forge-typescript\/build$/i);
  const PERSIST = args.last(/^forge-typescript\/persist$/i);
  const INLINE = args.last(/^forge-typescript\/inline$/i);
  const WATCH = args.last(/^forge-typescript\/watch$/i);
  const LISTEN = args.last(/^forge-typescript\/listen$/g);
  const LIBRARY = args.last(/^forge-typescript\/library$/i);
  const TYPES = args.last(/^forge-typescript\/types$/i);
  const CLEAN = args.last(/^clean$|^forge-typescript\/clean$/i);
  const NPM = args.last(/^forge-typescript\/npm$/i);
  const VERBOSE = args.last(/^verbose$/);
  function ProcessWarnignsAndErrors(warnings, errors) {
    if (VERBOSE == "all") {
      console.parse("<yellow>Warnings:");
      for (const warning of warnings) console.parse(`	<cyan>${warning.replace(/<warning>/g, "<yellow>").replace(/<\/warning>/g, "</yellow>")}`);
      console.parse("<red>Errors:");
      for (const error of errors) console.parse(`	<cyan>${error.replace(/<error>/g, "<red>").replace(/<\/error>/g, "</red>")}`);
    }
    if (errors.length) process.exit();
  }
  if (CLEAN) await $Clean();
  if (PERSIST || WATCH || LISTEN) {
    console.parse("<red>Persist STARTED");
    application = new BuildClient({ race: { ".*": 500 } });
    if (LISTEN) {
      const server = await application.$listen(LISTEN);
    }
  }
  const builderOptions = await BuilderConfig.$From({ args });
  if (TYPES) {
    const name = args.last(/^name$/i);
    const files = await args.$walk(/^files$/, { ignores: builderOptions.ignores });
    const errors = [];
    if (name === void 0) errors.push(`arguments for <error>{ name }</error> is needed for assigning the namespace files`);
    if (files === void 0 || files.length == 0) errors.push(`arguments for <error>{ files }</error> has no files assigned`);
    ProcessWarnignsAndErrors(errors, []);
    builderOptions.bundled = "merge";
    builderOptions.write = "memory";
    const result = await $BuildTypes({ files }, name, builderOptions);
    ProcessBuilderResult(result, [`Error bundling d.ts to ${OUT} with the following errors:`]);
    const { code } = result.or({ code: true }).first;
    await $OutputCompiledCode(code, OUT);
  } else if (BUILD) {
    const entryFile = args.last(/^in$/);
    const format = args.last(/^format$/);
    const platform = args.last(/^platform$/);
    const errors = [];
    const warnings = [];
    if (entryFile === void 0) errors.push(`arguments for <error>{ name }</error> is require for entry file`);
    if (format === void 0) warnings.push(`arguments for <warning>{ format }</warning> is optional and will default to "cjs"`);
    if (platform === void 0) warnings.push(`arguments for <warning>{ platform }</warning> is optional and will default to "cjs"`);
    if (platform === void 0) warnings.push(`arguments for <warning>{ external }</warning> is optional but recommends using "json.keys://package.json::dependencies"`);
    ProcessWarnignsAndErrors(warnings, errors);
    await $Build(entryFile, new BuilderConfig(builderOptions)).then(function(result) {
      if (result.success === false) throw new Error(`Error compiling`);
      const { code } = result.or({ code: true }).first;
      return $OutputCompiledCode(code, OUT);
    }).catch(CatchCompiledError);
  } else if (INLINE) {
    const inlineFile = args.last(/^script/i);
    const contents = (await ForgeFile.$ReadDecoded(inlineFile)).replace(/\s*import(\s+\{\s*(?<components>.+?)\s*\}).+?["'`](?<file>@onyx-ignition[\/\\]forge-core)["'`];\s*/g, "\n");
    builderOptions.bundled = "preserve";
    builderOptions.platform = "node";
    builderOptions.treeShaking = true;
    builderOptions.ignores = await ForgeFile.$Walk("../Forge-Typescript-Source/src/ts/formless", { resolve: true });
    const result = await $Transform({ source: inlineFile, root: "./", contents }, builderOptions, { cache: false });
    if (result.success == false) {
      console.red("Errors found");
      for (const [error, attributes] of result) console.red(error);
    }
    const { code } = result.or({ code: true }).first;
    await ForgeFile.$Write("./dump.js", code);
    process["eval"](code);
  } else if (LIBRARY) {
    const join = args.last(/^join$/i) || "./lib/";
    const root = args.last(/^root$/i);
    const files = await args.$walk(/^file$/i, { ignores: builderOptions.ignores });
    const ext = args.last(/^ext$/i) || ".js";
    const library = new LibraryBuilder();
    if (builderOptions.bundled == "mangle" || builderOptions.bundled == "preserve") {
      if (OUT === void 0) throw new Error(`--out-- parameter missing`);
      const result = await library.$export({ files, root }, builderOptions, { join, ext });
      if (result.success == false) {
        for (const [component, attributes] of result) {
          console.red(component);
        }
        throw new Error(`Error transforming inline file`);
      }
      const outParsed = ForgePath.Parse(OUT);
      for (const [component, attributes] of result.or({ code: true })) {
        const { code, path: path2 } = component;
        const target = path2 == "{index}" ? ForgePath.Resolve(OUT) : ForgePath.Resolve(outParsed.dir, path2);
        await $OutputCompiledCode(code, target);
      }
    } else if (builderOptions.bundled == "merge") {
      const code = await library.$bundle({ files, root }, builderOptions);
      await $OutputCompiledCode(code, OUT);
    } else {
      throw new Error(`Invalid bundle option: ${builderOptions.bundled}`);
    }
  } else if (NPM) {
    if (args.last(/^bundled$/) === void 0) builderOptions.bundled = "mangle";
    const files = await args.$walk(/^(files)$/, { ignores: builderOptions.ignores });
    const createPackageJSON = args.last(/^package$/);
    const createManifest = args.last(/^manifest$/);
    const bin = args.attributes(/^bin$/i);
    const errors = [];
    const warnings = [];
    let queryOutDir;
    if (OUT === void 0) {
      errors.push(`arguments for <cyan>{ out }</cyan> is missing or invalid`);
    } else {
      queryOutDir = await ForgeFile.$DirectoryExists(OUT) ? OUT : ForgePath.Parse(OUT).dir;
      if (await ForgeFile.$DirectoryExists(queryOutDir) === false) warnings.push(`arguments for <cyan>{ out }</cyan> is a file. It was resolve to the parent directory`);
    }
    const outDir = queryOutDir;
    const library = args.attributes(/^library$/);
    if (library === void 0) errors.push(`arguments for <error>{ library }</error> is required and missing or invalid`);
    if (library?.root === void 0) errors.push(`arguments for <error>{ library.root }</error> is required is missing`);
    if (library?.name === void 0) errors.push(`arguments for <error>{ library.name }</error> is missing"`);
    if (library?.join === void 0) warnings.push(`arguments for <warning>{ library.join }</warning> is optional and will default to "./lib/"`);
    if (library?.ext?.cjs === void 0 || library?.ext.cjs === void 0) warnings.push(`arguments for <warning>{ library.ext.cjs }</warning> is optional and will default to cjs = ".js"`);
    if (library?.ext?.esm === void 0 || library?.ext.esm === void 0) warnings.push(`arguments for <warning>{ library.ext.esm }</warning> is optional and will default to esm = ".mjs"`);
    if (bin) {
      if (await ForgeFile.$FileExist(bin.entry) === false) errors.push(`arguments for <error>{ bin.entry }</error> does not exist`);
    } else {
      errors.push(`arguments for <cyan>{ bin.entry }</cyan> is missing or invalid`);
    }
    ProcessWarnignsAndErrors(warnings, errors);
    const { root, join, name } = { join: "./lib", ...library };
    const ext = {
      cjs: library.ext?.cjs || ".js",
      esm: library.ext?.esm || ".mjs"
    };
    const BinEntryParsed = ForgePath.Parse(bin.entry);
    const contents = await ForgeFile.$ReadDecoded(bin.entry);
    const results = await $BuildNPM(builderOptions, { contents, root: BinEntryParsed.dir, source: bin.entry }, { files, root, join, name, ext });
    {
      const { code } = results.and({ types: true, code: true }).first;
      const target = ForgePath.Resolve(outDir, "./index.d.ts");
      await $OutputCompiledCode(code, target);
    }
    {
      const { code } = results.and({ npx: true, code: true }).first;
      const target = ForgePath.Resolve(outDir, "./bin.js");
      await $OutputCompiledCode(code, target);
    }
    for (const [component, attributes] of results.or({ code: true }).not({ types: true, npx: true })) {
      const { code, path: path2 } = component;
      const target = ForgePath.Resolve(outDir, path2);
      await $OutputCompiledCode(code, target);
    }
    {
      if (createPackageJSON) {
        const packageJSON = {
          "name": name,
          "author": "",
          "version": "1.0.0",
          "keywords": [name],
          "description": "",
          "bin": "./bin.js",
          "main": "./index.js",
          "exports": {
            ".": {
              "types": "./index.d.ts",
              "require": "./index.js",
              "import": "./index.mjs"
            }
          },
          "scripts": {},
          "license": "ISC",
          "repository": {
            "type": "git",
            "url": ""
          },
          "dependencies": {}
        };
        const targetFile = ForgePath.Resolve(outDir, `package.json`);
        await $OutputCompiledCode(JSON.stringify(packageJSON), targetFile);
      }
    }
    {
      if (createManifest) {
      }
    }
  }
})();
function ProcessBuilderResult(result, errorHeaders) {
  if (result.success == false) {
    if (errorHeaders) for (const error of errorHeaders) console.parse(error);
    for (const [component, attributes] of result.or({ error: true })) console.parse("	", component.error);
    process.exit(1);
  }
}
async function CatchCompiledError(error) {
  process.exit(1);
}
