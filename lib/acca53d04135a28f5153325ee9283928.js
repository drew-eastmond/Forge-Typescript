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

// ../Forge-Typescript-Source/src/ts/build/types/TypesPackageValidate.ts
var TypesPackageValidate_exports = {};
__export(TypesPackageValidate_exports, {
  TypesPackageValidate: () => TypesPackageValidate
});
module.exports = __toCommonJS(TypesPackageValidate_exports);
var import_forge = require("@onyx-ignition/forge");
var TypesPackageValidate = class extends import_forge.AsyncArgumentPackageValidate {
  async $flush(query, validations) {
    await super.$flush(query, validations);
    const params = (0, import_forge.MergeAttributes)(await Promise.all(query.or({ forge: import_forge.Intersects }).all));
    const { files, name } = params;
    const cause = params;
    if (files === void 0) validations.add(
      new import_forge.ArgumentValidationError(`arguments for <error>{ files }</error> is undefined`, { cause }),
      { files: true, ...import_forge.ArgumentValidationErrorAttributes }
    );
    if (name === void 0) validations.add(
      new import_forge.ArgumentValidationError(`arguments for <error>{ name }</error> is undefined"`, { cause }),
      { name: true, ...import_forge.ArgumentValidationErrorAttributes }
    );
    if (validations.errors.length === 0) validations.add(
      new import_forge.ArgumentValidationSuccess(`Package validated for Types`),
      { types: true, validate: true }
    );
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypesPackageValidate
});
