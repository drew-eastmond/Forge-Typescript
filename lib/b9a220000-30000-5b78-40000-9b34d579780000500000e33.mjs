#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/dragdrop/DropManager.ts
import { Subscription } from "@onyx-ignition/forge";
import { DefaultMouseAdapter, PointerOptions } from "./0e9da0000-b0000-d069-c0000-9b34d579780000d00004415.mjs";
var DropManager = class _DropManager extends Subscription {
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
    this._inputAdapter = options.inputAdapter || new DefaultMouseAdapter(container);
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
    this._inputAdapter.subscribe(PointerOptions.MOUSE_UP, this._bindings.get(this._onDropStart));
    this._inputAdapter.subscribe(PointerOptions.HOLD_OVER, this._bindings.get(this._onDropOver));
    this._inputAdapter.subscribe(PointerOptions.DRAG_MOVE, this._bindings.get(this._onDropMove));
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
export {
  DropManager
};
