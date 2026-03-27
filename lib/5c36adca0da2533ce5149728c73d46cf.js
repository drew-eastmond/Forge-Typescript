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

// ../Forge-Typescript-Source/src/ts/build/builder/BuilderPackageSanitize.ts
var BuilderPackageSanitize_exports = {};
__export(BuilderPackageSanitize_exports, {
  BuilderPackageSanitize: () => BuilderPackageSanitize
});
module.exports = __toCommonJS(BuilderPackageSanitize_exports);
var import_forge = require("@onyx-ignition/forge");
var import_Core = require("./02e263f9546d01d4d379d2a91cf19496.js");
var BuilderPackageSanitize = class extends import_forge.AsyncArgumentPackageSanitize {
  constructor(options) {
    options = options ?? {
      default: {
        component: {},
        attributes: { builder: true }
      }
    };
    options.default.component = new import_Core.BuilderConfig(options.default?.component);
    super(options);
  }
  async $sanitize(component, attributes) {
    component = component instanceof Promise ? await component : component;
    for (const [key, value] of Object.entries(component)) {
      switch (key) {
        case "ignores":
          component.ignores = await (0, import_Core.$SanitizeGlob)(value);
          break;
        case "externals":
          switch (value?.constructor) {
            case String:
              component.externals = await (0, import_Core.$ParseExternals)(String(value).split(/\s*,\s*/));
              break;
            case Array:
              component.externals = await (0, import_Core.$ParseExternals)(value);
              break;
          }
          break;
        case "transform":
          const { read, write } = component.transform;
          break;
      }
    }
    return component;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BuilderPackageSanitize
});
