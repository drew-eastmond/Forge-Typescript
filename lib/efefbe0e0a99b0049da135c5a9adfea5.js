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

// ../Forge-Typescript-Source/src/ts/formless/component/tree/TreeHTMLElement.ts
var TreeHTMLElement_exports = {};
__export(TreeHTMLElement_exports, {
  TreeHTMLElement: () => TreeHTMLElement,
  TreeHandle: () => TreeHandle,
  TreeRenderer: () => TreeRenderer,
  TreeState: () => TreeState
});
module.exports = __toCommonJS(TreeHTMLElement_exports);
var import_forge = require("@onyx-ignition/forge");
var import_Formless = require("./82b84a3600044d4c7f5da52239d1f3a1.js");
var import_SortableHTMLElement = require("./79e18c3906a6da737ce388e3afbec720.js");
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
    this.root = new import_forge.TreeNode(handle, { root: true }, new import_forge.Topology());
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
var TreeHTMLElement = class _TreeHTMLElement extends import_Formless.FormlessElement {
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
  sortable = new import_SortableHTMLElement.SortableHTMLElement();
  renderer = TreeRenderer;
  _elements = /* @__PURE__ */ new Map();
  constructor() {
    super();
    this._$connect[0].then(this.connect.bind(this));
    this._state = new TreeState(this.sortable, "./");
    this.sortable.selectors = { closest: "li" };
    this.sortable.addEventListener(import_SortableHTMLElement.SortableHTMLElement.Events.CLICK, this._onSortableClick.bind(this));
    this.sortable.addEventListener(import_SortableHTMLElement.SortableHTMLElement.Events.DOUBLE_CLICK, this._onSortableDoubleClick.bind(this));
  }
  _onSortableClick(event) {
    const interaction = event.interaction;
    const element = interaction.current;
    console.log("_onSortableClick", interaction, element);
    const formlessEvent = new import_Formless.FormlessEvent(_TreeHTMLElement.Events.Select, { element, interaction });
    this.dispatchEvent(formlessEvent);
  }
  _onSortableDoubleClick(event) {
    const interaction = event.interaction;
    const element = interaction.current;
    console.log("_onSortableDoubleClick", element);
    const formlessEvent = new import_Formless.FormlessEvent(_TreeHTMLElement.Events.Confirm, { element, interaction });
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TreeHTMLElement,
  TreeHandle,
  TreeRenderer,
  TreeState
});
