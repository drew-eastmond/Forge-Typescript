# Forge-Typescript ( beta release )

Typescript Builder Package for Forge Workflow Orchestrator. Currently the CLI interface, serve

## Command Line Interface Routes

## CLI Quick Guide

### Generate Types ( d.ts )

`$ npx @onyx-ignition/forge-typescript [[types [[files]] ./src/ts/*/** [[name]] forge/example [[out]] ./forge.d.ts`

`$ npm run types [[files]] ./src/ts/*/** [[name]] forge/example [[out]] ./forge.d.ts`

### Build and Bundle ( also exclude package.json dependencies via keys )

`$ npx @onyx-ignition/forge-typescript [[build [[entry]] ./src/ts/index.ts [[out]] ./index.js [[platform]] node [[format]] esm [[external]] json.keys://./package.json::dependencies`

`$ node run build [[entry]] ./src/ts/index.ts [[out]] ./index.js [[platform]] node [[format]] esm [[external]] json.keys://./package.json::dependencies`

### Build Library Export ( also exclude package.json dependencies via keys )

`$ npx @onyx-ignition/forge-typescript [[library [[files]] ./src/ts/*/** [[out]] ./dist/ [[platform]] node [[forma]] esm [[external]] json.keys://./package.json::dependencies`

`$ node run library [[files]] ./src/ts/*/** [[out]] ./dist/ [[platform]] node [[forma]] esm [[external]] json.keys://./package.json::dependencies`


### Build NPM/NPX Package ( also exclude package.json dependencies via keys )

`$ npx @onyx-ignition/forge-typescript [[npm [[files]] ./src/ts/*/** [[out]] ./dist/ [[external]] json.keys://./package.json::dependencies [[bin]] [entry] ./src/ts/bin.ts [[library]] [root] ./src/ts/ [name] forge/example`

`$ npm run npm [[files]] ./src/ts/*/** [[out]] ./dist/ [[external]] json.keys://./package.json::dependencies [[bin]] [entry] ./src/ts/bin.ts [[library]] [root] ./src/ts/ [name] forge/example`

## Clean

Recursively deletes all files in the internal temporary folders. Executed before any following route are processed.

`$ node run clean` 

or

`$ node run library [[files]] ./src/ts/*/** [[out]] ./dist/ [[platform]] node [[forma]] esm [[external]] json.keys://./package.json::dependencies [[clean`

## Generate Types ( d.ts )

Compile and bundle all files provided via the following arguments `{ files, name, ignore, out }` into a d.ts format.

| Argument  | values | Description|
| ------------- | :-------------: | ------------- |
| `files`, `ignore`      | ( file \| glob )[] | Comma seperated file list. Also will resolve glob targets.     |
| `name`      | string    | Used the decalre the namespace in `declare module` statement.  |
| `out`      | file     | _(  Optional )_ argument to target to write or default to stdout. |

## Build

Using an entry file. Builds and bundles files. Build does not support aliases like library but will in future releases.

| Argument  | values | Description|
| ------------- | :-------------: | ------------- |
| `entry`      | file | Entry file for build process.     |
| `out`      | file     | _(  Optional )_ argument to target to write or default to stdout. |
| `format`      | "cjs" \| "esm" \| "iife" | The format to use while bundling.    |
| `platform`      | "node" \| "neutral" \| "browser" | The target platform to optimize imports.    |

| Flags  | Description|
| ------------- | ------------- |
| `Transform.write.obfuscate` | All code produce is obfuscated using default values.     |


## Generate Library

Export all files provided via the following arguments `{ files, library: { root },  ignore, out }` into a library file. Unlike typical builds library exports dont have an entry point and are simply all the file bundled while preserving imports and export. Use these to dynamically load in javascript or speed up bundling by precompiling code; 


| Argument  | values | Description |
| ------------- | :-------------: | ------------- |
| `files`, `ignore`     | ( file \| glob )[] | Comma seperated file list. Also will resolve glob targets. |
| `library.root`        | string    | All files will use this as a base when resolving file location to import/export   |
| `alias.files`         | Record<string, string>     | This will resolves aliases during imports |
| `alias.directores`   | Record<string, string>     | This will resolves aliases for directories during imports |
| `external`   | string, json://file::props...     | External files to exclude it from your build. If your suppy `json.keys://package.json::dependencies` You can load a json file and tarverse to the appropriate keys, properties, or array values.   |
| `format`      | "cjs" \| "esm" \| "iife" | The format to use while bundling.    |
| `platform`      | "node" \| "neutral" \| "browser" | The target platform to optimize imports.    |

| Flags  | Description|
| ------------- | ------------- |
| `Transform.write.obfuscate` | All code produce is obfuscated using default values.     |

## Inline execution of files

transform and execute a script inline. Provides the finest control over `@onyx-ignition/forge-typescript`. More documentation and examples to come

| Argument  | values | Description|
| ------------- | :-------------: | ------------- |
| `inline`      | file | `.js` or `.ts` file to evaluate. The provided script has access to `@onyx-ignition/forge-typescript` modules and can direct call     |


``` 
// Example to show how to bundle a ts file into js. Then 

// build properties
const builderOptions: ForgeBuilderOptions = new BuilderConfig({
    bundled: "merge", 
    platform: "node",
    format: "cjs"
});

// load code soruce
const source: string = fs.readFileSync("./index.ts");

// transform code and returnin object
const result: IResult<Attributes> = await $Transform({ source, root: "./", contents }, builderOptions);

if (result.success == true) {

    // use the code for whatever conquests drives you. Be the master of your destiny!!!
    const { code }: { code?: unknown } = result.or({ code: true }).first;

}

```