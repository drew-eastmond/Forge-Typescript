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

// ../Forge-Typescript-Source/src/ts/react/selector/AttributeSelector.ts
var AttributeSelector_exports = {};
__export(AttributeSelector_exports, {
  AttributeSelector: () => AttributeSelector
});
module.exports = __toCommonJS(AttributeSelector_exports);
var import_react = require("react");
var import_ReactSelector = require("./bd1420000-30000-1a72-40000-9b34d579450000500008113.js");
var AttributeSelector = class _AttributeSelector extends import_ReactSelector.ReactSelector {
  static MatchAttribute(key, value, element) {
    return key in element.props;
  }
  static MatchEqual(key, value, element) {
    return String(element.props[key]) == value;
  }
  static MatchContains(key, value, element) {
    return String(element.props[key]).indexOf(value) > -1;
  }
  static MatchSuffix(key, value, element) {
    return String(element.props[key]).endsWith(String(value));
  }
  _key;
  _value;
  _matcher;
  constructor(query) {
    super();
    const exec_0 = /\[(\w+)(=[\*\$~\|\^]?)['"]([\w-]+?)['"]\s*(i|s)?\]/.exec(query);
    if (exec_0) {
      this._key = exec_0[1];
      this._value = exec_0[3];
      switch (exec_0[2]) {
        case "=":
          this._matcher = _AttributeSelector.MatchEqual;
          break;
        case "*=":
          this._matcher = _AttributeSelector.MatchContains;
          break;
        case "$=":
          this._matcher = _AttributeSelector.MatchSuffix;
          break;
        default:
          throw "match is not implmented";
      }
    } else {
      const exec_1 = /\[([\w-]+?)\]/.exec(query);
      this._key = exec_1[1];
      this._matcher = this._matcher = _AttributeSelector.MatchAttribute;
      this._value = true;
    }
  }
  has(node) {
    if ((0, import_react.isValidElement)(node) === false) return false;
    if (this._matcher(this._key, this._value, node) === false) return false;
    if (super.has(node) === false) return false;
    return true;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AttributeSelector
});
