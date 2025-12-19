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

// ../Forge-Typescript-Source/src/ts/react/ReactQuery.ts
var ReactQuery_exports = {};
__export(ReactQuery_exports, {
  BuildSelectorParser: () => BuildSelectorParser,
  ReactQuery: () => ReactQuery
});
module.exports = __toCommonJS(ReactQuery_exports);
var import_react = require("react");
var import_forge = require("@onyx-ignition/forge");
var import_ElementSelector = require("./b369a0000-b0000-2a09-c0000-9b34d579450000d000095c9.js");
var import_PsuedoSelector = require("./09ade0000-f0000-f637-00000-9b34d57945000010000d8c4.js");
var import_AttributeSelector = require("./f92620000-30000-b580-40000-9b34d5794500005000090b9.js");
var import_ClassSelector = require("./dd8b60000-70000-0d6f-80000-9b34d5794500009000058d4.js");
function JoinParsedTokens(tokens) {
  return tokens.map(([val, meta]) => val).join("");
}
var ReactQuery = class _ReactQuery {
  static CompareElements(elementA, elementB) {
    if (elementA.type != elementB.type) return false;
    if (elementA.key != elementB.key) return false;
    const propsB = elementB.props;
    for (const [key, value] of Object.entries(elementA.props)) {
      switch (value.constructor.name) {
        case "Number":
        case "String":
        case "Boolean":
          if (value != propsB[key]) return false;
          break;
      }
    }
    return true;
  }
  static Traverse(selector, ...parents) {
    const reactSelector = new _ReactQuery(selector);
    return reactSelector.traverse(...parents);
  }
  static Transform(node, callback, traversal) {
    traversal ||= { ancestry: [], children: [] };
    const element = callback(node, traversal);
    if ((0, import_react.isValidElement)(element) === false) return element;
    const props = element.props;
    const children = import_react.Children.toArray(props.children);
    const previousChildren = traversal.children;
    traversal.children = children;
    traversal.ancestry.push(element);
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      children[i] = _ReactQuery.Transform(child, callback, traversal);
    }
    traversal.ancestry.pop();
    traversal.children = previousChildren;
    if (children.length) {
      return (0, import_react.cloneElement)(element, element.props, ...children);
    } else {
      return (0, import_react.cloneElement)(element, element.props);
    }
  }
  static Render(node, overload) {
    if ((0, import_react.isValidElement)(node) === false) return node;
    const element = node;
    const props = element.props;
    const children = import_react.Children.toArray(props.children);
    let clonedProps;
    if (overload === void 0) {
      clonedProps = props;
    } else if (overload instanceof Function) {
      const delegate = overload;
      clonedProps = delegate(props);
    } else {
      clonedProps = { ...overload };
    }
    clonedProps.defaultValue = clonedProps.value || clonedProps.defaultValue;
    delete props.value;
    if (element.type == "input" && props.type == "radio") {
      const value = String(props.value);
      if (clonedProps.value == value) {
        return (0, import_react.cloneElement)(element, { ...clonedProps, checked: true, value });
      } else {
        return (0, import_react.cloneElement)(element, { ...clonedProps, value });
      }
    } else if (element.type == "input" && props.type == "checkbox") {
      const checked = Boolean(clonedProps.value || clonedProps.checked);
      return (0, import_react.cloneElement)(element, { ...clonedProps, checked });
    } else if (element.type == "input" && props.type == "text") {
      return (0, import_react.cloneElement)(element, clonedProps);
    } else if (children.length) {
      return (0, import_react.cloneElement)(element, clonedProps, ...children);
    } else {
      return (0, import_react.cloneElement)(element, clonedProps);
    }
  }
  _sequences;
  constructor(query) {
    this._sequences = [];
    const selectorStatement = new import_forge.ForgeSyntaxStatement();
    selectorStatement.add(
      new import_forge.SequentialExpression({ psuedo: true }).add(":", { literal: true }).add(/[\w-]+/, { delegate: true }).add(new import_forge.ScopeExpression("(", ")"), { parameters: true })
    ).add(
      new import_forge.SequentialExpression({ class: true }).add(".", { literal: true }).add(/[\w-]+/, { delegate: true })
    ).add(
      new import_forge.SequentialExpression({ attribute: true }).add(new import_forge.ScopeExpression("[", "]"), { selector: true })
    ).add(
      new import_forge.SequentialExpression({ element: true }).add("[w-]+", { node: true })
    ).add(
      new import_forge.SequentialExpression({ comma: true }).add(",", { literal: true })
    ).add(
      new import_forge.SequentialExpression({ non_recursive: true }).add(">", { literal: true })
    ).add(
      new import_forge.SequentialExpression({ root: true }).add("&", { literal: true })
    );
    const selectorParser = new import_forge.ForgeSyntaxParser(selectorStatement);
    const syntaxResults = selectorParser.consume(query);
    let selectors = [];
    this._sequences.push(selectors);
    let onlyDecendents = false;
    for (const [tokens, descriptors] of syntaxResults) {
      if (descriptors.root === true) continue;
      if (descriptors.whitespaces === true) continue;
      let selector;
      if (descriptors.non_recusive) {
        onlyDecendents = true;
        continue;
      } else if (descriptors.comma === true) {
        selectors = [];
        this._sequences.push(selectors);
      } else if (descriptors.attribute === true) {
        const parsedQuery = JoinParsedTokens(tokens);
        selector = new import_AttributeSelector.AttributeSelector(parsedQuery);
      } else if (descriptors.class === true) {
        const parsedQuery = JoinParsedTokens(tokens);
        selector = new import_ClassSelector.ClassSelector(parsedQuery);
      } else if (descriptors.psuedo === true) {
        const parsedQuery = JoinParsedTokens(tokens);
        selector = new import_PsuedoSelector.PsuedoSelector(parsedQuery);
      } else if (descriptors.element) {
        const parsedQuery = JoinParsedTokens(tokens);
        selector = new import_ElementSelector.ElementSelector(parsedQuery);
      } else {
        throw new Error(`Invalid tokens "${JoinParsedTokens(tokens)}"`);
      }
      const { before } = descriptors.whitespaces;
      if (before.length) {
        selectors.push(selector);
      } else {
        if (selectors.length) {
          const compositeSelector = selectors[selectors.length - 1];
          compositeSelector.selectors.add(selector);
          continue;
        } else {
          selectors.push(selector);
        }
      }
      selector.onlyDecendents = onlyDecendents;
      onlyDecendents = false;
    }
  }
  set roots(values) {
    for (const sequence of this._sequences) {
      for (const selector of sequence) selector.roots = values.filter(import_react.isValidElement);
    }
  }
  has(...parents) {
    for (const parent of parents) {
      for (const elementSequence of this._sequences) {
        let sequenceResults = [parent];
        for (const selector of elementSequence) {
          selector.roots = parents.filter(import_react.isValidElement);
          const queryElements = [...sequenceResults];
          sequenceResults = [];
          for (const element of queryElements) {
            if (selector.has(element)) sequenceResults.push(element);
            const traversal = selector.traverse(element);
            sequenceResults.push(...traversal);
          }
        }
        if (sequenceResults.length) return true;
      }
    }
    return false;
  }
  traverse(...parents) {
    const results2 = /* @__PURE__ */ new Set();
    let firstIteration = true;
    for (const parent of parents) {
      if ((0, import_react.isValidElement)(parent) === false) continue;
      for (const elementSequence of this._sequences) {
        let sequenceResults = [parent];
        for (const selector of elementSequence) {
          selector.roots = parents.filter(import_react.isValidElement);
          const queryElements = [...sequenceResults];
          sequenceResults = [];
          for (const element of queryElements) {
            if (firstIteration && selector.has(element)) sequenceResults.push(element);
            const traversal = selector.traverse(element);
            sequenceResults.push(...traversal);
          }
          firstIteration = false;
        }
        for (const element of sequenceResults) results2.add(element);
      }
    }
    return Array.from(results2);
  }
  select(...parents) {
    let firstIteration = true;
    for (const parent of parents) {
      for (const elementSequence of this._sequences) {
        let sequenceResults = [parent];
        for (const selector of elementSequence) {
          selector.roots = parents.filter(import_react.isValidElement);
          const queryElements = [...sequenceResults];
          sequenceResults = [];
          for (const element of queryElements) {
            if (firstIteration && selector.has(element)) return element;
            const traversal = selector.traverse(element);
            sequenceResults.push(...traversal);
          }
          firstIteration = false;
        }
        for (const element of sequenceResults) results.add(element);
      }
    }
  }
  /* public closest(target: ReactNode, ...parents: ReactNode[]): ReactElement[] {
  
          const results: ReactElement[] = [];
  
          const nodes: ReactNode[] = this.traverse(...parents);
          for (const node of nodes) {
  
              if (isValidElement(node) === false) continue;
  
              const element: ReactElement = node as ReactElement;
              const props: { children: ReactNode[] } = element.props as { children: ReactNode[] };
              //const childern: ReactNode[] = Children.toArray(props.children);
  
              if (childern.indexOf(target) > -1) return element;
  
          }
  
          return results;
  
      } */
};
function BuildSelectorParser(content, roots) {
  return;
  const queryStatement = new import_forge.ForgeSyntaxStatement();
  queryStatement.add(
    new import_forge.SequentialExpression({ psuedo: true }).add(":", { literal: true }).add(/[\w-]+/, { delegate: true }).add(new import_forge.ScopeExpression("(", ")"), { parameters: true })
  ).add(
    new import_forge.SequentialExpression({ class: true }).add(".", { literal: true }).add(/[\w-]+/, { delegate: true })
  ).add(
    new import_forge.SequentialExpression({ attribute: true }).add(new import_forge.ScopeExpression("[", "]"), { selector: true })
  ).add(
    new import_forge.SequentialExpression({ element: true }).add("[w-]+", { node: true })
  ).add(
    new import_forge.SequentialExpression({ comma: true }).add(",", { literal: true })
  );
  const selectorParser = new import_forge.ForgeSyntaxParser(queryStatement);
  const syntaxResults = selectorParser.consume(content);
  const sequences = [];
  let selectors = [];
  sequences.push(selectors);
  for (const [tokens, descriptors] of syntaxResults) {
    if (descriptors.comma === true) {
      selectors = [];
      sequences.push(selectors);
    } else if (descriptors.attribute === true) {
      const selector = tokens.map(([val, meta]) => val).join("");
      selectors.push(new import_AttributeSelector.AttributeSelector(selector));
      console.log("attribute selector", selector, descriptors);
    } else if (descriptors.class === true) {
      const selector = tokens.map(([val, meta]) => val).join("");
      selectors.push(new import_ClassSelector.ClassSelector(selector));
      console.log("class selector", selector, descriptors);
    } else if (descriptors.psuedo === true) {
      const selector = tokens.map(([val, meta]) => val).join("");
      const psuedoSelector = new import_PsuedoSelector.PsuedoSelector(selector);
      if (descriptors.whitespaces.before.length) {
        selectors.push(psuedoSelector);
      } else {
        const previousSelector = selectors[selector.length - 1];
        previousSelector.selectors.add(psuedoSelector);
      }
      console.log("psuedo selector", selector, descriptors);
    } else if (descriptors.element) {
      const selector = tokens.map(([val, meta]) => val).join("");
      selectors.push(new import_ElementSelector.ElementSelector(selector));
      console.log("element selector", selector, descriptors);
    }
  }
  const results2 = /* @__PURE__ */ new Set();
  let firstIteration = true;
  for (const parent of roots) {
    if ((0, import_react.isValidElement)(parent) === false) continue;
    for (const elementSequence of sequences) {
      let sequenceResults = [parent];
      for (const elementSelector of elementSequence) {
        const queryElements = [...sequenceResults];
        sequenceResults = [];
        for (const element of queryElements) {
          if (firstIteration && elementSelector.has(element)) sequenceResults.push(element);
          const traversal = elementSelector.traverse(element);
          sequenceResults.push(...traversal);
        }
        firstIteration = false;
      }
      for (const element of sequenceResults) results2.add(element);
    }
  }
  console.warn(Array.from(results2));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BuildSelectorParser,
  ReactQuery
});
