#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/build/typescript/_TypescriptBuilder.ts
import { ForgeIO, ForgePath, Result } from "@onyx-ignition/forge";
import { TypescriptFile } from "./dee5a0000-b0000-33fa-c0000-9b34d579780000d00008cfb.mjs";
import { $Build } from "./a43b20000-30000-9ba4-40000-9b34d579780000500001126.mjs";
var TypescriptBuilder = class {
  static async $Library(root, options) {
    const ignoreFiles = (options && options.ignore || []).map((file) => ForgePath.Sanitize(file));
    const fileManifest = (await ForgeIO.File.$Walk(root)).filter(function(file) {
      const fileResolved = ForgePath.Resolve(file);
      for (const ignore of ignoreFiles) {
        const ignoreResolved = ForgePath.Resolve(ignore);
        if (ignoreResolved == fileResolved) return false;
        if (/\.((ts|x)|(js|x))/.test(file) === false) return false;
      }
      return true;
    });
    const typescriptFile = new TypescriptFile(root);
    const compiledExports = /* @__PURE__ */ new Map();
    const exportComponents = /* @__PURE__ */ new Set();
    const codeBlocks = [];
    for (const file of fileManifest) {
      const skippedImportations = [];
      const code = await ForgeIO.File.$ReadDecoded(file, "utf8");
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
      const parsedPath = ForgePath.Parse(file);
      let importPath = ForgePath.Relative(root, ForgePath.Sanitize(parsedPath.dir, parsedPath.name));
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
      this._root = ForgePath.Sanitize(options.root);
    } else {
      this._root = ForgePath.Parse(ForgePath.Sanitize(entry)).dir;
    }
    this._entry = ForgePath.Sanitize(entry);
  }
  async $fetch(file) {
    let resolved = file;
    {
      const iResult = new Result();
      for (const iPlugin of this._iPlugins) iPlugin.$resolve(file, iResult);
      const iQuery = iResult.or({ file: true, loader: true });
      if (iQuery.size) {
      }
    }
    {
      const iResult = new Result();
      for (const iPlugin of this._iPlugins) iPlugin.$fetch(file, iResult);
    }
    return ForgeIO.File.$ReadDecoded(file, "utf8");
  }
  async $bundle() {
    switch (this._options.format) {
      case "esm":
      case "cjs":
      case "iife":
        return $Build(this._entry, this._options);
    }
  }
  async $library() {
    return;
  }
};
export {
  TypescriptBuilder
};
