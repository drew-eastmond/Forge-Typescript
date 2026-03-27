#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/build/types/TypesPackageValidate.ts
import { ArgumentValidationError, ArgumentValidationErrorAttributes, ArgumentValidationSuccess, AsyncArgumentPackageValidate, Intersects, MergeAttributes } from "@onyx-ignition/forge";
var TypesPackageValidate = class extends AsyncArgumentPackageValidate {
  async $flush(query, validations) {
    await super.$flush(query, validations);
    const params = MergeAttributes(await Promise.all(query.or({ forge: Intersects }).all));
    const { files, name } = params;
    const cause = params;
    if (files === void 0) validations.add(
      new ArgumentValidationError(`arguments for <error>{ files }</error> is undefined`, { cause }),
      { files: true, ...ArgumentValidationErrorAttributes }
    );
    if (name === void 0) validations.add(
      new ArgumentValidationError(`arguments for <error>{ name }</error> is undefined"`, { cause }),
      { name: true, ...ArgumentValidationErrorAttributes }
    );
    if (validations.errors.length === 0) validations.add(
      new ArgumentValidationSuccess(`Package validated for Types`),
      { types: true, validate: true }
    );
  }
};
export {
  TypesPackageValidate
};
