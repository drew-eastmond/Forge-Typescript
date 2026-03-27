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

// ../Forge-Typescript-Source/src/ts/formless/component/input/FileBrowserInputHTMLElement.ts
var FileBrowserInputHTMLElement_exports = {};
__export(FileBrowserInputHTMLElement_exports, {
  FileBrowserInputHTMLElement: () => FileBrowserInputHTMLElement
});
module.exports = __toCommonJS(FileBrowserInputHTMLElement_exports);
var import_FormletHTMLElement = require("./feb1e39f6b99ef3b171f63419017f009.js");
var FileBrowserInputHTMLElement = class _FileBrowserInputHTMLElement extends import_FormletHTMLElement.FormletHTMLElement {
  static Register(name) {
    name = name || "forge-file-browse-input";
    if (customElements.get(name) === void 0) customElements.define(name, _FileBrowserInputHTMLElement);
  }
  _connected = false;
  _tree;
  _input;
  dialog;
  constructor() {
    super();
    this._$connect[0].then(this.connect.bind(this));
  }
  _onBrowseClick(event) {
    this.dialog.showModal();
  }
  connect(event) {
    if (this._connected) return;
    this._connected = true;
    const inputSelector = this.getAttribute("input") || "input";
    let input = this.querySelector(inputSelector);
    if (input === null) {
      input = document.createElement("input");
      ;
      input.type = "text";
      this.append(input);
    }
    this._input = input;
    const buttonSelector = this.getAttribute("button") || "button:not(dialog button)";
    let button = this.querySelector(buttonSelector);
    if (button === null) {
      button = document.createElement("button");
      button.innerText = "browse";
      this.append(button);
    }
    button.addEventListener("click", this._onBrowseClick.bind(this));
    const dialogSelector = this.getAttribute("dialog") || `dialog`;
    const dialogElement = this.querySelector(dialogSelector);
    if (dialogElement === void 0) throw new Error(`dialog descendant is missing from selector:"${dialogSelector}"`);
    this.dialog = dialogElement;
    const treeComponent = this.querySelector("forge-tree");
  }
  set value(value) {
    console.log("SETING VALUE", value);
    this._$connect[0].then(function() {
      this._input.value = String(value);
    }.bind(this));
  }
  get value() {
    return this._input?.value;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FileBrowserInputHTMLElement
});
