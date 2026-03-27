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

// ../Forge-Typescript-Source/src/ts/build/types/TypesBuilder.ts
var TypesBuilder_exports = {};
__export(TypesBuilder_exports, {
  $BuildTypes: () => $BuildTypes,
  ParseTypeErrors: () => ParseTypeErrors
});
module.exports = __toCommonJS(TypesBuilder_exports);
var import_forge = require("@onyx-ignition/forge");
var import_typescript = require("typescript");
var import_Core = require("./02e263f9546d01d4d379d2a91cf19496.js");
var import_Core2 = require("./7a0362d7d75257ca468d645e44cba11e.js");
async function $BuildTypes(packages) {
  (0, import_Core.VerifyPackages)(packages, {
    "Types packaging validation failed": import_forge.QuerySequence.And({ validate: true, types: true }),
    "Types packaging sanitation failed": import_forge.QuerySequence.And({ sanitize: true, types: true })
  });
  const forgeOptions = (0, import_forge.MergePackages)(packages, import_forge.QuerySequence.Traverse({ forge: true }));
  const builderOptions = (0, import_forge.MergePackages)(packages, import_forge.QuerySequence.Traverse({ builder: true }));
  let { files, name, out } = forgeOptions;
  const { ignores } = builderOptions;
  files = files.filter((value) => ignores.includes(value));
  const startTime = Date.now();
  const result = new import_forge.Result();
  if ((0, import_Core2.GetEnviromentParams)().DRY_RUN) {
    return result.add({ code: `console.log("DRY RUN $BuildTypes( ... )")`, path: "./index.d.ts" }, { code: true, types: true }).add({ elapsed: 0, size: 0 }, { stats: true, types: true }).resolve();
  }
  try {
    const compilerOptions = {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true
    };
    const createdFiles = {};
    const host = (0, import_typescript.createCompilerHost)(compilerOptions);
    host.writeFile = (fileName, contents) => createdFiles[fileName] = contents;
    const program = (0, import_typescript.createProgram)(files, compilerOptions, host);
    program.emit();
    const codeSegments = ["\n", `// @ts-nocheck

declare module "${name}" {
`];
    if (builderOptions.bundled === import_Core.Bundle.merge || true) {
      for (const [filename, contents] of Object.entries(createdFiles)) {
        const code2 = contents.replace("export {};", "").replace(/\s*import.+?["'`].+?["'`];\s*/g, "\n").replace(/declare\s+/g, "").split("\n").map((line) => `	${line}`).join("\n");
        codeSegments.push(code2);
      }
      codeSegments.push("\n}");
      const { code } = await (0, import_Core.$ApplyWriteTransforms)(codeSegments.join("\n"), { transform: { write: [] } });
      result.add({ code, path: out }, { code: true });
      const size = (0, import_Core.CalcCodeSize)(code);
      const elapsed = Date.now() - startTime;
      result.add({ elapsed, size }, { stats: true, types: true });
    } else if (builderOptions.bundled == import_Core.Bundle.preserve) {
      throw new Error(`not yet implemented bundled == "preserve"`);
    } else {
    }
    return result.resolve();
  } catch (error) {
    console.red(error);
    result.add({ error }, { error: true });
    return result.reject();
  }
}
function ParseTypeErrors(output, result) {
  let currentError;
  const lines = output.split("\n");
  for (const line of lines) {
    const errorExecArray = /^(?<location>..\/.+?)\((?<column>\d+),(?<row>\d+)\): error (?<id>\w+:) (?<message>.+)/.exec(line);
    if (errorExecArray) {
      if (currentError) result.add(currentError, { error: true });
      const { location, column, row, id, message } = errorExecArray.groups;
      currentError = {
        file: {
          location,
          column,
          row
        },
        message,
        id,
        hints: []
      };
      continue;
    }
    const hintExecArray = /^\s+(.+)/.exec(line);
    if (hintExecArray) currentError.hints.push(hintExecArray[1]);
  }
  if (currentError) result.add(currentError, { error: true });
  return result.reject();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $BuildTypes,
  ParseTypeErrors
});
