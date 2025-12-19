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

// ../Forge-Typescript-Source/src/ts/react/selector/ElementSelector.ts
var ElementSelector_exports = {};
__export(ElementSelector_exports, {
  ElementSelector: () => ElementSelector
});
module.exports = __toCommonJS(ElementSelector_exports);
var import_react = require("react");
var import_ReactSelector = require("./bd1420000-30000-1a72-40000-9b34d579450000500008113.js");
var ElementSelector = class extends import_ReactSelector.ReactSelector {
  type;
  constructor(type) {
    super();
    this.type = type;
  }
  has(node) {
    if ((0, import_react.isValidElement)(node)) {
      const element = node;
      if (this.type) {
        if (this.type == "*") {
          return true;
        } else if (element.type instanceof Function) {
          if (this.type != element.type.name) return false;
        } else if (this.type != element.type) {
          return false;
        }
      }
      if (super.has(node) === false) return false;
    }
    return true;
  }
  /* public traverse(node: ReactNode): ReactNode[] {
  
          if (isValidElement(node) === false) return [];
  
          const element: ReactElement = node as ReactElement;
          const props: { children: ReactNode[] } = element.props as { children: ReactNode[] };
          const children: ReactNode[] = Children.toArray(props.children);
  
          const results: ReactNode[] = []; // (this.select(parent)) ? [parent] : [];
          if (this.onlyDecendents) {
  
              for (const child of children) if (this.select(child)) results.push(child);
  
          } else {
  
              for (const child of children) {
  
                  if (this.select(child)) results.push(child);
  
                  const elements: ReactNode[] = TraverseElements(child);
                  for (const element of elements) if (this.select(element)) results.push(element);
  
              }
  
          }
  
          return results;
  
      } */
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ElementSelector
});
