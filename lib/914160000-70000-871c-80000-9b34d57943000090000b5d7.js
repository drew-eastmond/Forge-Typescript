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

// ../Forge-Typescript-Source/src/ts/build/typescript/_TypescriptBuilder.ts
var TypescriptBuilder_exports = {};
__export(TypescriptBuilder_exports, {
  TypescriptBuilder: () => TypescriptBuilder
});
module.exports = __toCommonJS(TypescriptBuilder_exports);
var import_forge = require("@onyx-ignition/forge");
var import_TypescriptFile = require("./84a120000-30000-01c0-40000-9b34d57943000050000501a.js");
var import_Core = require("./7dd00000-0000-3afb-0000-9b34d5794200000000d7f0.js");
var TypescriptBuilder = class {
  static async $Library(root, options) {
    const ignoreFiles = (options && options.ignore || []).map((file) => import_forge.ForgePath.Sanitize(file));
    const fileManifest = (await import_forge.ForgeIO.File.$Walk(root)).filter(function(file) {
      const fileResolved = import_forge.ForgePath.Resolve(file);
      for (const ignore of ignoreFiles) {
        const ignoreResolved = import_forge.ForgePath.Resolve(ignore);
        if (ignoreResolved == fileResolved) return false;
        if (/\.((ts|x)|(js|x))/.test(file) === false) return false;
      }
      return true;
    });
    const typescriptFile = new import_TypescriptFile.TypescriptFile(root);
    const compiledExports = /* @__PURE__ */ new Map();
    const exportComponents = /* @__PURE__ */ new Set();
    const codeBlocks = [];
    for (const file of fileManifest) {
      const skippedImportations = [];
      const code = await import_forge.ForgeIO.File.$ReadDecoded(file, "utf8");
      typescriptFile.code = code;
      const fileExports = typescriptFile.exports;
      compiledExports.set(file, fileExports);
      const validExports = /* @__PURE__ */ new Set();
      for (const [component, transformComponent] of fileExports) {
        if (exportComponents.has(component)) {
          skippedImportations.push(component);
        } else {
          exportComponents.add(component);
          validExports.add(component);
        }
      }
      const parsedPath = import_forge.ForgePath.Parse(file);
      let importPath = import_forge.ForgePath.Relative(root, import_forge.ForgePath.Sanitize(parsedPath.dir, parsedPath.name));
      let importEntry = fileExports.size == 0 ? "// " : "";
      importEntry += `import { ${[...validExports].join(", ")} } from "./${importPath}";`;
      if (skippedImportations.length) importEntry += ` // skipped imports: { ${skippedImportations.join(", ")} }`;
      codeBlocks.push(importEntry);
    }
    codeBlocks.push(`

export {
	${[...exportComponents].join(",\n	")}
};
`);
    return codeBlocks.join("\n");
  }
  /* public static async $RegenerateBuilder(source: string, target: string): Promise<boolean> {
  
          try {
  
              await ForgeOS.$Exec(`pnpm exec esbuild ${source} --outfile=${target} --bundle --platform=node --format=cjs --external:esbuild`);
  
          } catch (error: unknown) {
  
              return false;
  
          }
  
          return true;
  
      } */
  static StripImports(code) {
    return code.replace(/\s*import(\s+\{\s*(?<components>.+?)\s*\}).+?["'`](?<file>.+?)["'`];\s*/g, "\n");
  }
  _entry;
  _root;
  _$package = /* @__PURE__ */ new Set();
  _$packages;
  _options;
  _iPlugins;
  constructor(entry, options, iPlugins) {
    this._options = options;
    this._iPlugins = iPlugins || [];
    if (options.root) {
      this._root = import_forge.ForgePath.Sanitize(options.root);
    } else {
      this._root = import_forge.ForgePath.Parse(import_forge.ForgePath.Sanitize(entry)).dir;
    }
    this._entry = import_forge.ForgePath.Sanitize(entry);
  }
  async $fetch(file) {
    let resolved = file;
    {
      const iResult = new import_forge.Result();
      for (const iPlugin of this._iPlugins) iPlugin.$resolve(file, iResult);
      const iQuery = iResult.or({ file: true, loader: true });
      if (iQuery.size) {
      }
    }
    {
      const iResult = new import_forge.Result();
      for (const iPlugin of this._iPlugins) iPlugin.$fetch(file, iResult);
    }
    return import_forge.ForgeIO.File.$ReadDecoded(file, "utf8");
  }
  async $bundle() {
    switch (this._options.format) {
      case "esm":
      case "cjs":
      case "iife":
        return (0, import_Core.$Build)(this._entry, this._options);
    }
  }
  async $library() {
    return;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TypescriptBuilder
});
