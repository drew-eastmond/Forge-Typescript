#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/Core.ts
import { ForgeFile } from "@onyx-ignition/forge";
import { Verbosity } from "./fda017fd934f5aa37610fc2a70164a5e.mjs";
function GetEnviromentParams() {
  return {
    DRY_RUN: /true/i.test(process.env.DRY_RUN),
    VERBOSITY: process.env.VERBOSITY ?? Verbosity.all
  };
}
async function $WalkSources(source) {
  const sources = source.split(/\s*,\s*/);
  const files = [];
  for (const folder of sources) files.push(...await ForgeFile.$Walk(folder));
  return files;
}
async function $OutputCompiledCode(code, outFile) {
  if (GetEnviromentParams().DRY_RUN) {
    console.log("[DRY_RUN]", outFile, "written");
    return;
  }
  if (outFile) {
    await ForgeFile.$Write(outFile, code, { recursive: true });
  } else {
    await new Promise(function(resolve, reject) {
      if (code instanceof ArrayBuffer) {
        process.stdout.write(new Uint8Array(code), resolve);
      } else {
        process.stdout.write(code, resolve);
      }
    });
  }
}
export {
  $OutputCompiledCode,
  $WalkSources,
  GetEnviromentParams
};
