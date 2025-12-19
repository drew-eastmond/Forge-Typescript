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

// ../Forge-Typescript-Source/src/ts/dragdrop/DragDropManager.ts
var DragDropManager_exports = {};
__export(DragDropManager_exports, {
  DragDropManager: () => DragDropManager
});
module.exports = __toCommonJS(DragDropManager_exports);
var import_DragManager = require("./242a60000-70000-d7ce-80000-9b34d579440000900007546.js");
var import_DropManager = require("./da5fa0000-b0000-830c-c0000-9b34d579440000d0000bdeb.js");
var import_Input = require("./951b20000-30000-8443-40000-9b34d579440000500000eed.js");
var import_forge = require("@onyx-ignition/forge");
var DragDropManager = class _DragDropManager extends import_forge.Subscription {
  static DRAG_START = "DRAG_START";
  static DRAG_MOVE = "DRAG_MOVE";
  static DRAG_END = "DRAG_COMPLETE";
  static DROP_OVER = "DROP_OVER";
  static DROP_START = "DROP_START";
  static DROP_MOVE = "DROP_MOVE";
  static DROP_CANCEL = "DROP_CANCEL";
  static DROP_COMPLETE = "DROP_COMPLETE";
  _iMouseAdapter;
  _dragManager;
  _dropManager;
  constructor(container, options) {
    super();
    this._iMouseAdapter = new import_Input.DefaultMouseAdapter(container);
    this._iMouseAdapter.subscribe(import_Input.PointerOptions.CLICK, this._onClick.bind(this));
    this._iMouseAdapter.subscribe(import_Input.PointerOptions.DoubleClick, this._onDoubleClick.bind(this));
    const selectors = options.selectors;
    this._dragManager = new import_DragManager.DragManager(container, { selectors, inputAdapter: this._iMouseAdapter });
    this._dragManager.subscribe(import_DragManager.DragManager.Events.DRAG_START, this._onDragStart.bind(this));
    this._dragManager.subscribe(import_DragManager.DragManager.Events.DRAG_MOVE, this._onDragMove.bind(this));
    this._dragManager.subscribe(import_DragManager.DragManager.Events.DRAG_COMPLETE, this._onDragComplete.bind(this));
    this._dragManager.subscribe(import_DragManager.DragManager.Events.DRAG_CANCEL, this._onDragCancel.bind(this));
    this._dropManager = new import_DropManager.DropManager(container, { selectors, inputAdapter: this._iMouseAdapter });
    this._dropManager.subscribe(import_DropManager.DropManager.Events.DROP_START, this._onDropStart.bind(this));
    this._dropManager.subscribe(import_DropManager.DropManager.Events.DROP_OVER, this._onDropOver.bind(this));
    this._dropManager.subscribe(import_DropManager.DropManager.Events.DROP_MOVE, this._onDropMove.bind(this));
  }
  _onClick(notify, interaction) {
    this.notify(import_Input.PointerOptions.CLICK, interaction);
  }
  _onDoubleClick(notify, interaction) {
    this.notify(import_Input.PointerOptions.DoubleClick, interaction);
  }
  _onDragStart(notify, dragManager) {
    this.notify(_DragDropManager.DRAG_START, this._dragManager);
  }
  _onDragMove(notify, dragManager) {
    if (this._dragManager.isDragging === false) return;
    this.notify(_DragDropManager.DRAG_MOVE, this._dragManager);
  }
  _onDragCancel(notify, dragManager) {
    console.warn("_onDragCancel", "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    this.notify(_DragDropManager.DRAG_END, this._dragManager);
  }
  _onDragComplete(notify, dragManager, pointerInteraction) {
    console.log("_onDragComplete", ">>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    this.notify(_DragDropManager.DRAG_END, this._dragManager);
    this._dropManager.start(pointerInteraction);
  }
  _onDropStart(notify, dropManager) {
    if (this._dragManager.isDragging === false) return;
    this.notify(_DragDropManager.DROP_START, this._dragManager, this._dropManager);
    const dragTarget = this._dragManager.current;
    const dropTarget = this._dropManager.current;
    if (dragTarget.isEqualNode(dropTarget)) this.notify(_DragDropManager.DROP_CANCEL, this._dragManager, this._dropManager);
    this.notify(_DragDropManager.DROP_COMPLETE, this._dragManager, this._dropManager);
  }
  _onDropMove(notify, dropManager) {
    if (this._dragManager.isDragging === false) return;
    this.notify(_DragDropManager.DROP_MOVE, this._dropManager);
  }
  _onDropOver(notify, dropManager) {
    if (this._dragManager.isDragging === false) return;
    this.notify(_DragDropManager.DROP_OVER, this._dropManager);
  }
  get dragManager() {
    return this._dragManager;
  }
  get dropManager() {
    return this._dropManager;
  }
  activate() {
    this._iMouseAdapter.activate();
    this._dragManager.activate();
    this._dropManager.activate();
  }
  deactivate() {
    this._iMouseAdapter.deactivate();
    this._dragManager.deactivate();
    this._dropManager.deactivate();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DragDropManager
});
