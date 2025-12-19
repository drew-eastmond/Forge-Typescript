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

// ../Forge-Typescript-Source/src/ts/dragdrop/DragManager.ts
var DragManager_exports = {};
__export(DragManager_exports, {
  DragManager: () => DragManager
});
module.exports = __toCommonJS(DragManager_exports);
var import_forge = require("@onyx-ignition/forge");
var import_Input = require("./951b20000-30000-8443-40000-9b34d579440000500000eed.js");
var DragManager = class _DragManager extends import_forge.Subscription {
  static Events = {
    DRAG_START: "DRAG_START",
    DRAG_OVER: "DRAG_OVER",
    DRAG_MOVE: "DRAG_MOVE",
    DRAG_COMPLETE: "DRAG_COMPLETE",
    DRAG_CANCEL: "DRAG_CANCEL"
  };
  _container;
  _inputAdapter;
  _bindings = /* @__PURE__ */ new Map();
  _isDragging;
  offsetX;
  offsetY;
  mouseX;
  mouseY;
  handleSelector;
  closestSelector;
  target;
  current;
  over;
  out;
  events = /* @__PURE__ */ new Map();
  constructor(container, options) {
    super();
    this._container = container;
    this._inputAdapter = options.inputAdapter || new import_Input.DefaultMouseAdapter(container);
    if (options.selectors.handle === void 0) throw new Error(`DragManager requires a handle selector`);
    if (options.selectors.closest === void 0) throw new Error(`DragManager requires a element selector`);
    this.handleSelector = options.selectors.handle;
    this.closestSelector = options.selectors.closest;
    this._isDragging = false;
    this._bindings.set(this._onDragStart, this._onDragStart.bind(this));
    this._bindings.set(this._onDragMove, this._onDragMove.bind(this));
    this._bindings.set(this._onDragOver, this._onDragOver.bind(this));
    this._bindings.set(this._onDragComplete, this._onDragComplete.bind(this));
  }
  _onDragStart(notify, pointerInteraction) {
    console.log("_onDragStart");
    const target = pointerInteraction.target;
    const handles = Array.from(this._container.querySelectorAll(this.handleSelector));
    for (const element of handles) {
      if (element.isEqualNode(target)) {
        this.mouseX = pointerInteraction.mouseX;
        this.mouseY = pointerInteraction.mouseY;
        this.offsetX = pointerInteraction.offsetX;
        this.offsetY = pointerInteraction.offsetY;
        this.target = target;
        this.current = target.closest(this.closestSelector) || target;
        this._isDragging = true;
        this.notify(_DragManager.Events.DRAG_START, this);
        this.notify(_DragManager.Events.DRAG_OVER, this, this.current);
        return;
      }
    }
    this._isDragging = false;
  }
  _onDragMove(notify, pointerInteraction) {
    if (this._isDragging) {
      this.mouseX = pointerInteraction.mouseX;
      this.mouseY = pointerInteraction.mouseY;
      this.notify(_DragManager.Events.DRAG_MOVE, this);
    }
  }
  _onDragOver(notify, pointerInteraction) {
    if (this._isDragging) {
      const target = pointerInteraction.target;
      this.over = target.closest(this.closestSelector) || target;
      this.notify(_DragManager.Events.DRAG_OVER, this.over);
    }
  }
  _onDragComplete(notify, pointerInteraction) {
    if (this._isDragging) this.notify(_DragManager.Events.DRAG_COMPLETE, this, pointerInteraction);
    this._isDragging = false;
  }
  get isDragging() {
    return this._isDragging;
  }
  activate() {
    this._inputAdapter.subscribe(import_Input.PointerOptions.MOUSE_HOLD, this._bindings.get(this._onDragStart));
    this._inputAdapter.subscribe(import_Input.PointerOptions.DRAG_MOVE, this._bindings.get(this._onDragMove));
    this._inputAdapter.subscribe(import_Input.PointerOptions.HOLD_OVER, this._bindings.get(this._onDragOver));
    this._inputAdapter.subscribe(import_Input.PointerOptions.DRAG_COMPLETE, this._bindings.get(this._onDragComplete));
  }
  deactivate() {
    this._inputAdapter.unsubscribe(this._bindings.get(this._onDragStart));
    this._inputAdapter.unsubscribe(this._bindings.get(this._onDragMove));
    this._inputAdapter.unsubscribe(this._bindings.get(this._onDragOver));
    this._inputAdapter.unsubscribe(this._bindings.get(this._onDragComplete));
  }
  cancel() {
    this._isDragging = false;
    this.notify(_DragManager.Events.DRAG_CANCEL, this);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DragManager
});
