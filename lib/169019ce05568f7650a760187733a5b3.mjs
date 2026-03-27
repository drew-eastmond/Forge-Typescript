#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/formless/component/input/FileBrowserInputHTMLElement.ts
import { FormletHTMLElement } from "./2c575cd0ae990e09df23966774764693.mjs";
var FileBrowserInputHTMLElement = class _FileBrowserInputHTMLElement extends FormletHTMLElement {
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
export {
  FileBrowserInputHTMLElement
};
