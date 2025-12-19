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

// ../Forge-Typescript-Source/src/ts/Build-Utils.ts
var Build_Utils_exports = {};
__export(Build_Utils_exports, {
  FetchArguments: () => FetchArguments
});
module.exports = __toCommonJS(Build_Utils_exports);
var import_forge = require("@onyx-ignition/forge");
function FetchArguments() {
  const cliArguments = new import_forge.CLIArguments();
  cliArguments.import([
    ["drew", { so: "much crap" }],
    ["alias", [["files", []], ["directories", {}]]]
  ]);
  cliArguments.add(/^in$/, {
    required: true,
    validate: (value, args) => {
      return args.some(([name, value2]) => /in/i.test(name));
    },
    error: `\x1B[31;1mMissing or incorrect \x1B[36;1m--in--\x1B[0m\x1B[31;1m argument\x1B[0m`
  }).add("out", {
    // required: true,
    /* validate: (value: unknown, args: [string, unknown][]): boolean => {
    
                    return Object.hasOwn(args, "out");
    
                }, */
    error: `\x1B[31;1mMissing or incorrect \x1B[36;1m--out--\x1B[0m\x1B[31;1m argument\x1B[0m`
  }).add(/^format$/i, {
    default: "cjs",
    validate: (value, args) => {
      switch (value) {
        case "cjs":
        case "esm":
        case "iife":
          return true;
      }
      return false;
    },
    error: `\x1B[31;1mMissing or incorrect \x1B[36;1m--format--\x1B[0m\x1B[31;1m argument\x1B[0m`
  }).add("bundled", {
    default: true
  }).add("platform", {
    default: "neutral",
    validate: (value, args) => {
      switch (value) {
        case "node":
        case "neutral":
        case "browser":
          return true;
      }
      return false;
    }
  }).add("meta", {
    default: true
  }).add("watch", {
    default: false
  }).add("external", {
    default: [],
    sanitize: (value, args) => {
      if (value === void 0) return [];
      if (value instanceof Array) return value;
      return String(value).split(/,/g);
    }
  }).add(/verbose/i, {
    default: [],
    sanitize: (value, args) => {
      if (value === void 0) return [];
      if (value instanceof Array) return value;
      return String(value).split(/,/g);
    }
  }).add(/minify/i, {
    default: false,
    sanitize: (value, args) => {
      return value === true ? true : false;
    }
  }).add(/obfuscate/i, {
    default: false
  });
  return cliArguments;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FetchArguments
});
