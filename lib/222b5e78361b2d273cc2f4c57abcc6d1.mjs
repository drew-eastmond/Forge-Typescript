#! /usr/bin/env node

"forge://platform(browser)";

// ../Forge-Typescript-Source/src/ts/formless/FormlessModelProxy.ts
import { $UsePromise, AbstractForgeModelProxy, DecodeAttributes, EncodeAttributes, ForgeModelRouteAccess, ForgeStore, QuickHash } from "@onyx-ignition/forge";
var AbstractCommand = class {
  _requestInit;
  $settled = $UsePromise();
  session;
  constructor(requestInit) {
    this._requestInit = requestInit;
  }
  async $flush(url, requestInit) {
    const response = await fetch(url, requestInit);
    if (response.ok === false) throw "FAILED BRANCH";
    const result = await response.arrayBuffer();
    this.$settled[1](result);
    return result;
  }
};
var BranchCommand = class extends AbstractCommand {
  _branches;
  constructor(requestInit, branches) {
    super(requestInit);
    this._branches = branches;
  }
  async $flush(url, requestInit) {
    const session = this.session;
    const body = EncodeAttributes({ branch: this._branches, session });
    return super.$flush(url, { ...this._requestInit, ...requestInit, body });
  }
};
var MutateCommand = class extends AbstractCommand {
  _mutations;
  constructor(requestInit, mutations) {
    super(requestInit);
    this._mutations = mutations;
  }
  async $flush(url, requestInit) {
    const session = this.session;
    const body = EncodeAttributes({ mutate: this._mutations, session });
    return super.$flush(url, { ...this._requestInit, ...requestInit, body });
  }
};
var ClientModelProxy = class _ClientModelProxy extends AbstractForgeModelProxy {
  static Mime = "application/json; charset=utf-16";
  _url;
  _refresh;
  _headers;
  _access;
  _stores = /* @__PURE__ */ new Map();
  _hashes = /* @__PURE__ */ new Map();
  _flushes = /* @__PURE__ */ new Set();
  constructor(model, url, refresh) {
    super(model);
    this._url = url;
    this._refresh = refresh;
  }
  /* public async *[Symbol.asyncIterator](): AsyncIterableIterator<IForgeStore> {
  
          const stores: IForgeStore[] = await this._$sources[0];
          for (const store of stores) yield store;
  
      } */
  /* public [Reactivity](): IReactor<IForgeStore[]> {
  
          return this._reactor;
  
      } */
  /* public get $sources(): Promise<IForgeStore[]> {
  
          return this._$sources[0];
  
      } */
  async _$refresh(stores) {
    const hashes = [];
    for (const store of stores) if (this._hashes.has(store)) hashes.push(store.hash);
    const body = EncodeAttributes({ stores: hashes });
    const response = await fetch(this._url, {
      method: "POST",
      headers: {
        ...this._headers,
        access: this._access[ForgeModelRouteAccess.Read],
        "Content-Type": _ClientModelProxy.Mime
      },
      body
    });
    if (response.ok === false) throw new Error(`Response status: ${response.status}`);
    const buffer = await response.arrayBuffer();
    const storesData = DecodeAttributes(buffer);
    const promises = [];
    const sources = [];
    for (const [key, writeData] of Object.entries(storesData)) {
      const store = this._stores.get(key);
      promises.push(store.$write(writeData.buffer, writeData.mime));
      sources.push(store);
    }
    await Promise.allSettled(promises);
    return sources;
  }
  async $branch(parentStore, childStore) {
    const parent = this._hashes.get(parentStore);
    const attributes = childStore.attributes;
    const body = await childStore.$read();
    const session = QuickHash();
    const requestData = {
      method: "POST",
      headers: {
        ...this._headers,
        access: this._access[ForgeModelRouteAccess.Branch],
        "Content-Type": _ClientModelProxy.Mime
      }
    };
    const command = new BranchCommand(requestData, [{ parent, attributes, body }]);
    this._flushes.add(command);
    const hashes = this._hashes;
    const stores = this._stores;
    command.$settled[0].then(async function(response) {
      const { branch } = DecodeAttributes(await response.arrayBuffer());
      const hash = branch[session];
      hashes.set(childStore, hash);
      stores.set(hash, childStore);
    });
  }
  async $mutate(store, mutatedStore) {
    const hash = this._hashes.get(store);
    const body = await mutatedStore.$read();
    const requestInit = {
      method: "POST",
      headers: {
        ...this._headers,
        access: this._access[ForgeModelRouteAccess.Mutate],
        "Content-Type": _ClientModelProxy.Mime
      }
    };
    const command = new MutateCommand(requestInit, { [hash]: body });
    this._flushes.add(command);
    const hashes = this._hashes;
    const stores = this._stores;
    command.$settled[0].then(async function(response) {
      const { mutate } = DecodeAttributes(await response.arrayBuffer());
      const mutatedHash = mutate[hash];
      hashes.set(mutatedStore, mutatedHash);
      stores.set(mutatedHash, mutatedStore);
      hashes.delete(store);
      stores.delete(hash);
    });
  }
  async $frame() {
    const previousStores = new Map(this._stores);
    this._stores.clear();
    this._hashes.clear();
    const response = await fetch(this._url, {
      headers: {
        [this._refresh[0]]: this._refresh[1],
        access: this._refresh[2]
      }
    });
    if (response.ok === false) throw new Error(`Response status: ${response.status}`);
    const buffer = await response.arrayBuffer();
    const permission = DecodeAttributes(buffer);
    const verifications = permission.verifications;
    this._headers = {
      [permission.state[0]]: permission.state[1],
      [permission.permit[0]]: permission.permit[1],
      ...verifications
    };
    console.warn(" ");
    console.log("_headers", this._headers);
    console.log("permission", permission);
    console.warn(" ");
    this._access = permission.access;
    const promises = [];
    const storesData = permission.stores;
    for (const [hash, attributes] of Object.entries(storesData)) {
      if (this._stores.has(hash)) continue;
      const store = previousStores.get(hash) || new ForgeStore(attributes);
      ForgeStore.AssignHash(store, hash);
      promises.push(store.$connect(this._model));
      this._stores.set(hash, store);
      this._hashes.set(store, hash);
    }
    previousStores.clear();
    await Promise.allSettled(promises);
  }
  async $flush() {
    try {
      const commands = [...this._flushes];
      this._flushes.clear();
      for (const command of commands) {
        this._flushes.delete(command);
        await command.$flush(this._url, {});
      }
    } catch (error) {
      this._flushes.clear();
    }
  }
};
export {
  ClientModelProxy
};
