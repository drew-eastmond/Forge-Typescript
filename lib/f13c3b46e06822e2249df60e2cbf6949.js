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

// ../Forge-Typescript-Source/src/ts/bin-utils.ts
var bin_utils_exports = {};
__export(bin_utils_exports, {
  $FetchArguments: () => $FetchArguments,
  ProcessWarnignsAndErrors: () => ProcessWarnignsAndErrors
});
module.exports = __toCommonJS(bin_utils_exports);
var import_forge = require("@onyx-ignition/forge");
var import_Core = require("./02e263f9546d01d4d379d2a91cf19496.js");
async function $FetchArguments() {
  const compositeArguemnts = new import_forge.ArgumentPackage();
  const cliArguments = new import_forge.CLIArgumentPackage();
  cliArguments.add({
    forge: {
      verbose: import_Core.Verbosity.all
    }
  }, { forge: true });
  cliArguments.parse(process.argv);
  const stdinPackage = new import_forge.StdinArgumentPackage().add({ builder: new import_Core.BuilderConfig() }, { builder: true });
  await stdinPackage.$parse().catch((error) => console.yellow("StdinArgumentPackage.parse( ... ) race failure caught"));
  compositeArguemnts.before(stdinPackage);
  compositeArguemnts.after(cliArguments);
  await compositeArguemnts.$validate({
    async $flush(query, validations) {
      const { forge: { copy, files } } = (0, import_forge.MergeAttributes)(await Promise.all(query.or({ forge: import_forge.Intersects }).all));
      const errorAttributes = { ...import_forge.ArgumentValidationErrorAttributes, forge: true };
      console.log((0, import_forge.MergeAttributes)(await Promise.all(query.or({ forge: import_forge.Intersects }).all)));
      if (files) {
        console.yellow("has files", files);
      }
      if (copy) {
        if (Array.isArray(copy) === false) {
          validations.add(
            new import_forge.ArgumentValidationError(`[Forge] arguments for <error>{ forge: { copy } }</error> is not an array of { source, targets }`, { cause: copy }),
            { forge: { copy }, ...errorAttributes }
          );
        } else {
          for (const cause of copy) {
            const { source, targets } = cause;
            if (source === void 0) {
              validations.add(
                new import_forge.ArgumentValidationError(`[Forge] arguments for <error>{ forge: { copy: { source } } }</error> is undefined`, { cause }),
                { forge: { copy: { source: true } }, ...errorAttributes }
              );
            } else {
              const results = await import_forge.ForgeFile.$GlobExist([source]);
              if (results.success === false) {
                validations.add(
                  new import_forge.ArgumentValidationError(`[Forge] arguments for <error>{ forge: { copy: { source } } }</error> is not a valid source:
	${source}`, { cause }),
                  { forge: { copy: { source: true } }, ...errorAttributes }
                );
              }
            }
            if (targets === void 0) {
              validations.add(
                new import_forge.ArgumentValidationError(`[Forge] arguments for <error>{ forge: { copy: { targets } } }</error> is undefined`, { cause }),
                { forge: { copy: { targets: true } }, ...errorAttributes }
              );
            } else if (Array.isArray(targets) === false) {
              validations.add(
                new import_forge.ArgumentValidationError(`[Forge] arguments for <error>{ forge: { copy: { targets } } }</error> is not an array of file targets`, { cause }),
                { forge: { copy: { targets: true } }, ...errorAttributes }
              );
            } else {
              const results = await import_forge.ForgeFile.$GlobExist([source]);
              if (results.success === false) {
                const invalidTargets = [];
                for (const [target, attributes] of results) invalidTargets.push(target);
                validations.add(
                  new import_forge.ArgumentValidationError(`[Forge] arguments for <error>{ forge: { copy: { targets } } }</error> is has the follwoing invalid targets:
	${invalidTargets.join("\n	")}`, { cause }),
                  { forge: { copy: { targets: true } }, ...errorAttributes }
                );
              }
            }
          }
        }
      }
    }
  });
  return compositeArguemnts.$sanitize({
    async $sanitize(packageComponent, attributes) {
      const component = await packageComponent;
      if (component.app) {
        const { files } = component.app;
        if (files) component.app.files = await (0, import_Core.$SanitizeGlob)(files);
      }
      return component;
    }
  });
}
function ProcessWarnignsAndErrors({ args, warnings, errors }) {
  const collectedSuccesses = /* @__PURE__ */ new Set();
  const collectedWarnings = /* @__PURE__ */ new Set();
  const collectedErrors = /* @__PURE__ */ new Set();
  function FormatText(text) {
    return text.replace(/<error>/g, "<red>").replace(/<\/error>/g, "</red>").replace(/<warning>/g, "<yellow>").replace(/<\/warning>/g, "</yellow>");
  }
  if (warnings && warnings.length) for (const warning of warnings) collectedWarnings.add(warning);
  if (errors && errors.length) for (const error of errors) collectedErrors.add(error);
  if (args) {
    for (const overload of args) {
      if (overload instanceof import_forge.ArgumentPackage) {
        const { successes, warnings: warnings2, errors: errors2 } = overload.validations;
        if (successes.length) for (const success of successes) collectedSuccesses.add(success.message);
        if (warnings2.length) for (const warning of warnings2) collectedWarnings.add(warning.message);
        if (errors2.length) for (const error of errors2) collectedErrors.add(error.message);
      } else if (overload instanceof import_forge.ArgumentValues) {
      } else {
        console.red("WRONG ARGUMENT");
        process.exit();
      }
    }
  }
  if (collectedSuccesses.size) {
    console.green("Successes:");
    for (const success of collectedSuccesses) console.parse(`	<cyan>${FormatText(success)}`);
  }
  if (collectedWarnings.size) {
    console.yellow("Warnings:");
    for (const warnings2 of collectedWarnings) console.parse(`	<cyan>${FormatText(warnings2)}`);
  }
  if (collectedErrors.size) {
    console.red("Errors:");
    for (const error of collectedErrors) console.parse(`	<cyan>${FormatText(error)}`);
    console.red("\nAborting build!!!");
    process.exit();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  $FetchArguments,
  ProcessWarnignsAndErrors
});
