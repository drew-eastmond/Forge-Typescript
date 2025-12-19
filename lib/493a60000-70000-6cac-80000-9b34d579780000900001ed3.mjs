#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/react/ReactQuery.ts
import { Children, cloneElement, isValidElement } from "react";
import { ForgeSyntaxParser, ForgeSyntaxStatement, ScopeExpression, SequentialExpression } from "@onyx-ignition/forge";
import { ElementSelector } from "./fa5f20000-30000-acee-40000-9b34d57978000050000a933.mjs";
import { PsuedoSelector } from "./8c8a60000-70000-a359-80000-9b34d57978000090000a9d8.mjs";
import { AttributeSelector } from "./f745a0000-b0000-672a-c0000-9b34d579780000d00002c95.mjs";
import { ClassSelector } from "./2f5fe0000-f0000-a2f5-00000-9b34d5797800001000053f9.mjs";
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
    if (isValidElement(element) === false) return element;
    const props = element.props;
    const children = Children.toArray(props.children);
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
      return cloneElement(element, element.props, ...children);
    } else {
      return cloneElement(element, element.props);
    }
  }
  static Render(node, overload) {
    if (isValidElement(node) === false) return node;
    const element = node;
    const props = element.props;
    const children = Children.toArray(props.children);
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
        return cloneElement(element, { ...clonedProps, checked: true, value });
      } else {
        return cloneElement(element, { ...clonedProps, value });
      }
    } else if (element.type == "input" && props.type == "checkbox") {
      const checked = Boolean(clonedProps.value || clonedProps.checked);
      return cloneElement(element, { ...clonedProps, checked });
    } else if (element.type == "input" && props.type == "text") {
      return cloneElement(element, clonedProps);
    } else if (children.length) {
      return cloneElement(element, clonedProps, ...children);
    } else {
      return cloneElement(element, clonedProps);
    }
  }
  _sequences;
  constructor(query) {
    this._sequences = [];
    const selectorStatement = new ForgeSyntaxStatement();
    selectorStatement.add(
      new SequentialExpression({ psuedo: true }).add(":", { literal: true }).add(/[\w-]+/, { delegate: true }).add(new ScopeExpression("(", ")"), { parameters: true })
    ).add(
      new SequentialExpression({ class: true }).add(".", { literal: true }).add(/[\w-]+/, { delegate: true })
    ).add(
      new SequentialExpression({ attribute: true }).add(new ScopeExpression("[", "]"), { selector: true })
    ).add(
      new SequentialExpression({ element: true }).add("[w-]+", { node: true })
    ).add(
      new SequentialExpression({ comma: true }).add(",", { literal: true })
    ).add(
      new SequentialExpression({ non_recursive: true }).add(">", { literal: true })
    ).add(
      new SequentialExpression({ root: true }).add("&", { literal: true })
    );
    const selectorParser = new ForgeSyntaxParser(selectorStatement);
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
        selector = new AttributeSelector(parsedQuery);
      } else if (descriptors.class === true) {
        const parsedQuery = JoinParsedTokens(tokens);
        selector = new ClassSelector(parsedQuery);
      } else if (descriptors.psuedo === true) {
        const parsedQuery = JoinParsedTokens(tokens);
        selector = new PsuedoSelector(parsedQuery);
      } else if (descriptors.element) {
        const parsedQuery = JoinParsedTokens(tokens);
        selector = new ElementSelector(parsedQuery);
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
      for (const selector of sequence) selector.roots = values.filter(isValidElement);
    }
  }
  has(...parents) {
    for (const parent of parents) {
      for (const elementSequence of this._sequences) {
        let sequenceResults = [parent];
        for (const selector of elementSequence) {
          selector.roots = parents.filter(isValidElement);
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
      if (isValidElement(parent) === false) continue;
      for (const elementSequence of this._sequences) {
        let sequenceResults = [parent];
        for (const selector of elementSequence) {
          selector.roots = parents.filter(isValidElement);
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
          selector.roots = parents.filter(isValidElement);
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
  const queryStatement = new ForgeSyntaxStatement();
  queryStatement.add(
    new SequentialExpression({ psuedo: true }).add(":", { literal: true }).add(/[\w-]+/, { delegate: true }).add(new ScopeExpression("(", ")"), { parameters: true })
  ).add(
    new SequentialExpression({ class: true }).add(".", { literal: true }).add(/[\w-]+/, { delegate: true })
  ).add(
    new SequentialExpression({ attribute: true }).add(new ScopeExpression("[", "]"), { selector: true })
  ).add(
    new SequentialExpression({ element: true }).add("[w-]+", { node: true })
  ).add(
    new SequentialExpression({ comma: true }).add(",", { literal: true })
  );
  const selectorParser = new ForgeSyntaxParser(queryStatement);
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
      selectors.push(new AttributeSelector(selector));
      console.log("attribute selector", selector, descriptors);
    } else if (descriptors.class === true) {
      const selector = tokens.map(([val, meta]) => val).join("");
      selectors.push(new ClassSelector(selector));
      console.log("class selector", selector, descriptors);
    } else if (descriptors.psuedo === true) {
      const selector = tokens.map(([val, meta]) => val).join("");
      const psuedoSelector = new PsuedoSelector(selector);
      if (descriptors.whitespaces.before.length) {
        selectors.push(psuedoSelector);
      } else {
        const previousSelector = selectors[selector.length - 1];
        previousSelector.selectors.add(psuedoSelector);
      }
      console.log("psuedo selector", selector, descriptors);
    } else if (descriptors.element) {
      const selector = tokens.map(([val, meta]) => val).join("");
      selectors.push(new ElementSelector(selector));
      console.log("element selector", selector, descriptors);
    }
  }
  const results2 = /* @__PURE__ */ new Set();
  let firstIteration = true;
  for (const parent of roots) {
    if (isValidElement(parent) === false) continue;
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
export {
  BuildSelectorParser,
  ReactQuery
};
