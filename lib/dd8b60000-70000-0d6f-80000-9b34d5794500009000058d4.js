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

// ../Forge-Typescript-Source/src/ts/react/selector/ClassSelector.ts
var ClassSelector_exports = {};
__export(ClassSelector_exports, {
  ClassSelector: () => ClassSelector
});
module.exports = __toCommonJS(ClassSelector_exports);
var import_react = require("react");
var import_ReactSelector = require("./bd1420000-30000-1a72-40000-9b34d579450000500008113.js");
var ClassSelector = class extends import_ReactSelector.ReactSelector {
  _query;
  constructor(query) {
    super();
    this._query = query.slice(1);
  }
  has(node) {
    if ((0, import_react.isValidElement)(node) === false) return false;
    const element = node;
    const { className } = element.props;
    return className?.indexOf(this._query) > -1;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClassSelector
});
