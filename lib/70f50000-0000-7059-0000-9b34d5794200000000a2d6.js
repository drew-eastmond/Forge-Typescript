#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/bin.ts
var import_forge = require("@onyx-ignition/forge");
var import_Build_Utils = require("./59a6a0000-b0000-b531-c0000-9b34d579430000d00003f8f.js");
var import_BuildClient = require("./44280000-0000-604e-0000-9b34d57942000000004057.js");
var import_Core = require("./7dd00000-0000-3afb-0000-9b34d5794200000000d7f0.js");
var import_LibraryBuilder = require("./d8ec60000-70000-1686-80000-9b34d579430000900006f71.js");
var import_NPMBuilder = require("./37e4a0000-b0000-ba94-c0000-9b34d579430000d00006274.js");
var import_TypesBuilder = require("./edc0e0000-f0000-05b1-00000-9b34d579430000100008616.js");
var import_client = require("./4759e0000-f0000-3727-00000-9b34d579440000100007818.js");
var path = require("path");
var fs = require("fs");
var $fs = require("node:fs/promises");
var { spawn, fork, exec, execSync } = require("child_process");
var application;
(async function() {
  const args = (0, import_Build_Utils.FetchArguments)();
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
  if (CLEAN) await (0, import_Core.$Clean)();
  if (PERSIST || WATCH || LISTEN) {
    console.parse("<red>Persist STARTED");
    application = new import_BuildClient.BuildClient({ race: { ".*": 500 } });
    if (LISTEN) {
      const server = await application.$listen(LISTEN);
    }
  }
  const builderOptions = await import_Core.BuilderConfig.$From({ args });
  if (TYPES) {
    const name = args.last(/^name$/i);
    const files = await args.$walk(/^files$/, { ignores: builderOptions.ignores });
    const errors = [];
    if (name === void 0) errors.push(`arguments for <error>{ name }</error> is needed for assigning the namespace files`);
    if (files === void 0 || files.length == 0) errors.push(`arguments for <error>{ files }</error> has no files assigned`);
    ProcessWarnignsAndErrors(errors, []);
    builderOptions.bundled = "merge";
    builderOptions.write = "memory";
    const result = await (0, import_TypesBuilder.$BuildTypes)({ files }, name, builderOptions);
    ProcessBuilderResult(result, [`Error bundling d.ts to ${OUT} with the following errors:`]);
    const { code } = result.or({ code: true }).first;
    await (0, import_client.$OutputCompiledCode)(code, OUT);
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
    await (0, import_Core.$Build)(entryFile, new import_Core.BuilderConfig(builderOptions)).then(function(result) {
      if (result.success === false) throw new Error(`Error compiling`);
      const { code } = result.or({ code: true }).first;
      return (0, import_client.$OutputCompiledCode)(code, OUT);
    }).catch(CatchCompiledError);
  } else if (INLINE) {
    const inlineFile = args.last(/^script/i);
    const contents = (await import_forge.ForgeFile.$ReadDecoded(inlineFile)).replace(/\s*import(\s+\{\s*(?<components>.+?)\s*\}).+?["'`](?<file>@onyx-ignition[\/\\]forge-core)["'`];\s*/g, "\n");
    builderOptions.bundled = "preserve";
    builderOptions.platform = "node";
    builderOptions.treeShaking = true;
    builderOptions.ignores = await import_forge.ForgeFile.$Walk("../Forge-Typescript-Source/src/ts/formless", { resolve: true });
    const result = await (0, import_Core.$Transform)({ source: inlineFile, root: "./", contents }, builderOptions, { cache: false });
    if (result.success == false) {
      console.red("Errors found");
      for (const [error, attributes] of result) console.red(error);
    }
    const { code } = result.or({ code: true }).first;
    await import_forge.ForgeFile.$Write("./dump.js", code);
    process["eval"](code);
  } else if (LIBRARY) {
    const join = args.last(/^join$/i) || "./lib/";
    const root = args.last(/^root$/i);
    const files = await args.$walk(/^file$/i, { ignores: builderOptions.ignores });
    const ext = args.last(/^ext$/i) || ".js";
    const library = new import_LibraryBuilder.LibraryBuilder();
    if (builderOptions.bundled == "mangle" || builderOptions.bundled == "preserve") {
      if (OUT === void 0) throw new Error(`--out-- parameter missing`);
      const result = await library.$export({ files, root }, builderOptions, { join, ext });
      if (result.success == false) {
        for (const [component, attributes] of result) {
          console.red(component);
        }
        throw new Error(`Error transforming inline file`);
      }
      const outParsed = import_forge.ForgePath.Parse(OUT);
      for (const [component, attributes] of result.or({ code: true })) {
        const { code, path: path2 } = component;
        const target = path2 == "{index}" ? import_forge.ForgePath.Resolve(OUT) : import_forge.ForgePath.Resolve(outParsed.dir, path2);
        await (0, import_client.$OutputCompiledCode)(code, target);
      }
    } else if (builderOptions.bundled == "merge") {
      const code = await library.$bundle({ files, root }, builderOptions);
      await (0, import_client.$OutputCompiledCode)(code, OUT);
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
      queryOutDir = await import_forge.ForgeFile.$DirectoryExists(OUT) ? OUT : import_forge.ForgePath.Parse(OUT).dir;
      if (await import_forge.ForgeFile.$DirectoryExists(queryOutDir) === false) warnings.push(`arguments for <cyan>{ out }</cyan> is a file. It was resolve to the parent directory`);
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
      if (await import_forge.ForgeFile.$FileExist(bin.entry) === false) errors.push(`arguments for <error>{ bin.entry }</error> does not exist`);
    } else {
      errors.push(`arguments for <cyan>{ bin.entry }</cyan> is missing or invalid`);
    }
    ProcessWarnignsAndErrors(warnings, errors);
    const { root, join, name } = { join: "./lib", ...library };
    const ext = {
      cjs: library.ext?.cjs || ".js",
      esm: library.ext?.esm || ".mjs"
    };
    const BinEntryParsed = import_forge.ForgePath.Parse(bin.entry);
    const contents = await import_forge.ForgeFile.$ReadDecoded(bin.entry);
    const results = await (0, import_NPMBuilder.$BuildNPM)(builderOptions, { contents, root: BinEntryParsed.dir, source: bin.entry }, { files, root, join, name, ext });
    {
      const { code } = results.and({ types: true, code: true }).first;
      const target = import_forge.ForgePath.Resolve(outDir, "./index.d.ts");
      await (0, import_client.$OutputCompiledCode)(code, target);
    }
    {
      const { code } = results.and({ npx: true, code: true }).first;
      const target = import_forge.ForgePath.Resolve(outDir, "./bin.js");
      await (0, import_client.$OutputCompiledCode)(code, target);
    }
    for (const [component, attributes] of results.or({ code: true }).not({ types: true, npx: true })) {
      const { code, path: path2 } = component;
      const target = import_forge.ForgePath.Resolve(outDir, path2);
      await (0, import_client.$OutputCompiledCode)(code, target);
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
        const targetFile = import_forge.ForgePath.Resolve(outDir, `package.json`);
        await (0, import_client.$OutputCompiledCode)(JSON.stringify(packageJSON), targetFile);
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
