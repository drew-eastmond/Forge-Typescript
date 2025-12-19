#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/build/ForgeBuilder.ts
import { ForgeFile, ForgePath, Result, Subscription, Topology } from "@onyx-ignition/forge";
import { TypescriptFile } from "./dee5a0000-b0000-33fa-c0000-9b34d579780000d00008cfb.mjs";
var ReorderManager = class {
  _root;
  // private _$fetch
  topology = new Topology();
  constructor(root, options) {
    this._root = root;
  }
  import(input) {
    return this;
  }
  async $load(file, spaces) {
    const hierarchy = [];
    const input = await ForgeFile.$ReadDecoded(file, "utf8");
    const lines = input.split(/\n/g);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const result = /^(?<depth>\s*)(?<file>\S.+)/.exec(line);
      if (result) {
        const depth = Number(result.groups.depth);
        const file2 = ForgePath.Sanitize(this._root, result.groups.file);
        const fileStackLength = hierarchy.length;
        if (depth > fileStackLength + 1) throw `Error as line(${i}): ${file2}`;
        if (depth == fileStackLength + 1) {
          console.magenta("child", [...hierarchy]);
        } else if (depth == fileStackLength) {
          hierarchy.pop();
          console.magenta("sibling", [...hierarchy]);
        } else {
          const deleteCount = depth - hierarchy.length;
          hierarchy.splice(depth, deleteCount);
          console.magenta("ancestor", [...hierarchy]);
        }
        const parent = hierarchy[hierarchy.length - 1];
        this.add(file2, {}, parent);
        hierarchy.push(file2);
      }
    }
    return this;
  }
  add(file, attributes, parent) {
    this.topology.add(ForgePath.Sanitize(this._root, file), attributes, parent);
    return this;
  }
};
var ForgeBuilder = class extends Subscription {
  /* public static async $Build(entry: string, options: ForgeBuilderOptions): $IResult<Attributes>;
      public static async $Build(entry: string, options: ForgeBuilderOptions, iPlugins: IForgeBuildPlugin[]): $IResult<Attributes>;
      public static async $Build(entry: string, options: ForgeBuilderOptions, iPlugins?: IForgeBuildPlugin[]): $IResult<Attributes> {
  
          return $Build(entry, options, iPlugins);
  
      } */
  // private _entry: string;
  _builderOptions;
  cache = /* @__PURE__ */ new Map();
  iPlugins = [];
  root;
  reorder;
  constructor(root, builderOptions, iPlugins) {
    super();
    if (builderOptions.format == "cjs" || builderOptions.format == "esm" || builderOptions.format == "iife" || builderOptions.format == "tsc") throw new Error(`incorrect format assigned to options. Please assign: "forge-ts" | "forge-js"`);
    this._builderOptions = builderOptions;
    if (iPlugins) this.iPlugins.push(...iPlugins);
    this.root = root;
    this.reorder = new ReorderManager(this.root);
  }
  async _$resolve(file) {
    const result = new Result();
    result.add({ file }, { file: true });
    for (const iPlugin of this.iPlugins) await iPlugin.$resolve(file, result);
    const resolvedFile = result.or({ file: true }).last;
    return resolvedFile.file;
  }
  async _$fetch(file) {
    file = await this._$resolve(file);
    if (this.cache.has(file)) {
      console.green("cache hit", file);
    } else {
      console.yellow("cache miss", file);
      console.red("---------------------FIND A WAY TO DETERMINE LOADER : DEfaulting to utf-8 -------------");
      const contents = await ForgeFile.$ReadDecoded(file, "utf8");
      this.cache.set(file, { contents, loader: "tsx" });
    }
    const result = new Result();
    result.add(this.cache.get(file), { contents: true, loader: true });
    for (const iPlugin of this.iPlugins) await iPlugin.$fetch(file, result);
    const fetch = result.and({ contents: true, loader: true }).last;
    return { contents: fetch.contents, loader: fetch.loader };
  }
  async _$fetchTypescript(file) {
    const { contents, loader } = await this._$fetch(file);
    if (contents.constructor === String) return contents;
    throw "Need to convert contents to string";
  }
  _reorderManifest(files) {
    const manifest = [...files.keys()];
    const reorderTopology = this.reorder.topology;
    if (reorderTopology.size > 1) {
      for (const file of reorderTopology.traverse(void 0, /* @__PURE__ */ new Set())) {
        const indexOf = manifest.indexOf(file);
        if (indexOf === -1) continue;
        const parentFile = reorderTopology.parent(file);
        if (parentFile === void 0) {
          const siblings = [...reorderTopology.siblings(file)];
          const siblingIndex = siblings.indexOf(file);
          const previousFile = siblings[siblingIndex - 1];
          const previousIndex = manifest.indexOf(previousFile);
          if (previousIndex > -1) continue;
          if (previousIndex > indexOf) {
            manifest.splice(indexOf, 1);
            manifest.splice(previousIndex, 0, file);
          }
        } else {
          manifest.splice(indexOf, 1);
          const parentIndex = manifest.indexOf(parentFile);
          manifest.splice(parentIndex + 1, 0, file);
        }
      }
    }
    for (const file of manifest) {
      const typescriptFile = files.get(file);
      files.delete(file);
      files.set(file, typescriptFile);
    }
  }
  async $bundle(entry) {
    console.log("building ---", entry);
    const prefix = "Forge_";
    const suffix = "";
    const entryFile = new TypescriptFile({ entry, root: this.root }, { $fetch: this._$fetchTypescript, externals: this._builderOptions.external });
    await entryFile.$load(entry);
    const typescriptFiles = await entryFile.$traverse();
    const bundledImports = /* @__PURE__ */ new Map();
    for (const [file, typescipt] of typescriptFiles) {
      const fileImports = typescipt.imports;
      for (const [importer, components] of fileImports) {
        if (bundledImports.has(importer) === false) bundledImports.set(importer, /* @__PURE__ */ new Set());
        const importedCompoments = bundledImports.get(importer);
        for (const component of components) importedCompoments.add(component);
      }
    }
    console.yellow("pre sort", [...typescriptFiles.keys()]);
    this._reorderManifest(typescriptFiles);
    const filenames = [...typescriptFiles.keys()];
    console.cyan("post sort", filenames);
    const result = new Result();
    result.add({ entry }, { entry: true });
    result.add({ files: typescriptFiles }, { files: true });
    result.add({ manifest: filenames }, { manifest: true });
    const exportedComponents = {};
    for (const [file, script] of typescriptFiles) exportedComponents[script.hash] = script.exports;
    result.add({ exports: exportedComponents }, { exports: true });
    for (const iPlugin of this.iPlugins) iPlugin.$start(result);
    const { manifest } = result.or({ manifest: true }).last;
    const skippedFiles = /* @__PURE__ */ new Set();
    const code = [];
    for (const [file, components] of bundledImports) {
      if (ForgePath.IsAbsolute(file) === false) {
        console.blue(file);
        code.push(`import { ${[...components].join(", ")} } from "${file}";`);
      }
    }
    for (const file of manifest) {
      code.push("{", `// ${file}`);
      const script = typescriptFiles.get(file);
      for (const [file2, components] of script.imports) {
        if (typescriptFiles.has(file2) === false && typescriptFiles.has(file2 + ".ts") === false) {
          skippedFiles.add(file2);
          continue;
        }
        const dependency = typescriptFiles.get(file2);
        code.push(`	const { ${[...components].join(", ")} } = ${prefix}${dependency.hash}${suffix};`);
      }
      const strippedResult = await script.$strip();
      if (strippedResult.success === false) throw new Error("building fail in ForgeBuilder");
      const strippedCode = strippedResult.or({ code: true }).first.code;
      console.green(file);
      code.push("	" + strippedCode.split(/\n/g).map((line) => `	${line}`).join("\n"));
      code.push(`	var ${prefix}${script.hash}${suffix} = { ${[...script.exports].join(", ")} };
`);
      code.push("}", "");
    }
    result.add({ skippedFiles }, { skippedFiles: true });
    result.add({ code: code.join("\n") }, { code: true });
    for (const iPlugin of this.iPlugins) iPlugin.$complete(result);
    return result;
  }
};
export {
  ForgeBuilder
};
