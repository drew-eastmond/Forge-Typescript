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

// ../Forge-Typescript-Source/src/ts/input/Input.ts
var Input_exports = {};
__export(Input_exports, {
  DefaultMouseAdapter: () => DefaultMouseAdapter,
  PointerInteraction: () => PointerInteraction,
  PointerOptions: () => PointerOptions
});
module.exports = __toCommonJS(Input_exports);
var import_forge = require("@onyx-ignition/forge");
var PointerOptions = /* @__PURE__ */ ((PointerOptions2) => {
  PointerOptions2["MOUSE_DOWN"] = "mouse-down";
  PointerOptions2["MOUSE_HOLD"] = "mouse-hold";
  PointerOptions2["HOLD_OVER"] = "hold-over";
  PointerOptions2["MOUSE_MOVE"] = "mouse-move";
  PointerOptions2["MOUSE_UP"] = "mouse-up";
  PointerOptions2["CLICK"] = "mouse-click";
  PointerOptions2["DoubleClick"] = "double-click";
  PointerOptions2["DRAG_START"] = "drag-start";
  PointerOptions2["DRAG_MOVE"] = "drag-move";
  PointerOptions2["DRAG_COMPLETE"] = "drag-complete";
  return PointerOptions2;
})(PointerOptions || {});
var PointerInteraction = class {
  initialX;
  initialY;
  mouseX;
  mouseY;
  offsetX;
  offsetY;
  target;
  current;
  event;
  constructor(mouseX, mouseY, event) {
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    this.event = event;
  }
};
var DefaultMouseAdapter = class extends import_forge.Subscription {
  _container;
  _abort;
  delay = 400;
  radius = 10;
  doubleClickDelay = 350;
  _doubleClickTimeout;
  _isDragging;
  _mouseDownEvent;
  _holdTimeout;
  initialX;
  initialY;
  offsetX;
  offsetY;
  mouseX;
  mouseY;
  _bindings = /* @__PURE__ */ new Map();
  constructor(element) {
    super();
    this._container = element;
    this._isDragging = false;
    this._bindings.set(this._onMouseMove, this._onMouseMove.bind(this));
    this._bindings.set(this._onMouseOver, this._onMouseOver.bind(this));
    this._bindings.set(this._onMouseOut, this._onMouseOut.bind(this));
    this._bindings.set(this._onMouseDown, this._onMouseDown.bind(this));
    this._bindings.set(this._onMouseUp, this._onMouseUp.bind(this));
    this._bindings.set(this._onMouseHold, this._onMouseHold.bind(this));
  }
  _pauseEvent(mouseEvent) {
    return false;
  }
  _basePointerInteraction(event) {
    const pointerInteraction = new PointerInteraction(event.pageX, event.pageY, event);
    if (this._mouseDownEvent !== void 0) {
      pointerInteraction.initialX = this._mouseDownEvent.pageX;
      pointerInteraction.initialY = this._mouseDownEvent.pageY;
      pointerInteraction.offsetX = this._mouseDownEvent.offsetX;
      pointerInteraction.offsetY = this._mouseDownEvent.offsetY;
    }
    let target;
    if (this._mouseDownEvent?.currentTarget === null || event.currentTarget === null) {
      const mouseX = event.pageX - window.scrollX;
      const mouseY = event.pageY - window.scrollY;
      const decendants = Array.from(this._container.querySelectorAll("*"));
      for (const descendant of decendants) {
        const rect = descendant.getBoundingClientRect();
        if (rect.left > mouseX || rect.right < mouseX) continue;
        if (rect.top > mouseY || rect.bottom < mouseY) continue;
        if (target === void 0 || target.contains(descendant) === true) target = descendant;
      }
    }
    pointerInteraction.target = target || event.target;
    pointerInteraction.current = pointerInteraction.target;
    return pointerInteraction;
  }
  _onMouseDown(event) {
    console.log("_onMouseDown", event);
    clearTimeout(this._holdTimeout);
    this._mouseDownEvent = event;
    this.notify("mouse-down" /* MOUSE_DOWN */, this._basePointerInteraction(event));
    this._holdTimeout = setTimeout(this._bindings.get(this._onMouseHold), this.delay);
  }
  _onMouseHold() {
    console.log("_onMouseHoldTimeout", this._mouseDownEvent);
    if (this._mouseDownEvent !== void 0) {
      this._isDragging = true;
      clearTimeout(this._holdTimeout);
      this.notify("mouse-hold" /* MOUSE_HOLD */, this._basePointerInteraction(this._mouseDownEvent));
    }
  }
  _onMouseMove(event) {
    if (this._isDragging) {
      this.notify("drag-move" /* DRAG_MOVE */, this._basePointerInteraction(event));
    } else if (this._mouseDownEvent) {
      const originX = this._mouseDownEvent.pageX;
      const originY = this._mouseDownEvent.pageY;
      const pageX = event.pageX;
      const pageY = event.pageY;
      const ax = pageX - originX;
      const by = pageY - originY;
      const dx = event.pageX - this._mouseDownEvent.pageX;
      const dy = event.pageY - this._mouseDownEvent.pageY;
      const distanceSq = dx * dx + dy * dy;
      if (Math.sqrt(distanceSq) > this.radius) {
        this._onMouseHold();
      }
    }
  }
  _onMouseOver(event) {
    if (this._isDragging) this.notify("hold-over" /* HOLD_OVER */, this._basePointerInteraction(event));
  }
  _onMouseOut(event) {
  }
  _onMouseUp(event) {
    clearTimeout(this._holdTimeout);
    if (this._mouseDownEvent === void 0) return;
    const interaction = this._basePointerInteraction(event);
    if (this._isDragging) {
      this.notify("drag-complete" /* DRAG_COMPLETE */, interaction);
    } else {
      const dx = event.pageX - this._mouseDownEvent.pageX;
      const dy = event.pageY - this._mouseDownEvent.pageY;
      const distanceSq = dx * dx + dy * dy;
      if (distanceSq < 50) this.notify("mouse-click" /* CLICK */, interaction);
    }
    const lastClickTime = Date.now();
    const clickDelay = setTimeout(function() {
      console.log("single click");
      this.notify("mouse-up" /* MOUSE_UP */, interaction);
      this._isDragging = false;
      this._mouseDownEvent = void 0;
    }.bind(this), this.doubleClickDelay);
    document.body.addEventListener("mouseup", function(event2) {
      clearTimeout(clickDelay);
      this._isDragging = false;
      this._mouseDownEvent = void 0;
      if (Date.now() - lastClickTime > this.doubleClickDelay) return;
      console.log("double click");
      const interaction2 = this._basePointerInteraction(event2);
      this.notify("double-click" /* DoubleClick */, interaction2);
    }.bind(this), { once: true });
  }
  get isDragging() {
    return this._isDragging;
  }
  activate() {
    if (this._abort) return;
    this._abort = new AbortController();
    const signal = this._abort.signal;
    this._container.addEventListener("mouseover", this._bindings.get(this._onMouseOver), { signal });
    this._container.addEventListener("mouseout", this._bindings.get(this._onMouseOut), { signal });
    this._container.addEventListener("mousedown", this._bindings.get(this._onMouseDown), { signal });
    document.body.addEventListener("mouseup", this._bindings.get(this._onMouseUp), { signal });
    document.body.addEventListener("mousemove", this._bindings.get(this._onMouseMove), { signal });
    window.addEventListener("blur", this._bindings.get(this._onMouseUp), { signal });
  }
  deactivate() {
    console.log("sdfsdf");
    this._abort.abort();
    this._abort = void 0;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DefaultMouseAdapter,
  PointerInteraction,
  PointerOptions
});
