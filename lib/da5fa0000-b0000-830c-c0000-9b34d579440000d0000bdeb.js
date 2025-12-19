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

// ../Forge-Typescript-Source/src/ts/dragdrop/DropManager.ts
var DropManager_exports = {};
__export(DropManager_exports, {
  DropManager: () => DropManager
});
module.exports = __toCommonJS(DropManager_exports);
var import_forge = require("@onyx-ignition/forge");
var import_Input = require("./951b20000-30000-8443-40000-9b34d579440000500000eed.js");
var DropManager = class _DropManager extends import_forge.Subscription {
  static Events = {
    DROP_START: "DROP_START",
    DROP_OVER: "DROP_OVER",
    DROP_MOVE: "DROP_MOVE"
  };
  _container;
  _inputAdapter;
  _closestSelector;
  _bindings = /* @__PURE__ */ new Map();
  target;
  current;
  over;
  out;
  offsetX;
  offsetY;
  mouseX;
  mouseY;
  localX;
  localY;
  constructor(container, options) {
    super();
    this._container = container;
    this._inputAdapter = options.inputAdapter || new import_Input.DefaultMouseAdapter(container);
    this._closestSelector = options.selectors.closest;
    this._bindings.set(this._onDropStart, this._onDropStart.bind(this));
    this._bindings.set(this._onDropOver, this._onDropOver.bind(this));
    this._bindings.set(this._onDropMove, this._onDropMove.bind(this));
  }
  _onDropStart(notify, pointerInteraction) {
    const target = pointerInteraction.target;
    const current = target.closest(this._closestSelector) || target;
    const elements = Array.from(this._container.querySelectorAll(this._closestSelector));
    for (const element of elements) {
      if (element.isEqualNode(current)) {
        this.mouseX = pointerInteraction.mouseX;
        this.mouseY = pointerInteraction.mouseY;
        this.offsetX = pointerInteraction.offsetX;
        this.offsetY = pointerInteraction.offsetY;
        this.over = element;
        this.current = element;
        this.target = target;
        const domRect = this.target.getBoundingClientRect();
        this.localX = this.mouseX - window.scrollX - domRect.x;
        this.localY = this.mouseY - window.scrollY - domRect.y;
        this.notify(_DropManager.Events.DROP_START, this);
        return;
      }
    }
  }
  _onDropOver(notify, pointerInteraction) {
    const current = pointerInteraction.target.closest(this._closestSelector) || pointerInteraction.target;
    const elements = Array.from(this._container.querySelectorAll(this._closestSelector));
    for (const element of elements) {
      if (element.isEqualNode(current)) {
        this.mouseX = pointerInteraction.mouseX;
        this.mouseY = pointerInteraction.mouseY;
        this.offsetX = pointerInteraction.offsetX;
        this.offsetY = pointerInteraction.offsetY;
        this.target = pointerInteraction.target;
        this.current = element;
        this.over = current;
        this.notify(_DropManager.Events.DROP_OVER, this);
        return;
      }
    }
  }
  _onDropMove(notify, pointerInteraction) {
    const current = pointerInteraction.target.closest(this._closestSelector) || pointerInteraction.target;
    const elements = Array.from(this._container.querySelectorAll(this._closestSelector));
    for (const element of elements) {
      if (element.isEqualNode(current)) {
        this.mouseX = pointerInteraction.mouseX;
        this.mouseY = pointerInteraction.mouseY;
        this.offsetX = pointerInteraction.offsetX;
        this.offsetY = pointerInteraction.offsetY;
        this.target = pointerInteraction.target;
        this.current = element;
        this.over = element;
        const domRect = element.getBoundingClientRect();
        this.localX = this.mouseX - window.scrollX - domRect.x;
        this.localY = this.mouseY - window.scrollY - domRect.y;
        this.notify(_DropManager.Events.DROP_MOVE, this);
        return;
      }
    }
  }
  activate() {
    this._inputAdapter.subscribe(import_Input.PointerOptions.MOUSE_UP, this._bindings.get(this._onDropStart));
    this._inputAdapter.subscribe(import_Input.PointerOptions.HOLD_OVER, this._bindings.get(this._onDropOver));
    this._inputAdapter.subscribe(import_Input.PointerOptions.DRAG_MOVE, this._bindings.get(this._onDropMove));
  }
  deactivate() {
    this._inputAdapter.unsubscribe(this._bindings.get(this._onDropStart));
    this._inputAdapter.unsubscribe(this._bindings.get(this._onDropOver));
    this._inputAdapter.unsubscribe(this._bindings.get(this._onDropMove));
  }
  start(pointerInteraction) {
    this._onDropStart(_DropManager.Events.DROP_START, pointerInteraction);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DropManager
});
