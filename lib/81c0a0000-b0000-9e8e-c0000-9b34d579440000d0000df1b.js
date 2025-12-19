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

// ../Forge-Typescript-Source/src/ts/react/Core.ts
var Core_exports = {};
__export(Core_exports, {
  SanitizeProps: () => SanitizeProps,
  TraverseElements: () => TraverseElements
});
module.exports = __toCommonJS(Core_exports);
var import_react = require("react");
function TraverseElements(node) {
  if ((0, import_react.isValidElement)(node) === false) return [];
  const element = node;
  const { children } = element.props;
  if (children === void 0) return [];
  const results = [];
  for (const child of import_react.Children.toArray(children)) {
    if ((0, import_react.isValidElement)(child)) results.push(child);
    results.push(...TraverseElements(child));
  }
  return results;
}
function SanitizeProps(props) {
  const result = {};
  for (const [key, value] of Object.entries(props)) {
    if (value instanceof Object) {
      result[key] = SanitizeProps(value);
    } else {
      result[key] = String(value);
    }
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SanitizeProps,
  TraverseElements
});
