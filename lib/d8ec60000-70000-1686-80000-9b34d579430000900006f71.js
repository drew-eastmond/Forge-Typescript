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

// ../Forge-Typescript-Source/src/ts/build/LibraryBuilder.ts
var LibraryBuilder_exports = {};
__export(LibraryBuilder_exports, {
  LibraryBuilder: () => LibraryBuilder
});
module.exports = __toCommonJS(LibraryBuilder_exports);
var import_forge = require("@onyx-ignition/forge");
var import_FileCache = require("./0726e0000-f0000-a028-00000-9b34d5794400001000038b7.js");
var import_Core = require("./7dd00000-0000-3afb-0000-9b34d5794200000000d7f0.js");
function ExportPlugin(files, hashes, resolves) {
  const errors = [];
  return {
    name: "forge-export-library",
    setup: function(build) {
      build.onResolve({ filter: /.+/ }, async function(args) {
        let { path, resolveDir, importer } = args;
        if (resolves.directories) {
          for (const [match, replace] of Object.entries(resolves.directories)) {
            if (path.startsWith(match)) path = path.replace(match, import_forge.ForgePath.Resolve(replace) + "/");
          }
        }
        for (const ext of [".ts", ".tsx", ".jsx", ".js"]) {
          const absolutePath = import_forge.ForgePath.Resolve(resolveDir, `${path}${ext}`);
          const relativePath = import_forge.ForgePath.Relative(resolveDir, absolutePath);
          if (await import_forge.ForgeFile.$FileExist(absolutePath)) {
            if (resolves.files[absolutePath]) {
              return { path: resolves.files[absolutePath], external: true };
            } else if (files.includes(absolutePath)) {
              const importParsed = import_forge.ForgePath.Parse(importer);
              if (importParsed.name == "{index}") return { path: hashes.get(absolutePath).path, external: true, namespace: "remapped" };
              const pathParsed = import_forge.ForgePath.Parse(hashes.get(absolutePath).path);
              return { path: "./" + pathParsed.base, external: true, namespace: "remapped" };
              return { namespace: "ignore" };
            }
            console.red(`Unresolved file found`, absolutePath, resolves, files);
            errors.push(`Unresolved file found: ${absolutePath}`);
          }
        }
        return { path, external: true };
      });
      build.onLoad({ filter: /\.((ts|x$)|(js|x))/ }, async function(args) {
        console.magenta("onload", args);
        const { path } = args;
        const contents = hashes.has(path) ? hashes.get(path).contents : await import_FileCache.FileCache.$FetchString(path);
        return { contents, loader: "tsx" };
      });
      build.onEnd(function() {
        if (errors.length) console.log("errors", errors);
        if (errors.length) throw new Error(`Error found compiling ${errors}`);
      });
    }
  };
}
var LibraryBuilder = class {
  _exportedComponents = /* @__PURE__ */ new Set();
  _sanitizeSources({ root, files }, aliases) {
    const sanitizedFiles = [];
    for (const file of files) sanitizedFiles.push(import_forge.ForgePath.Resolve(file));
    const sanitizedResolves = {};
    for (const [file, resolve] of Object.entries(aliases.files)) {
      if (import_forge.ForgePath.IsAbsolute(file)) {
        sanitizedResolves[file] = resolve;
      } else {
        sanitizedResolves[import_forge.ForgePath.Resolve(root, file)] = resolve;
      }
    }
    return [{
      root,
      files: sanitizedFiles
    }, {
      files: sanitizedResolves,
      directories: aliases.directories
    }];
  }
  async _$extractImportations(file, root, javascript) {
    const parsedPath = import_forge.ForgePath.Parse(file);
    const name = parsedPath.name;
    const code = await import_FileCache.FileCache.$FetchString(file);
    const importations = /* @__PURE__ */ new Set();
    const skippedImportations = [];
    const regExp = javascript === true ? /(^|\n)\s*export\s+(default)?((async function)|function|class|var|const|let)\s+(?<component>[$\w]+)/gm : /(^|\n)\s*export\s+(default)?((async function)|function|class|enum|interface|var|const|let|type)\s+(?<component>[$\w]+)/gm;
    let results;
    while (results = regExp.exec(code)) {
      const exportName = results.groups.component;
      const tranformsResults = new RegExp(`${exportName}\\d+`).exec(code);
      const transformedExport = tranformsResults ? tranformsResults[0] : exportName;
      if (this._exportedComponents.has(exportName)) {
        if (importations.has(exportName) === false) skippedImportations.push(exportName);
      } else {
        importations.add(exportName);
      }
      this._exportedComponents.add(transformedExport);
    }
    let importEntry = importations.size == 0 ? "// " : "";
    importEntry += `import { ${[...importations].join(", ")} } from "${import_forge.ForgePath.Relative(root, parsedPath.dir)}/${name}";`.replace(/\\/g, "/").replace(".//", "./");
    if (skippedImportations.length) importEntry += ` // skipped imports :{ ${skippedImportations.join(", ")} }`;
    return importEntry;
  }
  async $merge(sources, alias, basic) {
    const { files, root } = sources;
    const importations = [];
    for (const file of files) importations.push(await this._$extractImportations(file, root, basic));
    return `${importations.join("\n")}
        
export {

${[...this._exportedComponents].map((value) => "	" + value.replace(/[^\w$]+/g, "_")).join(",\n")} 
            
};`;
  }
  async $bundle(sources, buildOptions) {
    const [{ files, root }, aliases] = this._sanitizeSources(sources, buildOptions.aliases);
    const contents = await this.$merge(sources, buildOptions.aliases);
    const result = await (0, import_Core.$Transform)({ root, contents }, buildOptions, {
      plugins: [{
        name: "forge-library-bundle",
        setup(build) {
          build.onResolve({ filter: /.+/ }, async function(args) {
            const { path, resolveDir } = args;
            for (const ext of [".ts", ".tsx", ".jsx", ".js"]) {
              const absolutePath = import_forge.ForgePath.Resolve(resolveDir, `${path}${ext}`);
              if (aliases[absolutePath]) return { path: aliases[absolutePath], external: true };
              if (files.includes(absolutePath) === false) return { path, external: true };
              if (await import_forge.ForgeFile.$FileExist(absolutePath)) return { path: absolutePath, external: false };
            }
            return { path, external: true };
          });
        }
      }]
    });
    return result.or({ code: true }).first.code;
  }
  async $export(sources, buildOptions, libraryExport) {
    let [{ files, root }, aliases] = this._sanitizeSources(sources, buildOptions.aliases);
    files = files.filter((file) => buildOptions.ignores.includes(file) === false);
    const hashes = /* @__PURE__ */ new Map();
    const { bundled } = buildOptions;
    for (const file of files) {
      let path;
      if (bundled == "preserve") {
        const parsedFile = import_forge.ForgePath.Parse(file);
        path = import_forge.ForgePath.Join(libraryExport.join, import_forge.ForgePath.Relative(root, import_forge.ForgePath.Join(parsedFile.dir, parsedFile.name))) + libraryExport.ext;
      } else if (bundled == "mangle") {
        path = import_forge.ForgePath.Join(libraryExport.join, (0, import_forge.QuickHash)()) + libraryExport.ext;
      }
      hashes.set(file, { path, contents: await import_FileCache.FileCache.$FetchString(file) });
    }
    const bundle = new import_forge.Result();
    const contents = await this.$merge({ files, root }, aliases, true);
    const plugins = buildOptions.bundled == "preserve" || buildOptions.bundled == "mangle" ? [ExportPlugin(files, hashes, aliases)] : [];
    const transformResult = await (0, import_Core.$Transform)({ root, contents, source: "{index}" }, buildOptions, { plugins });
    if (transformResult.success === false) return transformResult;
    const { code } = transformResult.or({ code: true }).first;
    bundle.add({ code, path: "{index}" }, { code: true, index: true });
    for (const file of files) {
      if (buildOptions.ignores.includes(file)) {
        console.red("ignore found", file);
        continue;
      }
      const { contents: contents2, path } = hashes.get(file);
      const fileParsed = import_forge.ForgePath.Parse(file);
      const transformResult2 = await (0, import_Core.$Transform)({ root: fileParsed.dir, contents: contents2, source: file }, buildOptions, { plugins });
      if (transformResult2.success === false) {
        for (const [component, attributes] of transformResult2) console.log(attributes, component);
        throw `Error compiling library.$Export( ): ${file}`;
      }
      const { code: code2 } = transformResult2.or({ code: true }).first;
      bundle.add({ code: code2, path }, { code: true, dependency: true });
    }
    return bundle;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LibraryBuilder
});
