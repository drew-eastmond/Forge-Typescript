#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/build/BuildClient.ts
import { ForgeClient, ForgeFile, ForgePath, ForgeWebSocketServer, QuickHash, Reactivity } from "@onyx-ignition/forge";
import { rm } from "node:fs/promises";
import { $Build, BuilderConfig, UncacheFile } from "./a43b20000-30000-9ba4-40000-9b34d579780000500001126.mjs";
import { LibraryBuilder } from "./0834e0000-f0000-ea4b-00000-9b34d57978000010000fc18.mjs";
import { $BuildTypes } from "./274160000-70000-902c-80000-9b34d57978000090000e343.mjs";
function SerializeResult(result) {
  const success = result.success;
  const serializedResult = [];
  for (const [component, attributes] of result) serializedResult.push([component, attributes]);
  return {
    success,
    result: serializedResult
  };
}
var BuildClient = class extends ForgeClient {
  _contexts = /* @__PURE__ */ new Map();
  /* constructor(options: { key?: string, name?: string, race?: Record<string, number> }) {
  
          super(options);
  
      } */
  async $watch(data, session) {
    let { file, event } = data;
    file = file.replace(/\\/g, "/");
    UncacheFile(file);
    const promises = [];
    for (const [hash, { filter, entry, target, build }] of this._contexts) {
      if (filter.test(file) === false) continue;
      promises.push($Build(entry, build));
    }
    await Promise.allSettled(promises);
    return {
      success: true,
      message: `file :${file} flushed`
    };
  }
  async $reset(data, session) {
    const files = [
      ...await ForgeFile.$Walk(ForgePath.Resolve(__dirname, "./lib"), { recursive: false, directory: true }),
      ...await ForgeFile.$Walk(ForgePath.Resolve(__dirname, "./tmp"), { recursive: false, directory: true })
    ];
    const promises = [];
    for (const file of files) {
      promises.push(rm(file, { recursive: true, force: true }));
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
    const build = new BuilderConfig(data.build);
    const hash = QuickHash();
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
    return SerializeResult(await $Build(entry, build));
  }
  async $library(data, session) {
    const { source, build } = data;
    const { root } = source;
    const files = source ? source.files : await ForgeFile.$Walk(source.walk);
    const aliases = build.aliases;
    const library = new LibraryBuilder();
    if (build.bundled == "mangle" || build.bundled == "preserve") {
      return SerializeResult(await library.$export({ files, root }, new BuilderConfig(build), { join: "./lib/", ext: ".js" }));
    } else if (build.bundled == "merge") {
      const code2 = await library.$bundle({ files, root }, new BuilderConfig(build));
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
    this._server = new ForgeWebSocketServer(port, key);
    this._server[Reactivity].subscribe(async function([socket, header, data]) {
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
    return SerializeResult(await $BuildTypes(entry, name, build, { ignore, temp }));
  }
};
export {
  BuildClient
};
