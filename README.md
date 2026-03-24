# Forge-Typescript ( beta release with documentation pending March 24, 2026 )

Typescript Builder Package for Forge Workflow Orchestrator. Currently the CLI interface has had massive updates for QOL developer features. This includes data packaging via `ArgumentPackage` class assist transporting data ( extending the props drilling paradigm ). These argument packages makes merging parameters easy from multiuple sources by using fragments of data.

## Command Line Interface Routes ( CLI Quick Guide )

### Generate Types ( d.ts )

`$ npx @onyx-ignition/forge-typescript [forge] [[types [[files]] ./src/ts/*/** [[name]] forge/example [[out]] ./forge.d.ts`

`$ npm run types [forge] [[files]] ./src/ts/*/** [[name]] forge/example [[out]] ./forge.d.ts`

### Build and Bundle ( also exclude package.json dependencies via keys retrieval protocol )

`$ npx @onyx-ignition/forge-typescript [[build [[entry]] ./src/ts/index.ts [[out]] ./index.js [[platform]] node [[format]] esm [[external]] json.keys(dependencies)://./package.json`

`$ node run build [[entry]] ./src/ts/index.ts [[out]] ./index.js [[platform]] node [[format]] esm [[external]] json.keys(dependencies)://./package.json`

### Build Library Export ( also exclude package.json dependencies via keys retrieval protocol )

`$ npx @onyx-ignition/forge-typescript [forge] [[library [[files]] ./src/ts/*/** [[out]] ./dist/ [[platform]] node [[format]] esm [[external]] json.keys://./package.json::dependencies`

`$ node run library [[files]] ./src/ts/*/** [forge] [[out]] ./dist/ [[platform]] node [[format]] esm [[external]] json.keys://./package.json::dependencies`


### Build NPM/NPX Package ( also exclude package.json dependencies via keys )

`$ npx @onyx-ignition/forge-typescript [forge] [[npm [[files]] ./src/ts/*/** [[out]] ./dist/ [[external]] json.keys://./package.json::dependencies [[bin]] [entry] ./src/ts/bin.ts [[library]] [root] ./src/ts/ [name] forge/example`

`$ npm run npm [forge] [[files]] ./src/ts/*/** [[out]] ./dist/ [[external]] json.keys://./package.json::dependencies [[bin]] [[[entry]]] ./src/ts/bin.ts [[library]] [root] ./src/ts/ [name] forge/example`

# Advanced usaged and Parameters

Although these parameters are still relevent. This is not an exhaustive list of all parameters. Since  Partially retired in favour of `ArgumentPackage`. 

## Generate Types ( d.ts )

Compile and bundle all files provided via the following arguments `{ files, name, ignore, out }` into a d.ts format.

| Argument  | values | Description|
| ------------- | :-------------: | ------------- |
| `forge.files`, `builder.ignore`      | ( file \| glob )[] | Comma seperated file list. Also will resolve glob targets.     |
| `forge.name`      | string    | Used the decalre the namespace in `declare module` statement.  |
| `forge.out`      | file     | _(  Optional )_ argument to target to write or default to stdout. |

## Build

Using an entry file. Builds and bundles files. Build does not support aliases like library but will in future releases.

| Argument  | values | Description|
| ------------- | :-------------: | ------------- |
| `forge.entry`      | file | Entry file for build process.     |
| `forge.out`      | file     | _(  Optional )_ argument to target to write or default to stdout. |
| `builder.format`      | "cjs" \| "esm" \| "iife" | The format to use while bundling.    |
| `builder.platform`      | "node" \| "neutral" \| "browser" | The target platform to optimize imports.    |
| `builder.external`   | string, json://, json.keys()://, json.values()     | External files to exclude it from your build. If your suppy `json.keys(dependencies)://package.json` You can load a json file and traverse and mount it to the appropriate keys, properties, or array values.   |

| Flags  | Description|
| ------------- | ------------- |
| `Transform.write.obfuscate` | All code produce is obfuscated using default values.     |


## Generate Library

Export all files provided via the following arguments `{ files, library: { root },  ignore, out }` into a library file. Unlike typical builds library exports dont have an entry point and are simply all the file bundled while preserving imports and export. Use these to dynamically load in javascript or speed up bundling by precompiling code; 


| Argument  | values | Description |
| ------------- | :-------------: | ------------- |
| `files`, `builder.ignore`     | ( file \| glob )[] | Comma seperated file list. Also will resolve glob targets. |
| `root`        | string    | All files will use this as a base when resolving file location to import/export   |
| `builder.alias.files`         | Record<string, string>     | This will resolves aliases during imports |
| `builder.alias.directores`   | Record<string, string>     | This will resolves aliases for directories during imports |
| `builder.external`   | string, json://, json.keys()://, json.values()     | External files to exclude it from your build. If your suppy `json.keys(dependencies)://package.json` You can load a json file and traverse and mount it to the appropriate keys, properties, or array values.   |
| `builder.format`      | "cjs" \| "esm" \| "iife" | The format to use while bundling.    |
| `builder.platform`      | "node" \| "neutral" \| "browser" | The target platform to optimize imports.    |

| Flags  | Description|
| ------------- | ------------- |
| `builder.transform.write.obfuscate` | All code produce is obfuscated using default values.     |


# Examples

## Programatic transformation of source code

transform and execute a script inline. Provides the finest control over `@onyx-ignition/forge-typescript`. More documentation and examples to come

``` 
// Example to show how to transform code loaded from a .ts file into .js file  

import { Attributes, ForgeFile } from "@onyx-ignition/forge";
import { BuilderConfig, ForgeBuilderOptions, IBuilderResult, $Transform } from "@onyx-ignition/forge-typescript";

// build properties
const builderOptions: ForgeBuilderOptions = new BuilderConfig({
    bundled: "merge", 
    platform: "node",
    format: "cjs"
});

// load code source
const contents: string = await ForgeFile.$ReadDecoded("./index.ts");

// transform code and returnin object
const result: IBuilderResult = await $Build({ source: "index.js", root: "./", contents }, builderOptions);

if (result.success == true) {

    // use the code for whatever conquests drives you. Be the master of your destiny!!!
    const { code }: { code?: unknown } = result.or({ code: true }).first;

}

```