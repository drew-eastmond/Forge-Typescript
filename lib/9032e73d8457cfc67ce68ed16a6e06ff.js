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

// ../Forge-Typescript-Source/src/ts/build/builder/BuilderPackageValidate.ts
var BuilderPackageValidate_exports = {};
__export(BuilderPackageValidate_exports, {
  BuilderPackageValidate: () => BuilderPackageValidate
});
module.exports = __toCommonJS(BuilderPackageValidate_exports);
var import_forge = require("@onyx-ignition/forge");
var BuilderPackageValidate = class extends import_forge.AsyncArgumentPackageValidate {
  async $flush(query, validations) {
    const builderParams = (0, import_forge.MergeAttributes)(await Promise.all(query.or({ builder: import_forge.Intersects }).all));
    let { format, platform, bundled, ignores, transform } = builderParams;
    const errorAttributes = { ...import_forge.ArgumentValidationErrorAttributes, builder: true };
    const warningAttributes = { ...import_forge.ArgumentValidationWarningAttributes, builder: true };
    const cause = builderParams;
    if (format) {
      validations.add(
        new import_forge.ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ format }</warning> is optional and will default to <blue>cjs`, { cause }),
        { format: true, ...warningAttributes }
      );
    } else {
      format = String(format).toLowerCase();
      if (["cjs", "esm", "iife"].includes(format) === false) validations.add(
        new import_forge.ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ format }</warning> is an invalid value. Should be <blue>cjs | esm | iife`, { cause }),
        { format: true, ...errorAttributes }
      );
    }
    if (platform) {
      validations.add(
        new import_forge.ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ platform }</warning> is optional and will default to <blue>neutral`, { cause }),
        { platform: true, ...warningAttributes }
      );
    } else {
      platform = String(platform).toLowerCase();
      if (["node", "neutral", "browser"].includes(platform) === false) validations.add(
        new import_forge.ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ format }</warning> is an invalid value. Should be <blue>node | neutral | browser`, { cause }),
        { platform: true, ...errorAttributes }
      );
    }
    if (bundled) {
      validations.add(
        new import_forge.ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ bundled }</warning> is optional and will default to <blue>mangle-static`, { cause }),
        { bundled: true, ...warningAttributes }
      );
    } else {
      bundled = String(bundled).toLowerCase();
      if (["preserve", "mangle-static", "mangle-random", "merge"].includes(bundled) === false) validations.add(
        new import_forge.ArgumentValidationWarning(`[${this.constructor.name}] arguments for <error>{ bundled }</warning> is an invalid value. Should be <blue> preserve | mangle-static | mangle-random | merge`, { cause }),
        { bundled: true, ...errorAttributes }
      );
    }
    if (ignores) {
      switch (ignores.constructor) {
        case String:
          ignores = ignores.split(/\s*,\s*/g);
        // fall thorugh
        case Array:
          const results = await import_forge.ForgeFile.$GlobExist(ignores);
          if (results.success === false) {
            const warnings = [];
            for (const [warning, attributes] of results) warnings.push(warning);
            validations.add(
              new import_forge.ArgumentValidationWarning(
                `[${this.constructor.name}] arguments for <warning>{ ignores }</warning> has the following invalid targets:
		<magenta>${warnings.join("\n		")}`,
                { cause: warnings }
              ),
              { ignores: true, ...warningAttributes }
            );
          }
          break;
      }
    }
    if (transform) {
      if (Array.isArray(transform.write)) {
      }
      if (Array.isArray(transform.read)) {
      }
    }
    if (validations.errors.length === 0) validations.add(
      new import_forge.ArgumentValidationSuccess(`${this.constructor.name}] Package validated for builder`),
      { builder: true, validate: true }
    );
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BuilderPackageValidate
});
