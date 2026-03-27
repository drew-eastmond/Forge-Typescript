#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/react/selector/ElementSelector.ts
import { isValidElement } from "react";
import { ReactSelector } from "./b0221665f631b3c4ecf123bc37c73ed1.mjs";
var ElementSelector = class extends ReactSelector {
  type;
  constructor(type) {
    super();
    this.type = type;
  }
  has(node) {
    if (isValidElement(node)) {
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
export {
  ElementSelector
};
