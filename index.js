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

// ../Forge-Typescript-Source/src/ts/{index}
var index_exports = {};
__export(index_exports, {
  $ApplyWriteTransforms: () => import_Core.$ApplyWriteTransforms,
  $Build: () => import_Core.$Build,
  $BuildBundle: () => import_client.$BuildBundle,
  $BuildNPM: () => import_NPMBuilder.$BuildNPM,
  $BuildTypes: () => import_TypesBuilder.$BuildTypes,
  $Clean: () => import_Core.$Clean,
  $ClientBuildTypes: () => import_client.$ClientBuildTypes,
  $Obfuscate: () => import_Core.$Obfuscate,
  $OutputCompiledCode: () => import_client.$OutputCompiledCode,
  $ParseExternals: () => import_Core.$ParseExternals,
  $ReadResolveFile: () => import_client.$ReadResolveFile,
  $ResetBuilder: () => import_client.$ResetBuilder,
  $Strip: () => import_Core.$Strip,
  $Transform: () => import_Core.$Transform,
  $UnWrapWriteTransforms: () => import_Core.$UnWrapWriteTransforms,
  $WalkSources: () => import_client.$WalkSources,
  AttributeSelector: () => import_AttributeSelector.AttributeSelector,
  BuildClient: () => import_BuildClient.BuildClient,
  BuildLibrary: () => import_client.BuildLibrary,
  BuildSelectorParser: () => import_ReactQuery.BuildSelectorParser,
  BuildSocketParams: () => import_Core.BuildSocketParams,
  BuilderConfig: () => import_Core.BuilderConfig,
  CalcCodeSize: () => import_Core.CalcCodeSize,
  ClassSelector: () => import_ClassSelector.ClassSelector,
  DefaultMouseAdapter: () => import_Input.DefaultMouseAdapter,
  DragDropManager: () => import_DragDropManager.DragDropManager,
  DragManager: () => import_DragManager.DragManager,
  DropManager: () => import_DropManager.DropManager,
  ElementSelector: () => import_ElementSelector.ElementSelector,
  FetchArguments: () => import_Build_Utils.FetchArguments,
  FileCache: () => import_FileCache.FileCache,
  FilterBundled: () => import_Core.FilterBundled,
  FilterFormat: () => import_Core.FilterFormat,
  FilterPlatform: () => import_Core.FilterPlatform,
  ForgeBuildPlugin: () => import_ForgeBuildPlugin.ForgeBuildPlugin,
  ForgeBuilder: () => import_ForgeBuilder.ForgeBuilder,
  LibraryBuilder: () => import_LibraryBuilder.LibraryBuilder,
  ParseResult: () => import_client.ParseResult,
  ParseTypeErrors: () => import_TypesBuilder.ParseTypeErrors,
  PointerInteraction: () => import_Input.PointerInteraction,
  PsuedoSelector: () => import_PsuedoSelector.PsuedoSelector,
  ReactQuery: () => import_ReactQuery.ReactQuery,
  ReactSelector: () => import_ReactSelector.ReactSelector,
  SanitizeProps: () => import_Core2.SanitizeProps,
  TraverseElements: () => import_Core2.TraverseElements,
  TypescriptBuilder: () => import_TypescriptBuilder.TypescriptBuilder,
  TypescriptFile: () => import_TypescriptFile.TypescriptFile,
  UncacheFile: () => import_Core.UncacheFile
});
module.exports = __toCommonJS(index_exports);
var import_BuildClient = require("./lib/44280000-0000-604e-0000-9b34d57942000000004057.js");
var import_Core = require("./lib/7dd00000-0000-3afb-0000-9b34d5794200000000d7f0.js");
var import_ForgeBuilder = require("./lib/e3e00000-0000-6951-00000-9b34d5794300001000055e0.js");
var import_ForgeBuildPlugin = require("./lib/a5bc20000-30000-09b5-40000-9b34d579430000500009d77.js");
var import_LibraryBuilder = require("./lib/d8ec60000-70000-1686-80000-9b34d579430000900006f71.js");
var import_NPMBuilder = require("./lib/37e4a0000-b0000-ba94-c0000-9b34d579430000d00006274.js");
var import_TypesBuilder = require("./lib/edc0e0000-f0000-05b1-00000-9b34d579430000100008616.js");
var import_TypescriptFile = require("./lib/84a120000-30000-01c0-40000-9b34d57943000050000501a.js");
var import_TypescriptBuilder = require("./lib/914160000-70000-871c-80000-9b34d57943000090000b5d7.js");
var import_Build_Utils = require("./lib/59a6a0000-b0000-b531-c0000-9b34d579430000d00003f8f.js");
var import_client = require("./lib/4759e0000-f0000-3727-00000-9b34d579440000100007818.js");
var import_DragDropManager = require("./lib/8ace20000-30000-ae71-40000-9b34d579440000500008b01.js");
var import_DragManager = require("./lib/242a60000-70000-d7ce-80000-9b34d579440000900007546.js");
var import_DropManager = require("./lib/da5fa0000-b0000-830c-c0000-9b34d579440000d0000bdeb.js");
var import_FileCache = require("./lib/0726e0000-f0000-a028-00000-9b34d5794400001000038b7.js");
var import_Input = require("./lib/951b20000-30000-8443-40000-9b34d579440000500000eed.js");
var import_Core2 = require("./lib/81c0a0000-b0000-9e8e-c0000-9b34d579440000d0000df1b.js");
var import_ReactQuery = require("./lib/20c8e0000-f0000-4981-00000-9b34d579440000100007c98.js");
var import_AttributeSelector = require("./lib/f92620000-30000-b580-40000-9b34d5794500005000090b9.js");
var import_ClassSelector = require("./lib/dd8b60000-70000-0d6f-80000-9b34d5794500009000058d4.js");
var import_ElementSelector = require("./lib/b369a0000-b0000-2a09-c0000-9b34d579450000d000095c9.js");
var import_PsuedoSelector = require("./lib/09ade0000-f0000-f637-00000-9b34d57945000010000d8c4.js");
var import_ReactSelector = require("./lib/bd1420000-30000-1a72-40000-9b34d579450000500008113.js");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $ApplyWriteTransforms,
  $Build,
  $BuildBundle,
  $BuildNPM,
  $BuildTypes,
  $Clean,
  $ClientBuildTypes,
  $Obfuscate,
  $OutputCompiledCode,
  $ParseExternals,
  $ReadResolveFile,
  $ResetBuilder,
  $Strip,
  $Transform,
  $UnWrapWriteTransforms,
  $WalkSources,
  AttributeSelector,
  BuildClient,
  BuildLibrary,
  BuildSelectorParser,
  BuildSocketParams,
  BuilderConfig,
  CalcCodeSize,
  ClassSelector,
  DefaultMouseAdapter,
  DragDropManager,
  DragManager,
  DropManager,
  ElementSelector,
  FetchArguments,
  FileCache,
  FilterBundled,
  FilterFormat,
  FilterPlatform,
  ForgeBuildPlugin,
  ForgeBuilder,
  LibraryBuilder,
  ParseResult,
  ParseTypeErrors,
  PointerInteraction,
  PsuedoSelector,
  ReactQuery,
  ReactSelector,
  SanitizeProps,
  TraverseElements,
  TypescriptBuilder,
  TypescriptFile,
  UncacheFile
});
