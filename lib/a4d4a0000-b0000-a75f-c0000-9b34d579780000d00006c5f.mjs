#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/react/selector/ReactSelector.ts
import { Children, isValidElement } from "react";
import { TraverseElements } from "./761d20000-30000-90d9-40000-9b34d5797800005000071f7.mjs";
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
    if (isValidElement(node) === false) return [];
    const element = node;
    const props = element.props;
    const children = Children.toArray(props.children);
    const results = [];
    if (this.onlyDecendents) {
      for (const child of children) if (this.has(child)) results.push(child);
    } else {
      for (const child of children) {
        if (this.has(child)) results.push(child);
        const elements = TraverseElements(child);
        for (const element2 of elements) if (this.has(element2)) results.push(element2);
      }
    }
    return results;
  }
};
export {
  ReactSelector
};
