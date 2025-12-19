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

// ../Forge-Typescript-Source/src/ts/build/typescript/TypescriptFile.ts
var TypescriptFile_exports = {};
__export(TypescriptFile_exports, {
  TypescriptFile: () => TypescriptFile
});
module.exports = __toCommonJS(TypescriptFile_exports);
var import_forge = require("@onyx-ignition/forge");
var import_Core = require("./7dd00000-0000-3afb-0000-9b34d5794200000000d7f0.js");
var TypescriptFileTraversal = class {
  _root;
  _externals;
  _$fetch;
  _imports = /* @__PURE__ */ new Map();
  files = /* @__PURE__ */ new Map();
  /**
   * 
   * @param root directory of of root of all Typescript file wintin the graph
   * @param options
   */
  constructor(root, options) {
    this._root = import_forge.ForgePath.Resolve(root);
    this._$fetch = options.$fetch;
    this._externals = options.externals.map((value) => value.toLowerCase());
  }
  _dependencies(parent, traversal) {
    if (traversal.has(parent)) return traversal;
    traversal.add(parent);
    for (const [dependency, components] of parent.imports) {
      if (this.files.has(dependency) === false) continue;
      const dependentScript = this.files.get(dependency);
      this._dependencies(dependentScript, traversal);
    }
    return traversal;
  }
  hasDependency(root, child) {
    const traversal = this._dependencies(root, /* @__PURE__ */ new Set());
    return traversal.has(child);
  }
  async $add(file) {
    if (this._externals.includes(file.toLowerCase()) || import_forge.ForgeNPM.IsInternalPackage(file)) {
      console.red("package found", file, import_forge.ForgeNPM.IsInternalPackage(file));
      return false;
    } else {
      console.yellow("not package", file);
    }
    let absoluteFile = import_forge.ForgePath.IsAbsolute(file) ? file : import_forge.ForgePath.Resolve(this._root, file);
    const parsedFile = import_forge.ForgePath.Parse(absoluteFile);
    const resolvedFile = import_forge.ForgePath.Resolve(parsedFile.dir, parsedFile.name);
    if (this.files.has(resolvedFile) === false) {
      try {
        const entry = resolvedFile;
        const root = this._root;
        const typescriptFile = new TypescriptFile({ entry, root }, { $fetch: this._$fetch, externals: this._externals });
        await typescriptFile.$load(resolvedFile);
        this.files.set(resolvedFile, typescriptFile);
        this._imports.set(resolvedFile, [...typescriptFile.imports.keys()]);
        await typescriptFile.$traverse(this);
      } catch (error) {
        console.red(error);
      }
    }
    return true;
  }
  /**
   * 
   * Sort all files based on import sequencing
   * 
   */
  sort() {
    const entries = [...this.files];
    const sortedFiles = [];
    for (const [file, typescriptFile] of entries) {
      let includeAdded = false;
      for (let i = 0; i < sortedFiles.length; i++) {
        if (this.hasDependency(sortedFiles[i], typescriptFile)) {
          sortedFiles.splice(i, 0, typescriptFile);
          includeAdded = true;
          break;
        }
      }
      if (includeAdded === false) sortedFiles.push(typescriptFile);
    }
    this.files.clear();
    for (const file of sortedFiles) this.files.set(file.path.resolved, file);
  }
};
var TypescriptFile = class _TypescriptFile {
  /**
   * 
   * Universal callback to fetch file contents based on the path. Best used for caching but default to readoing from ta
   * 
   * @param file
   * @returns
   */
  static async $Fetch(file) {
    const { dir, name, ext } = import_forge.ForgePath.Parse(file);
    const extensions = [ext, `.ts`, `.js`, `.tsx`, `.jsx`];
    for (const ext2 of extensions) {
      try {
        const currentFile = `${dir}/${name}${ext2}`;
        const code = await import_forge.ForgeFile.$ReadDecoded(currentFile, "utf-8");
        return code;
      } catch (error) {
      }
    }
    throw new Error(`No file variations for:
"${file}"`);
  }
  _path;
  _code;
  _root;
  _$fetch;
  _externals = [];
  imports = /* @__PURE__ */ new Map();
  exports = /* @__PURE__ */ new Set();
  hash = (0, import_forge.QuickHash)({ join: "_" });
  constructor({ entry, root }, options) {
    this._root = root;
    const fileParsed = import_forge.ForgePath.Parse(entry);
    this._path = { relative: import_forge.ForgePath.Relative(this._root, entry), dir: fileParsed.dir, name: fileParsed.name, resolved: import_forge.ForgePath.Resolve(fileParsed.dir, fileParsed.name) };
    this._$fetch = /* options?.$fetch || */
    _TypescriptFile.$Fetch;
    if (options?.externals) for (const entry2 of options.externals) this._externals.push(entry2.toLowerCase());
  }
  /**
   * 
   * 
   * 
   * @return { relative: string, resolved: string, dir: string }
   */
  get path() {
    return this._path;
  }
  set code(value) {
    this._code = value;
    {
      this.imports.clear();
      const regExp = /(?<![^\s]+)\s*import(\s+\{\s*(?<components>.+?)\s*\}).+?["'`](?<file>.+?)["'`];\s*/g;
      let results;
      while (results = regExp.exec(this._code)) {
        const components = new Set(results.groups.components.split(/,\s*/));
        let { file } = results.groups;
        if (this._externals.includes(file.toLowerCase()) === false && import_forge.ForgeNPM.IsInternalPackage(file) === false) {
          file = import_forge.ForgePath.Sanitize(this._path.dir, results.groups.file);
        }
        this.imports.set(file, components);
      }
    }
    {
      this.exports.clear();
      {
        const regExp = /(^|\n)\s*export\s+(default\s+)?((async function)|function|class|var|const|let|enum|type|interface)\s+(?<component>[$\w]+)/gm;
        let results;
        while (results = regExp.exec(this._code)) {
          const exportName = results.groups.component;
          this.exports.add(exportName);
        }
      }
      {
        const regExp = /(^|\n)\s*export\s+(default\s*)?\{(.+?)\}/gms;
        let results;
      }
    }
  }
  reset() {
    this._code = void 0;
    this.imports.clear();
    this.exports.clear();
  }
  async $traverse(traversal) {
    traversal = traversal || new TypescriptFileTraversal(this._root, { $fetch: this._$fetch, externals: this._externals });
    const imports = this.imports;
    for (const [file, components] of imports) await traversal.$add(file);
    const resolvedFile = this._path.resolved;
    traversal.$add(resolvedFile);
    if (traversal.files.has(resolvedFile) === false) traversal.files.set(resolvedFile, this);
    traversal.sort();
    return traversal.files;
  }
  async $load(file) {
    console.green("$load", file);
    this.code = await this._$fetch(file);
    return this;
  }
  async $strip(callback) {
    const output = [];
    return (0, import_Core.$Strip)({ code: this._code, root: this._root }, new import_Core.BuilderConfig({ format: "forge-ts", external: this._externals }));
  }
  async $bundle(builderOptions, iPlugins) {
    return (0, import_Core.$Transform)({ root: this._root, contents: this._code }, builderOptions);
  }
  async $library() {
    return;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypescriptFile
});
