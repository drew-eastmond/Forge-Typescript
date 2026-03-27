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

// ../Forge-Typescript-Source/src/ts/build/npm/NPMPackageValidate.ts
var NPMPackageValidate_exports = {};
__export(NPMPackageValidate_exports, {
  NPMPackageValidate: () => NPMPackageValidate
});
module.exports = __toCommonJS(NPMPackageValidate_exports);
var import_forge = require("@onyx-ignition/forge");
var import_TypesPackageValidate = require("./acca53d04135a28f5153325ee9283928.js");
var import_LibraryPackageValidate = require("./d683159dd8e68f473890984ea31407cb.js");
var NPMPackageValidate = class extends import_forge.AsyncArgumentPackageValidate {
  constructor(options) {
    super({
      ...options,
      validators: [
        new import_TypesPackageValidate.TypesPackageValidate(),
        new import_LibraryPackageValidate.LibraryPackageValidate(),
        ...options?.validators ?? []
      ]
    });
  }
  async $flush(query, validations) {
    await super.$flush(query, validations);
    const params = (0, import_forge.MergeAttributes)(await Promise.all(query.or({ forge: import_forge.Intersects }).all));
    const { bin, ext, includes, package_json } = params;
    const cause = params;
    const purges = [];
    if (validations.has(import_forge.QuerySequence.Or({ library: true }))) {
      purges.push(...validations.purge(import_forge.QuerySequence.And({ library: true, index: true })));
      purges.push(...validations.purge(import_forge.QuerySequence.And({ library: true, ext: true })));
      if (validations.has(import_forge.QuerySequence.And({ library: true, error: true })) === false) validations.add(
        new import_forge.ArgumentValidationSuccess(`Package validated for Library`),
        { library: true, validate: true }
      );
    } else {
      console.red("NO tested validation found for library");
      validations.add(
        new import_forge.ArgumentValidationError(`[${this.constructor.name}] No nested valiation found for [LibraryPackageValidate]"`, { cause }),
        { npm: true, library: true, ...import_forge.ArgumentValidationErrorAttributes }
      );
    }
    if (purges.length) console.log(String(purges.map((val) => `${val?.constructor?.name}`)));
    if (bin) {
      const { entry, contents, root } = bin;
      if (bin.constructor === String) {
        validations.add(
          new import_forge.ArgumentValidationError(`[${this.constructor.name}] arguments type <error>{ bin }</error> is a string should be { bin: { entry } }"`, { cause }),
          { bin: true, ...import_forge.ArgumentValidationErrorAttributes }
        );
      } else if (entry) {
        if (await import_forge.ForgeFile.$FileExist(entry) === false) validations.add(
          new import_forge.ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ bin: { entry } }</error> is missing"`, { cause }),
          { bin: { entry: true }, ...import_forge.ArgumentValidationErrorAttributes }
        );
      } else {
        if (contents === void 0) validations.add(
          new import_forge.ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ bin: { content } }</error> is undefined"`, { cause }),
          { bin: { content: true }, ...import_forge.ArgumentValidationErrorAttributes }
        );
        if (root === void 0) validations.add(
          new import_forge.ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ bin: { root } }</error> is missing"`, { cause }),
          { bin: { root: true }, ...import_forge.ArgumentValidationErrorAttributes }
        );
      }
    } else {
      validations.add(
        new import_forge.ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ bin }</cyan> is undefined`, { cause }),
        { bin: true, ...import_forge.ArgumentValidationErrorAttributes }
      );
    }
    if (ext?.cjs === void 0) validations.add(
      new import_forge.ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ ext: { cjs } }</warning> is optional and will default to cjs = <blue>".js"`, { cause }),
      { ext: { cjs: true }, ...import_forge.ArgumentValidationWarningAttributes }
    );
    if (ext?.esm === void 0) validations.add(
      new import_forge.ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ ext: { esm } }</warning> is optional and will default to esm = <blue>".mjs"`, { cause }),
      { ext: { esm: true }, ...import_forge.ArgumentValidationWarningAttributes }
    );
    if (validations.errors.length === 0) validations.add(
      new import_forge.ArgumentValidationSuccess(`Package validated for NPM`),
      { npm: true, validate: true }
    );
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NPMPackageValidate
});
