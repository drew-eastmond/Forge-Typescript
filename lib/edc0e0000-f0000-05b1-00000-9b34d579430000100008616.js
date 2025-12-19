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

// ../Forge-Typescript-Source/src/ts/build/TypesBuilder.ts
var TypesBuilder_exports = {};
__export(TypesBuilder_exports, {
  $BuildTypes: () => $BuildTypes,
  ParseTypeErrors: () => ParseTypeErrors
});
module.exports = __toCommonJS(TypesBuilder_exports);
var import_forge = require("@onyx-ignition/forge");
var import_typescript = require("typescript");
var import_Core = require("./7dd00000-0000-3afb-0000-9b34d5794200000000d7f0.js");
async function $BuildTypes(entry, packageName, buildOptions) {
  const errors = [];
  if (entry.files) {
    for (const file of entry.files) if (await import_forge.ForgeFile.$FileExist(file) === false) errors.push(`Entry file: "${file}" is invalid`);
  } else {
    errors.push(`Entry { files } is not an array of vaild files`);
  }
  const result = new import_forge.Result();
  const fileNames = entry.files;
  const compilerOptions = {
    allowJs: true,
    declaration: true,
    emitDeclarationOnly: true
  };
  const createdFiles = {};
  const host = (0, import_typescript.createCompilerHost)(compilerOptions);
  host.writeFile = (fileName, contents) => createdFiles[fileName] = contents;
  const program = (0, import_typescript.createProgram)(fileNames, compilerOptions, host);
  program.emit();
  const codeSegments = ["\n", `// @ts-nocheck

declare module "${packageName}" {
`];
  if (buildOptions.bundled === "merge") {
    for (const [filename, contents] of Object.entries(createdFiles)) {
      const code2 = contents.replace("export {};", "").replace(/\s*import.+?["'`].+?["'`];\s*/g, "\n").replace(/declare\s+/g, "").split("\n").map((line) => `	${line}`).join("\n");
      codeSegments.push(code2);
    }
    codeSegments.push("\n}");
    const code = await (0, import_Core.$ApplyWriteTransforms)(codeSegments.join("\n"), { transform: { write: [] } });
    result.add({ code }, { code: true });
  } else if (buildOptions.bundled == "preserve") {
    throw new Error(`not yet implemented bundled == "preserve"`);
  }
  return result.resolve();
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
