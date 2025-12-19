#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/react/selector/AttributeSelector.ts
import { isValidElement } from "react";
import { ReactSelector } from "./a4d4a0000-b0000-a75f-c0000-9b34d579780000d00006c5f.mjs";
var AttributeSelector = class _AttributeSelector extends ReactSelector {
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
    if (isValidElement(node) === false) return false;
    if (this._matcher(this._key, this._value, node) === false) return false;
    if (super.has(node) === false) return false;
    return true;
  }
};
export {
  AttributeSelector
};
