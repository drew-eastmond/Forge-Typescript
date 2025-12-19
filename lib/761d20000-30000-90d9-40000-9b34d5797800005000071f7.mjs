#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/react/Core.ts
import { Children, isValidElement } from "react";
function TraverseElements(node) {
  if (isValidElement(node) === false) return [];
  const element = node;
  const { children } = element.props;
  if (children === void 0) return [];
  const results = [];
  for (const child of Children.toArray(children)) {
    if (isValidElement(child)) results.push(child);
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
export {
  SanitizeProps,
  TraverseElements
};
