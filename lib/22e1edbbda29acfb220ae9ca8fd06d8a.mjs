#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/formless/component/tree/TreeHTMLElement.ts
import { Topology, TreeNode } from "@onyx-ignition/forge";
import { FormlessElement, FormlessEvent } from "./0c633acb921eaf20839b6e24a9d91694.mjs";
import { SortableHTMLElement } from "./cdc80176a78aeacf0527de502e129bae.mjs";
function TreeRenderer(element, value) {
  if (element.children.length == 0) {
    const label = document.createElement("label");
    label.innerText = value.source.key;
    element.append(label);
    const ul2 = document.createElement("ul");
    element.append(ul2);
    const parent = value.parent;
    if (parent) parent.source.element.append(element);
  }
  const ul = element.querySelector("& > ul");
  for (const child of value.children) ul.append(TreeRenderer(child.source.element, child));
  return element;
}
var TreeHandle = class {
  key;
  element;
  constructor(init) {
    this.key = init.key;
    this.element = init.element;
  }
  toString() {
    return `<${this.element.nodeName}>`;
  }
};
var TreeState = class {
  root;
  constructor(element, key) {
    const handle = new TreeHandle({ key, element });
    this.root = new TreeNode(handle, { root: true }, new Topology());
  }
  *[Symbol.iterator]() {
    for (const node of this.root) yield node.source;
  }
  _fetchNode(key, parent, attributes) {
    for (const child of parent.children) if (child.source.key == key) return child;
    const handle = new TreeHandle({ key, element: document.createElement("li") });
    if (/\w+\:\/\//.test(key)) return parent.fork(handle, { host: true, ...attributes });
    if (/\w+\:[\/\\]$/.test(key)) return parent.fork(handle, { drive: true, ...attributes });
    return parent.fork(handle, { folder: true, ...attributes });
  }
  append(url, attributes) {
    const regExp = /(\w+\:\/\/)|(.+?[\\\/])/g;
    let index = 0;
    let currentNode = this.root;
    let results;
    while (results = regExp.exec(url)) {
      const entry = results[0];
      currentNode = this._fetchNode(entry, currentNode, { url, ...attributes });
      index += entry.length;
    }
    const handle = new TreeHandle({ key: url.substring(index), element: document.createElement("li") });
    if (index < url.length) currentNode = currentNode.fork(handle, { file: true, ...attributes });
    return currentNode;
  }
  path(node, join) {
    const title = [];
    for (const ancestor of node.ancestry) {
      title.push(ancestor.source.element.querySelector("label").innerHTML);
    }
    title.push(node.source.element.querySelector("label").innerHTML);
    return title.join("");
  }
  search(key) {
    if (key.constructor.name == "String") {
      const title = key;
      const regExp = /(\w+\:\/\/)|(.+?[\\\/])/g;
      let index = 0;
      let currentNode = this.root;
      let results;
      while (results = regExp.exec(title)) {
        const entry = results[0];
        const children = currentNode.children;
        currentNode = void 0;
        for (const child of children) if (child.source.key == entry) currentNode = child;
        if (currentNode === void 0) return;
      }
      return currentNode;
    } else {
      const element = key;
      for (const node of this.root) {
        const handle = node.source;
        if (handle.element == element) return node;
      }
    }
  }
  toString() {
    let output = "";
    for (const node of this.root) {
      const ancestorsLength = node.ancestry.length - 1;
      output += "  ".repeat(ancestorsLength) + String(node.source) + ` ${JSON.stringify(node.attributes)} 
`;
    }
    return output;
  }
};
var TreeHTMLElement = class _TreeHTMLElement extends FormlessElement {
  static Events = Object.freeze({
    Select: "select",
    Confirm: "confirm"
  });
  static Register(name) {
    name = name || "forge-tree";
    if (customElements.get(name) === void 0) customElements.define(name, _TreeHTMLElement);
  }
  _connected = false;
  _state;
  sortable = new SortableHTMLElement();
  renderer = TreeRenderer;
  _elements = /* @__PURE__ */ new Map();
  constructor() {
    super();
    this._$connect[0].then(this.connect.bind(this));
    this._state = new TreeState(this.sortable, "./");
    this.sortable.selectors = { closest: "li" };
    this.sortable.addEventListener(SortableHTMLElement.Events.CLICK, this._onSortableClick.bind(this));
    this.sortable.addEventListener(SortableHTMLElement.Events.DOUBLE_CLICK, this._onSortableDoubleClick.bind(this));
  }
  _onSortableClick(event) {
    const interaction = event.interaction;
    const element = interaction.current;
    console.log("_onSortableClick", interaction, element);
    const formlessEvent = new FormlessEvent(_TreeHTMLElement.Events.Select, { element, interaction });
    this.dispatchEvent(formlessEvent);
  }
  _onSortableDoubleClick(event) {
    const interaction = event.interaction;
    const element = interaction.current;
    console.log("_onSortableDoubleClick", element);
    const formlessEvent = new FormlessEvent(_TreeHTMLElement.Events.Confirm, { element, interaction });
    this.dispatchEvent(formlessEvent);
  }
  get state() {
    return this._state;
  }
  connect(event) {
    if (this._connected) return;
    this._connected = true;
    this.prepend(this.sortable);
  }
  render(node) {
    this.renderer(node.source.element, node);
    for (const child of node.children) this.render(child);
  }
  sort(node) {
  }
};
export {
  TreeHTMLElement,
  TreeHandle,
  TreeRenderer,
  TreeState
};
