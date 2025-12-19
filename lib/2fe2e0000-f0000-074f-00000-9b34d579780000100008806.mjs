#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/dragdrop/DragManager.ts
import { Subscription } from "@onyx-ignition/forge";
import { DefaultMouseAdapter, PointerOptions } from "./0e9da0000-b0000-d069-c0000-9b34d579780000d00004415.mjs";
var DragManager = class _DragManager extends Subscription {
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
    this._inputAdapter = options.inputAdapter || new DefaultMouseAdapter(container);
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
    this._inputAdapter.subscribe(PointerOptions.MOUSE_HOLD, this._bindings.get(this._onDragStart));
    this._inputAdapter.subscribe(PointerOptions.DRAG_MOVE, this._bindings.get(this._onDragMove));
    this._inputAdapter.subscribe(PointerOptions.HOLD_OVER, this._bindings.get(this._onDragOver));
    this._inputAdapter.subscribe(PointerOptions.DRAG_COMPLETE, this._bindings.get(this._onDragComplete));
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
export {
  DragManager
};
