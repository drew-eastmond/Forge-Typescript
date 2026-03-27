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

// ../Forge-Typescript-Source/src/ts/build/types/TypesPackageSanitize.ts
var TypesPackageSanitize_exports = {};
__export(TypesPackageSanitize_exports, {
  TypesPackageSanitize: () => TypesPackageSanitize
});
module.exports = __toCommonJS(TypesPackageSanitize_exports);
var import_forge = require("@onyx-ignition/forge");
var import_Core = require("./02e263f9546d01d4d379d2a91cf19496.js");
var TypesPackageSanitize = class extends import_forge.AsyncArgumentPackageSanitize {
  async $sanitize(component, attributes) {
    await super.$sanitize(component, attributes);
    if (component instanceof Promise) component = await component;
    for (const [name, value] of Object.entries(component)) {
      switch (name) {
        case "files":
          component.files = await (0, import_Core.$SanitizeGlob)(value);
          break;
      }
    }
    return component;
  }
  validate(packaging) {
    super.validate(packaging);
    if (packaging.validations.errors.length == 0) packaging.validations.add(new import_forge.ArgumentValidationSuccess(`Package sanitized for Types`), { types: true, sanitize: true });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypesPackageSanitize
});
