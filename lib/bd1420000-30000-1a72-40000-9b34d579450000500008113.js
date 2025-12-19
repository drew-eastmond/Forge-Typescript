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

// ../Forge-Typescript-Source/src/ts/react/selector/ReactSelector.ts
var ReactSelector_exports = {};
__export(ReactSelector_exports, {
  ReactSelector: () => ReactSelector
});
module.exports = __toCommonJS(ReactSelector_exports);
var import_react = require("react");
var import_Core = require("./81c0a0000-b0000-9e8e-c0000-9b34d579440000d0000df1b.js");
var ReactSelector = class {
  onlyDecendents = false;
  selectors = /* @__PURE__ */ new Set();
  set roots(elements) {
    for (const psuedo of this.selectors) psuedo.roots = elements;
  }
  has(node) {
    for (const selector of this.selectors) if (selector.has(node) === false) return false;
    return true;
  }
  traverse(node) {
    if ((0, import_react.isValidElement)(node) === false) return [];
    const element = node;
    const props = element.props;
    const children = import_react.Children.toArray(props.children);
    const results = [];
    if (this.onlyDecendents) {
      for (const child of children) if (this.has(child)) results.push(child);
    } else {
      for (const child of children) {
        if (this.has(child)) results.push(child);
        const elements = (0, import_Core.TraverseElements)(child);
        for (const element2 of elements) if (this.has(element2)) results.push(element2);
      }
    }
    return results;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReactSelector
});
