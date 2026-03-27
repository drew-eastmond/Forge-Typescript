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

// ../Forge-Typescript-Source/src/ts/build/builder/BuilderPackage.ts
var BuilderPackage_exports = {};
__export(BuilderPackage_exports, {
  BuilderPackage: () => BuilderPackage
});
module.exports = __toCommonJS(BuilderPackage_exports);
var import_forge = require("@onyx-ignition/forge");
var import_BuilderPackageSanitize = require("./5c36adca0da2533ce5149728c73d46cf.js");
var import_BuilderPackageValidate = require("./9032e73d8457cfc67ce68ed16a6e06ff.js");
var BuilderPackage = class _BuilderPackage extends import_forge.ArgumentPackage {
  /**
   * Return an instance that has been merged from a { builder } mount, then validated and sanitized
   * @param packages
   * @returns {BuilderPackage}
   */
  static async $From(packages) {
    const builder = (0, import_forge.MergePackages)(packages, import_forge.QuerySequence.Traverse({ builder: true }));
    const packaging = new _BuilderPackage();
    packaging.add(builder, { builder: true });
    await packaging.$validate(new import_BuilderPackageValidate.BuilderPackageValidate());
    return packaging.$sanitize(new import_BuilderPackageSanitize.BuilderPackageSanitize());
  }
  async $validate(validator) {
    return super.$validate(validator ?? new import_BuilderPackageValidate.BuilderPackageValidate());
  }
  async $sanitize(sanitizer) {
    return super.$sanitize(sanitizer ?? new import_BuilderPackageSanitize.BuilderPackageSanitize());
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BuilderPackage
});
