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

// ../Forge-Typescript-Source/src/ts/react/selector/PsuedoSelector.ts
var PsuedoSelector_exports = {};
__export(PsuedoSelector_exports, {
  PsuedoSelector: () => PsuedoSelector
});
module.exports = __toCommonJS(PsuedoSelector_exports);
var import_ReactQuery = require("./0e9e453ef1019dc9c80dda3d3079fb63.js");
var import_ReactSelector = require("./270f01db12ac3a5f7ee4949635b5e344.js");
function NotSelect(elements, focus) {
  for (const element of elements) {
    if (element.type == focus.type && element.key == element.key && element.props == focus.props) return false;
  }
  return true;
}
var PsuedoSelector = class extends import_ReactSelector.ReactSelector {
  _reactQuery;
  _driver;
  _roots;
  constructor(selector) {
    super();
    const results = /^:(?<psuedo>[\w-]+)\((?<selector>.+?)\)\s*$/.exec(selector);
    if (results) {
      const psuedo = results.groups.psuedo;
      const psuedoSelector = results.groups.selector;
      switch (psuedo) {
        case "not":
          console.log("NOTTTTTT", psuedo, psuedoSelector);
          this._driver = NotSelect;
          break;
        default:
          throw new Error(`psuedo function not implemented`);
      }
      this._reactQuery = new import_ReactQuery.ReactQuery(psuedoSelector);
    }
  }
  set roots(values) {
    super.roots = values;
    this._reactQuery.roots = values;
    this._roots = values;
  }
  has(node) {
    const elements = this._reactQuery.traverse(...this._roots);
    return this._driver(elements, node);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PsuedoSelector
});
