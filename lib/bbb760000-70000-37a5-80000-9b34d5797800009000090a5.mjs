#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/FileCache.ts
import { ForgeFile } from "@onyx-ignition/forge";
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
    const buffer = await ForgeFile.$Read(url);
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
export {
  FileCache
};
