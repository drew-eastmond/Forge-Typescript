#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/bin-utils.ts
import { ArgumentPackage, ArgumentValidationError, ArgumentValidationErrorAttributes, ArgumentValues, CLIArgumentPackage, ForgeFile, Intersects, MergeAttributes, StdinArgumentPackage } from "@onyx-ignition/forge";
import { $SanitizeGlob, BuilderConfig, Verbosity } from "./fda017fd934f5aa37610fc2a70164a5e.mjs";
async function $FetchArguments() {
  const compositeArguemnts = new ArgumentPackage();
  const cliArguments = new CLIArgumentPackage();
  cliArguments.add({
    forge: {
      verbose: Verbosity.all
    }
  }, { forge: true });
  cliArguments.parse(process.argv);
  const stdinPackage = new StdinArgumentPackage().add({ builder: new BuilderConfig() }, { builder: true });
  await stdinPackage.$parse().catch((error) => console.yellow("StdinArgumentPackage.parse( ... ) race failure caught"));
  compositeArguemnts.before(stdinPackage);
  compositeArguemnts.after(cliArguments);
  await compositeArguemnts.$validate({
    async $flush(query, validations) {
      const { forge: { copy, files } } = MergeAttributes(await Promise.all(query.or({ forge: Intersects }).all));
      const errorAttributes = { ...ArgumentValidationErrorAttributes, forge: true };
      console.log(MergeAttributes(await Promise.all(query.or({ forge: Intersects }).all)));
      if (files) {
        console.yellow("has files", files);
      }
      if (copy) {
        if (Array.isArray(copy) === false) {
          validations.add(
            new ArgumentValidationError(`[Forge] arguments for <error>{ forge: { copy } }</error> is not an array of { source, targets }`, { cause: copy }),
            { forge: { copy }, ...errorAttributes }
          );
        } else {
          for (const cause of copy) {
            const { source, targets } = cause;
            if (source === void 0) {
              validations.add(
                new ArgumentValidationError(`[Forge] arguments for <error>{ forge: { copy: { source } } }</error> is undefined`, { cause }),
                { forge: { copy: { source: true } }, ...errorAttributes }
              );
            } else {
              const results = await ForgeFile.$GlobExist([source]);
              if (results.success === false) {
                validations.add(
                  new ArgumentValidationError(`[Forge] arguments for <error>{ forge: { copy: { source } } }</error> is not a valid source:
	${source}`, { cause }),
                  { forge: { copy: { source: true } }, ...errorAttributes }
                );
              }
            }
            if (targets === void 0) {
              validations.add(
                new ArgumentValidationError(`[Forge] arguments for <error>{ forge: { copy: { targets } } }</error> is undefined`, { cause }),
                { forge: { copy: { targets: true } }, ...errorAttributes }
              );
            } else if (Array.isArray(targets) === false) {
              validations.add(
                new ArgumentValidationError(`[Forge] arguments for <error>{ forge: { copy: { targets } } }</error> is not an array of file targets`, { cause }),
                { forge: { copy: { targets: true } }, ...errorAttributes }
              );
            } else {
              const results = await ForgeFile.$GlobExist([source]);
              if (results.success === false) {
                const invalidTargets = [];
                for (const [target, attributes] of results) invalidTargets.push(target);
                validations.add(
                  new ArgumentValidationError(`[Forge] arguments for <error>{ forge: { copy: { targets } } }</error> is has the follwoing invalid targets:
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
        if (files) component.app.files = await $SanitizeGlob(files);
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
      if (overload instanceof ArgumentPackage) {
        const { successes, warnings: warnings2, errors: errors2 } = overload.validations;
        if (successes.length) for (const success of successes) collectedSuccesses.add(success.message);
        if (warnings2.length) for (const warning of warnings2) collectedWarnings.add(warning.message);
        if (errors2.length) for (const error of errors2) collectedErrors.add(error.message);
      } else if (overload instanceof ArgumentValues) {
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
export {
  $FetchArguments,
  ProcessWarnignsAndErrors
};
