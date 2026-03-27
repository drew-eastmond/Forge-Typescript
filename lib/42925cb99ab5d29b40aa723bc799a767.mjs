#! /usr/bin/env node

// ../Forge-Typescript-Source/src/ts/build/npm/NPMPackageValidate.ts
import { ArgumentValidationError, ArgumentValidationErrorAttributes, ArgumentValidationSuccess, ArgumentValidationWarning, ArgumentValidationWarningAttributes, AsyncArgumentPackageValidate, ForgeFile, Intersects, MergeAttributes, QuerySequence } from "@onyx-ignition/forge";
import { TypesPackageValidate } from "./45bd0240e82e1e606fcdbd234786faec.mjs";
import { LibraryPackageValidate } from "./b413c1dc23f077deaad6e69981b8d697.mjs";
var NPMPackageValidate = class extends AsyncArgumentPackageValidate {
  constructor(options) {
    super({
      ...options,
      validators: [
        new TypesPackageValidate(),
        new LibraryPackageValidate(),
        ...options?.validators ?? []
      ]
    });
  }
  async $flush(query, validations) {
    await super.$flush(query, validations);
    const params = MergeAttributes(await Promise.all(query.or({ forge: Intersects }).all));
    const { bin, ext, includes, package_json } = params;
    const cause = params;
    const purges = [];
    if (validations.has(QuerySequence.Or({ library: true }))) {
      purges.push(...validations.purge(QuerySequence.And({ library: true, index: true })));
      purges.push(...validations.purge(QuerySequence.And({ library: true, ext: true })));
      if (validations.has(QuerySequence.And({ library: true, error: true })) === false) validations.add(
        new ArgumentValidationSuccess(`Package validated for Library`),
        { library: true, validate: true }
      );
    } else {
      console.red("NO tested validation found for library");
      validations.add(
        new ArgumentValidationError(`[${this.constructor.name}] No nested valiation found for [LibraryPackageValidate]"`, { cause }),
        { npm: true, library: true, ...ArgumentValidationErrorAttributes }
      );
    }
    if (purges.length) console.log(String(purges.map((val) => `${val?.constructor?.name}`)));
    if (bin) {
      const { entry, contents, root } = bin;
      if (bin.constructor === String) {
        validations.add(
          new ArgumentValidationError(`[${this.constructor.name}] arguments type <error>{ bin }</error> is a string should be { bin: { entry } }"`, { cause }),
          { bin: true, ...ArgumentValidationErrorAttributes }
        );
      } else if (entry) {
        if (await ForgeFile.$FileExist(entry) === false) validations.add(
          new ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ bin: { entry } }</error> is missing"`, { cause }),
          { bin: { entry: true }, ...ArgumentValidationErrorAttributes }
        );
      } else {
        if (contents === void 0) validations.add(
          new ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ bin: { content } }</error> is undefined"`, { cause }),
          { bin: { content: true }, ...ArgumentValidationErrorAttributes }
        );
        if (root === void 0) validations.add(
          new ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ bin: { root } }</error> is missing"`, { cause }),
          { bin: { root: true }, ...ArgumentValidationErrorAttributes }
        );
      }
    } else {
      validations.add(
        new ArgumentValidationError(`[${this.constructor.name}] arguments for <error>{ bin }</cyan> is undefined`, { cause }),
        { bin: true, ...ArgumentValidationErrorAttributes }
      );
    }
    if (ext?.cjs === void 0) validations.add(
      new ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ ext: { cjs } }</warning> is optional and will default to cjs = <blue>".js"`, { cause }),
      { ext: { cjs: true }, ...ArgumentValidationWarningAttributes }
    );
    if (ext?.esm === void 0) validations.add(
      new ArgumentValidationWarning(`[${this.constructor.name}] arguments for <warning>{ ext: { esm } }</warning> is optional and will default to esm = <blue>".mjs"`, { cause }),
      { ext: { esm: true }, ...ArgumentValidationWarningAttributes }
    );
    if (validations.errors.length === 0) validations.add(
      new ArgumentValidationSuccess(`Package validated for NPM`),
      { npm: true, validate: true }
    );
  }
};
export {
  NPMPackageValidate
};
