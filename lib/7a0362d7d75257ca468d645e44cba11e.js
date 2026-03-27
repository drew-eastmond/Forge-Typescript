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

// ../Forge-Typescript-Source/src/ts/Core.ts
var Core_exports = {};
__export(Core_exports, {
  $OutputCompiledCode: () => $OutputCompiledCode,
  $WalkSources: () => $WalkSources,
  GetEnviromentParams: () => GetEnviromentParams
});
module.exports = __toCommonJS(Core_exports);
var import_forge = require("@onyx-ignition/forge");
var import_Core = require("./02e263f9546d01d4d379d2a91cf19496.js");
function GetEnviromentParams() {
  return {
    DRY_RUN: /true/i.test(process.env.DRY_RUN),
    VERBOSITY: process.env.VERBOSITY ?? import_Core.Verbosity.all
  };
}
async function $WalkSources(source) {
  const sources = source.split(/\s*,\s*/);
  const files = [];
  for (const folder of sources) files.push(...await import_forge.ForgeFile.$Walk(folder));
  return files;
}
async function $OutputCompiledCode(code, outFile) {
  if (GetEnviromentParams().DRY_RUN) {
    console.log("[DRY_RUN]", outFile, "written");
    return;
  }
  if (outFile) {
    await import_forge.ForgeFile.$Write(outFile, code, { recursive: true });
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $OutputCompiledCode,
  $WalkSources,
  GetEnviromentParams
});
