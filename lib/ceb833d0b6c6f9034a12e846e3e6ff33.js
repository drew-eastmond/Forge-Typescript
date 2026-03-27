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

// ../Forge-Typescript-Source/src/ts/build/npm/NPMPackageSanitize.ts
var NPMPackageSanitize_exports = {};
__export(NPMPackageSanitize_exports, {
  PackageSanitizeNPM: () => PackageSanitizeNPM
});
module.exports = __toCommonJS(NPMPackageSanitize_exports);
var import_forge = require("@onyx-ignition/forge");
var import_Core = require("./02e263f9546d01d4d379d2a91cf19496.js");
var import_TypesPackageSanitize = require("./fdf6fd6f5c6c645b25dbfb7686c5f961.js");
var import_LibraryPackageSanitize = require("./4c8e95ab119caa3619f68f6b1feebe9a.js");
var PackageSanitizeNPM = class extends import_forge.AsyncArgumentPackageSanitize {
  constructor() {
    super({
      default: {
        component: {
          lib: "./lib",
          ext: {
            cjs: ".js",
            esm: ".mjs"
          },
          package_json: false
        },
        attributes: { npm: true, forge: true }
      },
      sanitizers: [
        new import_TypesPackageSanitize.TypesPackageSanitize(),
        new import_LibraryPackageSanitize.LibraryPackageSanitize()
      ]
    });
  }
  async $sanitize(component, attributes) {
    await super.$sanitize(component, attributes);
    if (component instanceof Promise) component = await component;
    for (const [name, value] of Object.entries(component)) {
      switch (name) {
        case "files":
          component.files = await (0, import_Core.$SanitizeGlob)(value);
          break;
        case "bin":
          let buildValues = value;
          let entry = buildValues.entry;
          let contents = buildValues.contents ?? await import_forge.ForgeFile.$ReadDecoded(entry);
          let root = buildValues.root ?? import_forge.ForgePath.Parse(entry).dir;
          component.bin = {
            contents,
            root,
            entry
          };
          break;
      }
    }
    return component;
  }
  validate(packaging) {
    super.validate(packaging);
    if (packaging.validations.errors.length == 0) packaging.validations.add(new import_forge.ArgumentValidationSuccess(`Package sanitized for NPM`), { npm: true, sanitize: true });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PackageSanitizeNPM
});
