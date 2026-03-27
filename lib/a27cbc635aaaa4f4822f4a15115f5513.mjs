#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/react/selector/PsuedoSelector.ts
import { ReactQuery } from "./4c3168a35113da7f83e28ff432ea3072.mjs";
import { ReactSelector } from "./b0221665f631b3c4ecf123bc37c73ed1.mjs";
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
