#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/build/bundle/BundlePackageValidate.ts
import { ArgumentValidationError, ArgumentValidationErrorAttributes, ArgumentValidationSuccess, ArgumentValidationWarning, ArgumentValidationWarningAttributes, AsyncArgumentPackageValidate, Intersects, MergeAttributes } from "@onyx-ignition/forge";
var LibraryPackageValidate = class extends AsyncArgumentPackageValidate {
  async $flush(query, validations) {
    const forgeParams = MergeAttributes(await Promise.all(query.or({ forge: Intersects }).all));
    const { sources, files, root, lib, ext, index } = forgeParams;
    const cause = forgeParams;
    const errorAttributes = { ...ArgumentValidationErrorAttributes, library: true };
    const warningAttributes = { ...ArgumentValidationWarningAttributes, library: true };
    if (sources) {
      if (sources.files === void 0) validations.add(
        new ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ source: { files } }</error> is undefined`, { cause }),
        { files: true, ...errorAttributes }
      );
      if (sources.root === void 0) validations.add(
        new ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ source: { root } }</error> is is undefined`, { cause }),
        { root: true, ...errorAttributes }
      );
    } else {
      if (files === void 0) validations.add(
        new ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ files }</error> is undefined`, { cause }),
        { files: true, ...errorAttributes }
      );
      if (root === void 0) validations.add(
        new ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ root }</error> is is undefined`, { cause }),
        { root: true, ...errorAttributes }
      );
    }
    if (index === void 0) validations.add(
      new ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ index }</error> is is undefined`, { cause }),
      { index: true, ...errorAttributes }
    );
    if (ext === void 0) validations.add(
      new ArgumentValidationWarning(`[${this.constructor.name}] arguments for <error>{ ext }</warning> is optional and will default to = <blue>".js"`, { cause }),
      { ext: true, ...errorAttributes }
    );
    if (lib === void 0) validations.add(
      new ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ lib }</warning> is optional and will default to <blue>"./lib/"`, { cause }),
      { lib: true, ...warningAttributes }
    );
    if (validations.errors.length === 0) validations.add(
      new ArgumentValidationSuccess(`Package validated for Bundle`),
      { library: true, validate: true }
    );
  }
};
export {
  LibraryPackageValidate
};
