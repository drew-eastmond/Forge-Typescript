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

// ../Forge-Typescript-Source/src/ts/FileCache.ts
var FileCache_exports = {};
__export(FileCache_exports, {
  FileCache: () => FileCache
});
module.exports = __toCommonJS(FileCache_exports);
var import_forge = require("@onyx-ignition/forge");
var FileCacheInternal = class {
  _cache = /* @__PURE__ */ new Map();
  _decoder = new TextDecoder();
  Has(url) {
    return this._cache.has(url);
  }
  async $FetchString(url) {
    return this._decoder.decode(await this.$Fetch(url));
  }
  async $Fetch(url) {
    if (this._cache.has(url)) return this._cache.get(url);
    const buffer = await import_forge.ForgeFile.$Read(url);
    this._cache.set(url, buffer);
    return buffer;
  }
  Cache(url, data) {
    if (this._cache.has(url)) return false;
    this._cache.set(url, data);
    return true;
  }
  Uncache(url) {
    return this._cache.delete(url);
  }
  Clear() {
    this._cache.clear();
  }
};
var FileCache = new FileCacheInternal();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FileCache
});
