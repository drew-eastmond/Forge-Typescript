#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/build/TypesBuilder.ts
import { ForgeFile, Result } from "@onyx-ignition/forge";
import { createCompilerHost, createProgram } from "typescript";
import { $ApplyWriteTransforms } from "./a43b20000-30000-9ba4-40000-9b34d579780000500001126.mjs";
async function $BuildTypes(entry, packageName, buildOptions) {
  const errors = [];
  if (entry.files) {
    for (const file of entry.files) if (await ForgeFile.$FileExist(file) === false) errors.push(`Entry file: "${file}" is invalid`);
  } else {
    errors.push(`Entry { files } is not an array of vaild files`);
  }
  const result = new Result();
  const fileNames = entry.files;
  const compilerOptions = {
    allowJs: true,
    declaration: true,
    emitDeclarationOnly: true
  };
  const createdFiles = {};
  const host = createCompilerHost(compilerOptions);
  host.writeFile = (fileName, contents) => createdFiles[fileName] = contents;
  const program = createProgram(fileNames, compilerOptions, host);
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
    const code = await $ApplyWriteTransforms(codeSegments.join("\n"), { transform: { write: [] } });
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
export {
  $BuildTypes,
  ParseTypeErrors
};
