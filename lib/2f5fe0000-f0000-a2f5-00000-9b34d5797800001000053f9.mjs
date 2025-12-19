#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/react/selector/ClassSelector.ts
import { isValidElement } from "react";
import { ReactSelector } from "./a4d4a0000-b0000-a75f-c0000-9b34d579780000d00006c5f.mjs";
var ClassSelector = class extends ReactSelector {
  _query;
  constructor(query) {
    super();
    this._query = query.slice(1);
  }
  has(node) {
    if (isValidElement(node) === false) return false;
    const element = node;
    const { className } = element.props;
    return className?.indexOf(this._query) > -1;
  }
};
export {
  ClassSelector
};
