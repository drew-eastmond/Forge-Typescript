# Forge-Typescript ( Beta )

`Forge-Typescript` is the typescript builder module for the `Forge` Workflow Orchestrator. It's inherits all the base functionality of forge and use the same packages while 


## Quick Start
```bash 
# Now we can use NPM run scripts or require/import from "@onyx-ignition/Forge-Typescript"
npm install @onyx-ignition/Forge-Typescript

# Standalone execution for maximum portablility
npx @onyx-ignition/Forge-Typescript 

```

## Features
* Executed and routed directly from the CLI using parameters.
* Internal caching for faster builds when using any of the persistent modes.  
* Atomized dependecies when importing which is primed for tree-shaking optimizations.
* Resolvable API routes via Forge's `Signals` architecture:
    * Trigger `Signals` using HTTP request, CLI Arguments, or file watchers.
    * launch custom scripts using `ForgHost`.  
    * Convienient Builder dashboard UI via internal HTTP server.
* Validate, Sanitize and compile typescipt files using the following options:
    * Build d.ts types files for typescript
    * Bundle all code and imports from a entry file
    * Build Library package ( index file + dependendies )
    * Build a NPM Package usign a combination of all previous build options
* Code Transformations like bundling, minimizing, archive compression, or obfuscating outputs.





Currently the CLI interface has had massive updates for QOL developer features. This includes data packaging via `ArgumentPackage` class assist transporting data ( extending the props drilling paradigm ). These argument packages makes merging parameters easy from multiuple sources by using fragments of data.


## CLI Routes

### Generate Types Definition ( d.ts )
````bash
npx @onyx-ignition/forge-typescript [forge] [[types [[files]] ./src/ts/*/** [[name]] forge/example [[out]] ./
forge.d.ts`

npm run types [forge] [[files]] ./src/ts/*/** [[name]] forge/example [[out]] ./forge.d.ts
````

### Build and Bundle

````bash
npx @onyx-ignition/forge-typescript [[build [[entry]] ./src/ts/index.ts [[out]] ./index.js [[platform]] node [[format]] esm [[external]] json.keys(dependencies)://./package.json`

node run build [[entry]] ./src/ts/index.ts [[out]] ./index.js [[platform]] node [[format]] esm [[external]] json.keys(dependencies)://./package.json
````

### Build Library Export Package

````bash
npx @onyx-ignition/forge-typescript [forge] [[library [[files]] ./src/ts/*/** [[out]] ./dist/ [[platform]] node [[format]] esm [[external]] json.keys://./package.json::dependencies

node run library [[files]] ./src/ts/*/** [forge] [[out]] ./dist/ [[platform]] node [[format]] esm [[external]] json.keys://./package.json::dependencies
````


### Build NPM/NPX Package

````bash
npx @onyx-ignition/forge-typescript [forge] [[npm [[files]] ./src/ts/*/** [[out]] ./dist/ [[external]] json.keys://./package.json::dependencies [[bin]] [entry] ./src/ts/bin.ts [[library]] [root] ./src/ts/ [name] forge/example`

$ npm run npm [forge] [[files]] ./src/ts/*/** [[out]] ./dist/ [[external]] json.keys://./package.json::dependencies [[bin]] [[[entry]]] ./src/ts/bin.ts [[library]] [root] ./src/ts/ [name] forge/example`
````

### Initialize a server 

`Forge` will detect the contents of stdin and parse a target file using a JSON loader. 
````bash
echo json://./init.json | npx @onyx-ignition/forge-typescript
````

File contents for init.json
````js
{
    "forge": {

            "http": {
            "port": 1337,
            "root": "./app/",
            "actions": [
                { "url": "^\/types$", "signal": { "types": true } },
                { "url": "^\/bundle$", "signal": { "bundle": true } },
                { "url": "^\/library$", "signal": { "library": true } },
                { "url": "^\/npm$", "signal": { "npm": true } }
            ]

        }

    }

}
````

# Examples

## Programatic transformation of source code

transform and execute a script inline. Provides the finest control over `@onyx-ignition/forge-typescript`. More documentation and examples to come

```ts
// Example to show how to transform code loaded from a .ts file into .js file  

import { Attributes, ForgeFile, ForgePackage, ForgeRequest, ForgeResponse, ArgumentPackagem IArgumentPackage } from "@onyx-ignition/forge";
import { BuilderPackage, BuilderConfig, ForgeBuilderOptions, IBuilderResult, BuilderHost, Write } from "@onyx-ignition/forge-typescript";

// validate and sanitize application arguments ForgePackage.$From( ... )
const forgePackage = IArgumentPackage = await ForgePackage.$From([
    new ArgumentPackage().add({
        bundled: true,
        entry: "./src/your-entry-file.ts",
        out: "./dist/compiled.js"
    }, { forge: true })
]);

// validate and sanitize builder arguments using BuilderPackage.$From( ... ) 
const builderPackage: IArgumentPackage = BuilderPackage.$From([
    new ArgumentPackage().add(new BuilderConfig({
        bundled: "merge", 
        platform: "node",
        format: "cjs"
    }), { builder: true })
]);

// ForgeRequest to send data and ForgeResponse to hold the results
const request: ForgeRequest = new ForgeRequest();
const response: ForgeResponse = new ForgeResponse();

// helper function to encode data 
BuilderHost.AppendRequestData(request, forgePackage.squash(), { forge: true });
BuilderHost.AppendRequestData(request, builderPackage.squash(), { builder: true });

// transform code and returnin object
const builderHost: BuilderHost = new BuilderHost();
builderHost.write = Write.Preserve; // Can write files to an Zip archive or just an array `writes`
await builderHost.$bundle({ bundled: true }, request, response);

// extract code as ArrayBuffer and write out
let out: string = "./dist/";
for (const [write, attributes] of response.writes.or({ out: Intersects })) {

    // all files are combined into a zip file. Write the zip to where the file shoule have been
    if (attributes.zip === true) {

        const target: string = attributes.out as string;
        if (await ForgeFile.$DirectoryExists(out)) {

            out = ForgePath.Join(out, target);

        } else { // is a file, extract the directory

            const { dir }: ForgeParsedPath = ForgePath.Parse(out);
            out = ForgePath.Join(dir, target);

        }

    }

    // output each fragment from the `builderHost.$bundle( ... )`
    const buffer: ArrayBuffer = write as ArrayBuffer;
    await ForgeFile.$Write(out, buffer, { recursive: true });
    console.log("writing file", out, attributes);

}


```


## Advanced usaged and Parameters

Although these parameters are still relevent. This is not an exhaustive list of all parameters. Since  Partially retired in favour of `ArgumentPackage`. 

### Generate Types ( d.ts )

Compile and bundle all files provided via the following arguments `{ files, name, ignore, out }` into a d.ts format.

| Arguments  | values | Description|
| ------------- | :-------------: | ------------- |
| `forge.sources.files`      | ( file \| glob )[] | Comma seperated file list. Also will resolve glob targets.     |
| `forge.name`      | string    | Used the decalre the namespace in `declare module` statement.  |
| `forge.out`      | file     | _(  Optional )_ argument to target to write or default to stdout. |

### Bundle

Compiles and bundles files. Build does not support aliases like library but will in future releases.

| Argument  | values | Description|
| ------------- | :-------------: | ------------- |
| `forge.entry`      | file | Entry file for build process.     |
| `forge.out`      | file     | _(  Optional )_ argument to target to write or default to stdout. |



### Generate Library

Export all files provided via the following arguments `{ files, library: { root },  ignore, out }` into a library file. Unlike typical builds library exports dont have an entry point and are simply all the file bundled while preserving imports and export. Use these to dynamically load in javascript or speed up bundling by precompiling code; 


| Argument  | values | Description |
| ------------- | :-------------: | ------------- |
| `forge.name`      | string    | Used the decalre the namespace in `declare module` statement.  |
| `forge.sources.files`     | ( file \| glob )[] | Comma seperated file list. Also will resolve glob targets. |
| `forge.sources.root`        | string    | All files will use this as a base when resolving file location to import/export   |


| Flags  | Description|
| ------------- | ------------- |
| `builder.transform.write.obfuscate` | All code produce is obfuscated using default values.     |


### Builder Options
Compiles and bundles files. Build does not support aliases like library but will in future releases.

| Argument  | values | Description|
| ------------- | :-------------: | ------------- |
| `builder.format`      | "cjs" \| "esm" \| "iife" | The format to use while bundling.    |
| `builder.platform`      | "node" \| "neutral" \| "browser" | The target platform to optimize imports.    |
| `builder.external`   | string, json://, json.keys()://, json.values()     | External files to exclude it from your build. If your suppy `json.keys(dependencies)://package.json` You can load a json file and traverse and mount it to the appropriate keys, properties, or array values.   |
| `builder.alias.files`         | Record<string, string>     | This will resolves aliases during imports |
| `builder.alias.directores`   | Record<string, string>     | This will resolves aliases for directories during imports |
| `builder.transform.write` | "obfuscate" \| "obfuscate-seperate-map" \| "obfuscate-inline-map" \| "minify" \| "gzip" \| "brotli" \| "zip" \| "base64" |  All code produce is obfuscated using default values.     |