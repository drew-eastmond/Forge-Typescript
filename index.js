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

// ../Forge-Typescript-Source/src/ts/index.js
var ts_exports = {};
__export(ts_exports, {
  $ApplyWriteTransforms: () => import_Core.$ApplyWriteTransforms,
  $Build: () => import_Core.$Build,
  $BuildNPM: () => import_NPMBuilder.$BuildNPM,
  $BuildTypes: () => import_TypesBuilder.$BuildTypes,
  $FetchArguments: () => import_bin_utils.$FetchArguments,
  $Obfuscate: () => import_Core.$Obfuscate,
  $OutputCompiledCode: () => import_Core2.$OutputCompiledCode,
  $ParseExternals: () => import_Core.$ParseExternals,
  $SanitizeGlob: () => import_Core.$SanitizeGlob,
  $Strip: () => import_Core.$Strip,
  $Transform: () => import_Core.$Transform,
  $UnWrapWriteTransforms: () => import_Core.$UnWrapWriteTransforms,
  $VerifyDirectoryExists: () => import_Core.$VerifyDirectoryExists,
  $VerifyFile: () => import_Core.$VerifyFile,
  $WalkSources: () => import_Core2.$WalkSources,
  AttributeSelector: () => import_AttributeSelector.AttributeSelector,
  BuildClient: () => import_BuildClient.BuildClient,
  BuildEntry: () => import_Core.BuildEntry,
  BuildParameters: () => import_client.BuildParameters,
  BuildSelectorParser: () => import_ReactQuery.BuildSelectorParser,
  BuildSocketParams: () => import_Core.BuildSocketParams,
  BuilderConfig: () => import_Core.BuilderConfig,
  BuilderPackage: () => import_BuilderPackage.BuilderPackage,
  BuilderPackageSanitize: () => import_BuilderPackageSanitize.BuilderPackageSanitize,
  BuilderPackageValidate: () => import_BuilderPackageValidate.BuilderPackageValidate,
  BuilderSource: () => import_Core2.BuilderSource,
  BuilderStats: () => import_Core.BuilderStats,
  Bundle: () => import_Core.Bundle,
  BundlePackageSanitize: () => import_BundlePackageSanitize.BundlePackageSanitize,
  CalcCodeSize: () => import_Core.CalcCodeSize,
  ClassSelector: () => import_ClassSelector.ClassSelector,
  ClientModelProxy: () => import_FormlessModelProxy.ClientModelProxy,
  DefaultMouseAdapter: () => import_Input.DefaultMouseAdapter,
  DragDropManager: () => import_DragDropManager.DragDropManager,
  DragManager: () => import_DragManager.DragManager,
  DropManager: () => import_DropManager.DropManager,
  ElementSelector: () => import_ElementSelector.ElementSelector,
  EnvParams: () => import_Core2.EnvParams,
  FileBrowserInputHTMLElement: () => import_FileBrowserInputHTMLElement.FileBrowserInputHTMLElement,
  FileCache: () => import_FileCache.FileCache,
  FileNode: () => import_TreeHTMLElement.FileNode,
  FilterBundled: () => import_Core.FilterBundled,
  FilterFormat: () => import_Core.FilterFormat,
  FilterPlatform: () => import_Core.FilterPlatform,
  ForgeBuildPlugin: () => import_ForgeBuildPlugin.ForgeBuildPlugin,
  ForgeBuilder: () => import_ForgeBuilder.ForgeBuilder,
  ForgeBuilderAliases: () => import_Core.ForgeBuilderAliases,
  ForgeBuilderOptions: () => import_Core.ForgeBuilderOptions,
  Format: () => import_Core.Format,
  FormatElapsedTime: () => import_Core.FormatElapsedTime,
  FormlessElement: () => import_Formless.FormlessElement,
  FormlessEvent: () => import_Formless.FormlessEvent,
  FormlessHTMLElement: () => import_FormlessHTMLElement.FormlessHTMLElement,
  FormlessManager: () => import_FormlessManager.FormlessManager,
  FormletHTMLElement: () => import_FormletHTMLElement.FormletHTMLElement,
  FormletListHTMLElement: () => import_FormletListHTMLElement.FormletListHTMLElement,
  GenericBuilderResult: () => import_client.GenericBuilderResult,
  GetEnviromentParams: () => import_Core2.GetEnviromentParams,
  IBuilderResult: () => import_client.IBuilderResult,
  IForgeBuildPlugin: () => import_ForgeBuildPlugin.IForgeBuildPlugin,
  IMouseAdapter: () => import_Input.IMouseAdapter,
  ISelector: () => import_ReactSelector.ISelector,
  IsConnected: () => import_Formless.IsConnected,
  LibraryBuilder: () => import_LibraryBuilder.LibraryBuilder,
  LibraryPackageSanitize: () => import_LibraryPackageSanitize.LibraryPackageSanitize,
  LibraryPackageValidate: () => import_BundlePackageValidate.LibraryPackageValidate,
  LibraryParams: () => import_LibraryBuilder.LibraryParams,
  LibrarySources: () => import_LibraryBuilder.LibrarySources,
  ListHandle: () => import_FormletListHTMLElement.ListHandle,
  ListState: () => import_FormletListHTMLElement.ListState,
  NPMPackageValidate: () => import_NPMPackageValidate.NPMPackageValidate,
  NPMParams: () => import_NPMBuilder.NPMParams,
  PackageSanitizeNPM: () => import_NPMPackageSanitize.PackageSanitizeNPM,
  ParseElement: () => import_Formless.ParseElement,
  ParseInput: () => import_Formless.ParseInput,
  ParseTypeErrors: () => import_TypesBuilder.ParseTypeErrors,
  Platform: () => import_Core.Platform,
  PointerInteraction: () => import_Input.PointerInteraction,
  PointerOptions: () => import_Input.PointerOptions,
  ProcessWarnignsAndErrors: () => import_bin_utils.ProcessWarnignsAndErrors,
  ProxyRenderer: () => import_SortableHTMLElement.ProxyRenderer,
  PsuedoSelector: () => import_PsuedoSelector.PsuedoSelector,
  ReactQuery: () => import_ReactQuery.ReactQuery,
  ReactSelector: () => import_ReactSelector.ReactSelector,
  ReadTranform: () => import_Core.ReadTranform,
  RenderElement: () => import_Formless.RenderElement,
  RenderInput: () => import_Formless.RenderInput,
  RenderVerifyAccessor: () => import_Core.RenderVerifyAccessor,
  SanitizeProps: () => import_Core3.SanitizeProps,
  SortableConfig: () => import_SortableHTMLElement.SortableConfig,
  SortableEvent: () => import_SortableHTMLElement.SortableEvent,
  SortableHTMLElement: () => import_SortableHTMLElement.SortableHTMLElement,
  SortableProps: () => import_SortableHTMLElement.SortableProps,
  TraversalState: () => import_ReactQuery.TraversalState,
  TraverseElements: () => import_Core3.TraverseElements,
  TreeHTMLElement: () => import_TreeHTMLElement.TreeHTMLElement,
  TreeHandle: () => import_TreeHTMLElement.TreeHandle,
  TreeRenderer: () => import_TreeHTMLElement.TreeRenderer,
  TreeState: () => import_TreeHTMLElement.TreeState,
  TypesPackageSanitize: () => import_TypesPackageSanitize.TypesPackageSanitize,
  TypesPackageValidate: () => import_TypesPackageValidate.TypesPackageValidate,
  TypesParameters: () => import_client.TypesParameters,
  TypescriptBuilder: () => import_TypescriptBuilder.TypescriptBuilder,
  TypescriptFile: () => import_TypescriptFile.TypescriptFile,
  Typesparams: () => import_TypesBuilder.Typesparams,
  UncacheFile: () => import_Core.UncacheFile,
  Verbosity: () => import_Core.Verbosity,
  VerifyPackages: () => import_Core.VerifyPackages,
  Write: () => import_Core.Write,
  WriteTransform: () => import_Core.WriteTransform
});
module.exports = __toCommonJS(ts_exports);
var import_bin_utils = require("./lib/f13c3b46e06822e2249df60e2cbf6949.js");
var import_BuildClient = require("./lib/505d842751e0fcf14b97199f9e0bc437.js");
var import_BuilderPackage = require("./lib/d9f46ef5128f8e924b254d595e5357ca.js");
var import_BuilderPackageSanitize = require("./lib/5c36adca0da2533ce5149728c73d46cf.js");
var import_BuilderPackageValidate = require("./lib/9032e73d8457cfc67ce68ed16a6e06ff.js");
var import_BundlePackageSanitize = require("./lib/82518290e5e1fce5fb6acade488cbdcd.js");
var import_BundlePackageValidate = require("./lib/fae3d06e36d81abafea91aba482fa9ab.js");
var import_Core = require("./lib/02e263f9546d01d4d379d2a91cf19496.js");
var import_ForgeBuilder = require("./lib/63d487cf347d7fea777edb55e6566a09.js");
var import_ForgeBuildPlugin = require("./lib/2683325e1d909ebcf478ed622edff1f9.js");
var import_LibraryBuilder = require("./lib/2815fdad886e131d5b813285c76cdcc5.js");
var import_LibraryPackageSanitize = require("./lib/4c8e95ab119caa3619f68f6b1feebe9a.js");
var import_NPMBuilder = require("./lib/9105c98d3ce8e0bda613fcecdcd7cfba.js");
var import_NPMPackageSanitize = require("./lib/ceb833d0b6c6f9034a12e846e3e6ff33.js");
var import_NPMPackageValidate = require("./lib/5323ce1df9cc465f2799a796aedb383f.js");
var import_TypesBuilder = require("./lib/e564693af5f22bea6e40aaee8b0ec30d.js");
var import_TypesPackageSanitize = require("./lib/fdf6fd6f5c6c645b25dbfb7686c5f961.js");
var import_TypesPackageValidate = require("./lib/acca53d04135a28f5153325ee9283928.js");
var import_TypescriptFile = require("./lib/e6dd33bd637454f0c111b7dac72dc980.js");
var import_TypescriptBuilder = require("./lib/9f55a54025d3b5092158698803c6621e.js");
var import_client = require("./lib/1c471ba9ddb5e341f4331c2ea977ba86.js");
var import_Core2 = require("./lib/7a0362d7d75257ca468d645e44cba11e.js");
var import_DragDropManager = require("./lib/464b33b26383ddb5b3f3d29ceb0be641.js");
var import_DragManager = require("./lib/63ce39ca402ac6c97ab5de7f07baf06b.js");
var import_DropManager = require("./lib/232ab5f5721411d10459eeff820c6d9c.js");
var import_FileCache = require("./lib/cd2e813171d8118f794a0263739facf9.js");
var import_FileBrowserInputHTMLElement = require("./lib/e1b8b9fe065157e1076bbc3cd8019d88.js");
var import_FormletListHTMLElement = require("./lib/b8032d5634b6289b191fe75bf67c31bf.js");
var import_SortableHTMLElement = require("./lib/79e18c3906a6da737ce388e3afbec720.js");
var import_TreeHTMLElement = require("./lib/efefbe0e0a99b0049da135c5a9adfea5.js");
var import_Formless = require("./lib/82b84a3600044d4c7f5da52239d1f3a1.js");
var import_FormlessHTMLElement = require("./lib/9ac06547e7c62ab12f20886766c25be8.js");
var import_FormlessManager = require("./lib/77a6ca05fb7a127e3e5c081337e50a63.js");
var import_FormlessModelProxy = require("./lib/6e506d02be2071e3aed95fa6650ffed3.js");
var import_FormletHTMLElement = require("./lib/feb1e39f6b99ef3b171f63419017f009.js");
var import_Input = require("./lib/4a262a37a895a43592f045d9c4ef3539.js");
var import_Core3 = require("./lib/df401af2a3e76d8a37df1ad17353255f.js");
var import_ReactQuery = require("./lib/0e9e453ef1019dc9c80dda3d3079fb63.js");
var import_AttributeSelector = require("./lib/ce226b2ac4fe10865ab1be3da77f92a9.js");
var import_ClassSelector = require("./lib/4a548f049aa719b4456f038a6626d41b.js");
var import_ElementSelector = require("./lib/027a007c8fc39d50cdec7ddf963aba96.js");
var import_PsuedoSelector = require("./lib/350c409adf365f586bb9850e2f851edc.js");
var import_ReactSelector = require("./lib/270f01db12ac3a5f7ee4949635b5e344.js");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $ApplyWriteTransforms,
  $Build,
  $BuildNPM,
  $BuildTypes,
  $FetchArguments,
  $Obfuscate,
  $OutputCompiledCode,
  $ParseExternals,
  $SanitizeGlob,
  $Strip,
  $Transform,
  $UnWrapWriteTransforms,
  $VerifyDirectoryExists,
  $VerifyFile,
  $WalkSources,
  AttributeSelector,
  BuildClient,
  BuildEntry,
  BuildParameters,
  BuildSelectorParser,
  BuildSocketParams,
  BuilderConfig,
  BuilderPackage,
  BuilderPackageSanitize,
  BuilderPackageValidate,
  BuilderSource,
  BuilderStats,
  Bundle,
  BundlePackageSanitize,
  CalcCodeSize,
  ClassSelector,
  ClientModelProxy,
  DefaultMouseAdapter,
  DragDropManager,
  DragManager,
  DropManager,
  ElementSelector,
  EnvParams,
  FileBrowserInputHTMLElement,
  FileCache,
  FileNode,
  FilterBundled,
  FilterFormat,
  FilterPlatform,
  ForgeBuildPlugin,
  ForgeBuilder,
  ForgeBuilderAliases,
  ForgeBuilderOptions,
  Format,
  FormatElapsedTime,
  FormlessElement,
  FormlessEvent,
  FormlessHTMLElement,
  FormlessManager,
  FormletHTMLElement,
  FormletListHTMLElement,
  GenericBuilderResult,
  GetEnviromentParams,
  IBuilderResult,
  IForgeBuildPlugin,
  IMouseAdapter,
  ISelector,
  IsConnected,
  LibraryBuilder,
  LibraryPackageSanitize,
  LibraryPackageValidate,
  LibraryParams,
  LibrarySources,
  ListHandle,
  ListState,
  NPMPackageValidate,
  NPMParams,
  PackageSanitizeNPM,
  ParseElement,
  ParseInput,
  ParseTypeErrors,
  Platform,
  PointerInteraction,
  PointerOptions,
  ProcessWarnignsAndErrors,
  ProxyRenderer,
  PsuedoSelector,
  ReactQuery,
  ReactSelector,
  ReadTranform,
  RenderElement,
  RenderInput,
  RenderVerifyAccessor,
  SanitizeProps,
  SortableConfig,
  SortableEvent,
  SortableHTMLElement,
  SortableProps,
  TraversalState,
  TraverseElements,
  TreeHTMLElement,
  TreeHandle,
  TreeRenderer,
  TreeState,
  TypesPackageSanitize,
  TypesPackageValidate,
  TypesParameters,
  TypescriptBuilder,
  TypescriptFile,
  Typesparams,
  UncacheFile,
  Verbosity,
  VerifyPackages,
  Write,
  WriteTransform
});
