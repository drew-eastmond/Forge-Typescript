#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/build/builder/BuilderPackageValidate.ts
import { ArgumentValidationErrorAttributes, ArgumentValidationSuccess, ArgumentValidationWarning, ArgumentValidationWarningAttributes, AsyncArgumentPackageValidate, ForgeFile, Intersects, MergeAttributes } from "@onyx-ignition/forge";
var BuilderPackageValidate = class extends AsyncArgumentPackageValidate {
  async $flush(query, validations) {
    const builderParams = MergeAttributes(await Promise.all(query.or({ builder: Intersects }).all));
    let { format, platform, bundled, ignores, transform } = builderParams;
    const errorAttributes = { ...ArgumentValidationErrorAttributes, builder: true };
    const warningAttributes = { ...ArgumentValidationWarningAttributes, builder: true };
    const cause = builderParams;
    if (format) {
      validations.add(
        new ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ format }</warning> is optional and will default to <blue>cjs`, { cause }),
        { format: true, ...warningAttributes }
      );
    } else {
      format = String(format).toLowerCase();
      if (["cjs", "esm", "iife"].includes(format) === false) validations.add(
        new ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ format }</warning> is an invalid value. Should be <blue>cjs | esm | iife`, { cause }),
        { format: true, ...errorAttributes }
      );
    }
    if (platform) {
      validations.add(
        new ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ platform }</warning> is optional and will default to <blue>neutral`, { cause }),
        { platform: true, ...warningAttributes }
      );
    } else {
      platform = String(platform).toLowerCase();
      if (["node", "neutral", "browser"].includes(platform) === false) validations.add(
        new ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ format }</warning> is an invalid value. Should be <blue>node | neutral | browser`, { cause }),
        { platform: true, ...errorAttributes }
      );
    }
    if (bundled) {
      validations.add(
        new ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ bundled }</warning> is optional and will default to <blue>mangle-static`, { cause }),
        { bundled: true, ...warningAttributes }
      );
    } else {
      bundled = String(bundled).toLowerCase();
      if (["preserve", "mangle-static", "mangle-random", "merge"].includes(bundled) === false) validations.add(
        new ArgumentValidationWarning(`[${this.constructor.name}] arguments for <error>{ bundled }</warning> is an invalid value. Should be <blue> preserve | mangle-static | mangle-random | merge`, { cause }),
        { bundled: true, ...errorAttributes }
      );
    }
    if (ignores) {
      switch (ignores.constructor) {
        case String:
          ignores = ignores.split(/\s*,\s*/g);
        // fall thorugh
        case Array:
          const results = await ForgeFile.$GlobExist(ignores);
          if (results.success === false) {
            const warnings = [];
            for (const [warning, attributes] of results) warnings.push(warning);
            validations.add(
              new ArgumentValidationWarning(
                `[${this.constructor.name}] arguments for <warning>{ ignores }</warning> has the following invalid targets:
		<magenta>${warnings.join("\n		")}`,
                { cause: warnings }
              ),
              { ignores: true, ...warningAttributes }
            );
          }
          break;
      }
    }
    if (transform) {
      if (Array.isArray(transform.write)) {
      }
      if (Array.isArray(transform.read)) {
      }
    }
    if (validations.errors.length === 0) validations.add(
      new ArgumentValidationSuccess(`${this.constructor.name}] Package validated for builder`),
      { builder: true, validate: true }
    );
  }
};
export {
  BuilderPackageValidate
};
