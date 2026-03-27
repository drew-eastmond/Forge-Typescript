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

// ../Forge-Typescript-Source/src/ts/build/library/LibraryPackageValidate.ts
var LibraryPackageValidate_exports = {};
__export(LibraryPackageValidate_exports, {
  LibraryPackageValidate: () => LibraryPackageValidate
});
module.exports = __toCommonJS(LibraryPackageValidate_exports);
var import_forge = require("@onyx-ignition/forge");
var LibraryPackageValidate = class extends import_forge.AsyncArgumentPackageValidate {
  async $flush(query, validations) {
    const forgeParams = (0, import_forge.MergeAttributes)(await Promise.all(query.or({ forge: import_forge.Intersects }).all));
    const { sources, files, root, lib, ext, index } = forgeParams;
    const cause = forgeParams;
    const errorAttributes = { ...import_forge.ArgumentValidationErrorAttributes, library: true };
    const warningAttributes = { ...import_forge.ArgumentValidationWarningAttributes, library: true };
    if (sources) {
      if (sources.files === void 0) validations.add(
        new import_forge.ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ source: { files } }</error> is undefined`, { cause }),
        { files: true, ...errorAttributes }
      );
      if (sources.root === void 0) validations.add(
        new import_forge.ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ source: { root } }</error> is is undefined`, { cause }),
        { root: true, ...errorAttributes }
      );
    } else {
      if (files === void 0) validations.add(
        new import_forge.ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ files }</error> is undefined`, { cause }),
        { files: true, ...errorAttributes }
      );
      if (root === void 0) validations.add(
        new import_forge.ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ root }</error> is is undefined`, { cause }),
        { root: true, ...errorAttributes }
      );
    }
    if (index === void 0) validations.add(
      new import_forge.ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ index }</error> is is undefined`, { cause }),
      { index: true, ...errorAttributes }
    );
    if (lib === void 0) validations.add(
      new import_forge.ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ lib }</warning> is optional and will default to <blue>"./lib/"`, { cause }),
      { lib: true, ...warningAttributes }
    );
    if (ext === void 0) validations.add(
      new import_forge.ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ ext }</warning> is optional and will default to = <blue>".js"`, { cause }),
      { ext: true, ...warningAttributes }
    );
    if (validations.errors.length === 0) validations.add(
      new import_forge.ArgumentValidationSuccess(`[${this.constructor.name}] package validated for Library`),
      { library: true, validate: true }
    );
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LibraryPackageValidate
});
