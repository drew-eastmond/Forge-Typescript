#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/build/types/TypesBuilder.ts
import { MergePackages, QuerySequence, Result } from "@onyx-ignition/forge";
import { createCompilerHost, createProgram } from "typescript";
import { $ApplyWriteTransforms, Bundle, CalcCodeSize, VerifyPackages } from "./fda017fd934f5aa37610fc2a70164a5e.mjs";
import { GetEnviromentParams } from "./78e417175b709158fb879bcea6099cbf.mjs";
async function $BuildTypes(packages) {
  VerifyPackages(packages, {
    "Types packaging validation failed": QuerySequence.And({ validate: true, types: true }),
    "Types packaging sanitation failed": QuerySequence.And({ sanitize: true, types: true })
  });
  const forgeOptions = MergePackages(packages, QuerySequence.Traverse({ forge: true }));
  const builderOptions = MergePackages(packages, QuerySequence.Traverse({ builder: true }));
  let { files, name, out } = forgeOptions;
  const { ignores } = builderOptions;
  files = files.filter((value) => ignores.includes(value));
  const startTime = Date.now();
  const result = new Result();
  if (GetEnviromentParams().DRY_RUN) {
    return result.add({ code: `console.log("DRY RUN $BuildTypes( ... )")`, path: "./index.d.ts" }, { code: true, types: true }).add({ elapsed: 0, size: 0 }, { stats: true, types: true }).resolve();
  }
  try {
    const compilerOptions = {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true
    };
    const createdFiles = {};
    const host = createCompilerHost(compilerOptions);
    host.writeFile = (fileName, contents) => createdFiles[fileName] = contents;
    const program = createProgram(files, compilerOptions, host);
    program.emit();
    const codeSegments = ["\n", `// @ts-nocheck

declare module "${name}" {
`];
    if (builderOptions.bundled === Bundle.merge || true) {
      for (const [filename, contents] of Object.entries(createdFiles)) {
        const code2 = contents.replace("export {};", "").replace(/\s*import.+?["'`].+?["'`];\s*/g, "\n").replace(/declare\s+/g, "").split("\n").map((line) => `	${line}`).join("\n");
        codeSegments.push(code2);
      }
      codeSegments.push("\n}");
      const { code } = await $ApplyWriteTransforms(codeSegments.join("\n"), { transform: { write: [] } });
      result.add({ code, path: out }, { code: true });
      const size = CalcCodeSize(code);
      const elapsed = Date.now() - startTime;
      result.add({ elapsed, size }, { stats: true, types: true });
    } else if (builderOptions.bundled == Bundle.preserve) {
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
export {
  $BuildTypes,
  ParseTypeErrors
};
