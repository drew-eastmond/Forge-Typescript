#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/react/selector/PsuedoSelector.ts
import { ReactQuery } from "./493a60000-70000-6cac-80000-9b34d579780000900001ed3.mjs";
import { ReactSelector } from "./a4d4a0000-b0000-a75f-c0000-9b34d579780000d00006c5f.mjs";
function NotSelect(elements, focus) {
  for (const element of elements) {
    if (element.type == focus.type && element.key == element.key && element.props == focus.props) return false;
  }
  return true;
}
var PsuedoSelector = class extends ReactSelector {
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
      this._reactQuery = new ReactQuery(psuedoSelector);
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
export {
  PsuedoSelector
};
