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

// ../Forge-Typescript-Source/src/ts/build/BuildClient.ts
var BuildClient_exports = {};
__export(BuildClient_exports, {
  BuildClient: () => BuildClient
});
module.exports = __toCommonJS(BuildClient_exports);
var import_forge = require("@onyx-ignition/forge");
var import_promises = require("node:fs/promises");
var import_Core = require("./7dd00000-0000-3afb-0000-9b34d5794200000000d7f0.js");
var import_LibraryBuilder = require("./d8ec60000-70000-1686-80000-9b34d579430000900006f71.js");
var import_TypesBuilder = require("./edc0e0000-f0000-05b1-00000-9b34d579430000100008616.js");
function SerializeResult(result) {
  const success = result.success;
  const serializedResult = [];
  for (const [component, attributes] of result) serializedResult.push([component, attributes]);
  return {
    success,
    result: serializedResult
  };
}
var BuildClient = class extends import_forge.ForgeClient {
  _contexts = /* @__PURE__ */ new Map();
  /* constructor(options: { key?: string, name?: string, race?: Record<string, number> }) {
  
          super(options);
  
      } */
  async $watch(data, session) {
    let { file, event } = data;
    file = file.replace(/\\/g, "/");
    (0, import_Core.UncacheFile)(file);
    const promises = [];
    for (const [hash, { filter, entry, target, build }] of this._contexts) {
      if (filter.test(file) === false) continue;
      promises.push((0, import_Core.$Build)(entry, build));
    }
    await Promise.allSettled(promises);
    return {
      success: true,
      message: `file :${file} flushed`
    };
  }
  async $reset(data, session) {
    const files = [
      ...await import_forge.ForgeFile.$Walk(import_forge.ForgePath.Resolve(__dirname, "./lib"), { recursive: false, directory: true }),
      ...await import_forge.ForgeFile.$Walk(import_forge.ForgePath.Resolve(__dirname, "./tmp"), { recursive: false, directory: true })
    ];
    const promises = [];
    for (const file of files) {
      promises.push((0, import_promises.rm)(file, { recursive: true, force: true }));
    }
    await Promise.allSettled(promises);
    return {
      success: true
    };
  }
  async $execute(signal, data, session) {
    console.cyan(`$execute`, signal);
    switch (signal.toLowerCase()) {
      /* case "uncache":
                      return this.Uncache(data, session);
      
                  case "cache":
                      return this.Cache(data, session); */
      case "add-context":
        return this.$startContext(data, session);
      case "remove-context":
        return this.$stopContext(data, session);
      case "bundle":
        return this.$bundle(data, session);
      case "library":
        return this.$library(data, session);
      case "types":
        return this.$types(data, session);
    }
    return { "execute": "empty function" };
  }
  async $route(request, response) {
    throw "ADD SOMETHING";
  }
  async $startContext(data, session) {
    const { entry, target } = data;
    let filter;
    try {
      if (data.filter) filter = new RegExp(data.filter);
    } catch (error) {
      console.red(data.filter, error);
    }
    const errors = [];
    const build = new import_Core.BuilderConfig(data.build);
    const hash = (0, import_forge.QuickHash)();
    this._contexts.set(hash, { filter, entry, target, build });
    return {
      success: true,
      hash,
      message: ``
    };
  }
  async $stopContext(data, session) {
    const hash = data.hash;
    if (hash === void 0 || this._contexts.has(hash) === false) return {
      success: false,
      message: `context does no exist for ${hash}`
    };
    this._contexts.delete(hash);
    return {
      success: true,
      message: `context does nto exist for ${hash}`
    };
  }
  async $bundle(data, session) {
    const { entry, build, target } = data;
    if (entry === void 0 || entry == "") throw `"in" property missing from action data`;
    return SerializeResult(await (0, import_Core.$Build)(entry, build));
  }
  async $library(data, session) {
    const { source, build } = data;
    const { root } = source;
    const files = source ? source.files : await import_forge.ForgeFile.$Walk(source.walk);
    const aliases = build.aliases;
    const library = new import_LibraryBuilder.LibraryBuilder();
    if (build.bundled == "mangle" || build.bundled == "preserve") {
      return SerializeResult(await library.$export({ files, root }, new import_Core.BuilderConfig(build), { join: "./lib/", ext: ".js" }));
    } else if (build.bundled == "merge") {
      const code2 = await library.$bundle({ files, root }, new import_Core.BuilderConfig(build));
      return {
        success: true,
        result: [{ code: code2 }, { code: true, source: true }]
      };
    }
    const code = await library.$merge({ root, files, aliases });
    return {
      success: true,
      result: [{ code }, { code: true, source: true }]
    };
  }
  async $listen(port, key) {
    if (this._server) return this._server;
    if (isNaN(port) === true) throw new Error(`Port not supplied to Socket Server`);
    this._server = new import_forge.ForgeWebSocketServer(port, key);
    this._server[import_forge.Reactivity].subscribe(async function([socket, header, data]) {
      if (header === void 0) return;
      try {
        this._$subscribeMessage("message", socket, header, data);
      } catch (error) {
        socket.reject(header, { error: String(error) });
      }
    }.bind(this));
    return this._server;
  }
  async $types(data, session) {
    const { entry, name, build, options: { ignore, temp } } = data;
    return SerializeResult(await (0, import_TypesBuilder.$BuildTypes)(entry, name, build, { ignore, temp }));
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BuildClient
});
