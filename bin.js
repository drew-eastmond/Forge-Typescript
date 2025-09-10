#! /usr/bin/env node

const { ForgePath, ForgeFile, ForgeClient, ForgeIO, FileDirectoryRoute, ForgeModel, ForgeModelRoute, FileModelPipe, reactive, DecodeAttributes, EncodeAttributes, ForgeStoreMime, ESBuildBundler, BuildConfig, $ParseStoreUpgrade, ForgeRoute } = require("@onyx-ignition/forge");
const { workerData } = require("worker_threads");
const Twig = require("twig"); // Twig module
const sass = require('sass');
const { exec, execSync } = require("child_process");
const JavaScriptObfuscator = require('javascript-obfuscator');
const UglifyJS = require("uglify-js");

console.log("client started", workerData);

// `npx --node-options=--inspect @onyx-ignition/forge-core --build-- {{\"entry\": \"./src/tsx/index.tsx\", \"target\": \".www/js/app.js\", \"format\": \"cjs\", \"platform\": \"node\" }}`
// `npx --node-options=--inspect @onyx-ignition/forge-core --build-- {{\"entry\": \"./src/tsx/index.tsx\", \"target\": \"./www/js/app.js\", \"format\": \"cjs\", \"platform\": \"node\" }}`

// npx --node-options=--inspect @onyx-ignition/forge-core --inspect --worker-- .\worker.js --port-- 1234 --www-- ./www/ --watch-- ./src/
// npx --node-options=--inspect-brk @onyx-ignition/forge-core --build { { "entry": "./src/tsx/Application.tsx", "format": "cjs", "platform": "node" } }

// `npx --node-options=--inspect @onyx-ignition/forge-core --inspect --worker-- .\worker.js --port-- 1234 --www-- ./www/ --watch-- ./src/`;
// npx --node-options=--inspect github:drew-eastmond/Forge --inspect --worker-- .\worker.js --port-- 1234 --www-- ./www/ --watch-- ./src/

(async function () {
    
    const application = new class extends ForgeClient {

        _permission

        constructor(options) {

            super(options);

            (async function () {

                console.green("client connected", await this.$connect({ child: true, typescript: true }));
                console.red("ready and waiting", await this.$ready);

                const [model, permission] = await this._$setupModel();
                this._permission = permission;

                this.routes
                    .add(new ForgeRoute()
                        .add({

                            async $authorize(request, response) {

                                console.yellow(/(^\/typescript\/src\/walk\/?)$/.test(request.url.pathname), request.url.pathname);
                                return /(^\/typescript\/src\/walk\/?)$/.test(request.url.pathname);

                            },
                            async $resolve(request, response) {

                                console.log("resolving walk");

                                const fileMap = await ForgeIO.File.$WalkStats("./src/");
                                response.write(JSON.stringify(Array.from(fileMap)));
                                response.status = 200;
                                response.end();

                                console.log("complete resolving walk");

                                return false;

                            }
                        
                        }))

                    .add(new FileDirectoryRoute({ root: "./route/typescript/", indexes: ["index.html"], resolve: { status: 200, end: true } })

                        .add({

                            async $authorize(request, response, route) {

                                // console.yellow(request.url.pathname, /(^\/typescript)|(^\/typescript\/.*?)/.test(request.url.pathname))
                                return /(^\/typescript)|(^\/typescript\/.*?)/.test(request.url.pathname);
                                
                            },

                            async $render(request, response, route, pathing) {

                                try {

                                    const results = /(^\.\/typescript)(?<resolve>.*?)$/.exec(pathing.relative);
                                    let resolvedPath = results.groups.resolve;

                                    // console.blue(pathing, results);

                                    if (pathing.ext == ".html") {

                                        if (resolvedPath == "" || resolvedPath == "/") resolvedPath = "./";
                                        const absolutePath = ForgePath.Resolve(route.root, resolvedPath, `./${pathing.base}`);

                                        // console.green(route.root, resolvedPath, absolutePath, ForgePath.Resolve(route.root, resolvedPath));

                                        const template = Twig.twig({
                                            id: String(Math.random()),
                                            data: new TextDecoder().decode(await route.$fetch(pathing.relative, absolutePath))
                                        }); // "Welcome{% auth 'admin' %} ADMIN{% endauth %}!"

                                        const permissionExport = permission.export();

                                        const header = {

                                            [permissionExport.state[0]]: [permissionExport.state[1]],
                                            [permissionExport.permit[0]]: [permissionExport.permit[1]],

                                            ...permissionExport.verifications,

                                        };

                                        // console.red("permissionExport", permissionExport);

                                        response.write(template.render({

                                            refresh: {
                                                key: permissionExport.permit[0],
                                                value: permissionExport.permit[1],
                                                access: permissionExport.access["render"]
                                            },
                                            permissions: JSON.stringify(permissionExport), 
                                            header: JSON.stringify(header)

                                        }));

                                    } else {

                                        const absolutePath = ForgePath.Resolve(route.root, `.${resolvedPath}`);
                                        response.write(await route.$fetch(resolvedPath, absolutePath));

                                    }

                                    // clear all cache files
                                    route.cache.clear();

                                    return false;

                                } catch (error) {

                                    console.red(error);
                                    response.write(`${route.constructor.name} - Server Error ( ${pathing.relative} ) :\n ${error}`);

                                }

                            }

                        }));

            }.bind(this)());

        }

        async _$setupModel() {

            console.magenta("_setupModel");

            const iModel = new ForgeModel();
            this.iModel = iModel;
            await iModel.proxies.$add(new FileModelPipe(iModel, "./drew.forge.model"));

            const root = iModel.root;
            await $ParseStoreUpgrade(root, `

or({ "builds": true } ); { "builds": true }; "forge/undefined"; empty();
    .or({ "build": true } ); { "build": true }; "forge/undefined"; empty();
        .or({ "enabled": true } ); { "enabled": true }; "application/json; charset=utf-16"; json({ "enabled": true });
        .or({ "extensions": true } ); { "extensions": true }; "application/json; charset=utf-16"; json({ "extensions": "(\\\\.ts|x$)|(\\\\.js|x$)" });
        .or({ "entry": true } ); { "entry": true }; "application/json; charset=utf-16"; json({ "entry": "./src/tsx/index.tsx" });
        .or({ "types": true } ); { "types": true }; "application/json; charset=utf-16"; json({ "types": true });
        .or({ "format": true } ); { "format": true }; "application/json; charset=utf-16"; json({ "format": "cjs" });
        .or({ "platform": true } ); { "platform": true }; "application/json; charset=utf-16"; json({ "platform": "browser" });
        .or({ "manifest": true } ); { "manifest": true }; "application/json; charset=utf-16"; json({ "manifest": "" });
        .or({ "externals": true } ); { "externals": true }; "application/json; charset=utf-16"; json({ "externals": ["./manifest.txt"] });
        .or({ "targets": true } ); { "targets": true }; "application/json; charset=utf-16"; json({ "targets": [ { "file": "./www/js/app.js", "transform": "none", "overwrite": true } ] });
        .or({ "subform": true } ); { "subform": true }; "application/json; charset=utf-16"; json({ "subform": { "text-a": "test test", "text-b": "happy", "text-c": "option 3", "inner-form": { "text-a": ">>>", "text-b": "wowowo", "fav_language": "HTML", "invalidate-form": { "fav_language": "option 5", "invalidate-form": { "fav_language": "option 2" } } } } });
        

        .or({ "errors": true } ); { "errors": true }; "application/json; charset=utf-16"; json({ "errors": []});
        .or({ "warnings": true } ); { "warnings": true }; "application/json; charset=utf-16"; empty();
`);

            const modelRoute = new ForgeModelRoute(iModel, {
                race: iModel.race,
                hooks: [
                    {
                        async $authorize(request, response, iRoute) {

                            // console.yellow("IT COULD WORK MODEL", request.url.pathname, /\/model/.test(request.url.pathname));

                            // if (/\/model/.test(request.url.pathname)) console.yellow(request.url);

                            return (/\/model/.test(request.url.pathname));

                        },
                        async $resolve(request, response, iRoute) {

                            // response.write(EncodeAttributes(permissionExport));
                            response.type = response.type || ForgeStoreMime.JSON;
                            response.status = 200;

                            await iModel.$flush();

                        },
                        async $reject(request, response, iRoute) {

                            console.red("rejected route");

                        },
                        async $finally(request, response, iRoute) {

                            // console.red("FINALLY FLUSH")
                            // console.green("FINALLY FLUSH")
                            // console.blue("FINALLY FLUSH")

                        }
                    }
                ]
            });

            const exposedStores = [...iModel].map((entry) => { return entry[0] });
            const modelPermission = modelRoute.expose(exposedStores);
            modelPermission.refresh();

            const reactor = reactive(iModel);
            reactor.subscribe(function (state) {

                console.yellow("refreshed permission", Object.keys(state));

                if ("mutate" in state) {

                    modelPermission.add(state.mutate[0]);
                    modelPermission.remove(state.write[0]);

                    modelPermission.refresh();

                }

            });

            this.routes.add(modelRoute);

            return [iModel, modelPermission];

        }


        async $execute(signal, data, session) {

            console.log("executed", signal, data, String(session));

            return { i: "win" };

        }

        async $watch(data, session) {

            let { file, event } = data;
            file = file.replace(/\\/g, "/");

            console.green(`watch for "${file}"`, data);

            const iQuery = await this.iModel.$query();

            const extensionsStore = iQuery.or({ extensions: true }).last;
            const { extensions } = await $DecodeStore(extensionsStore);
            const extensionsRegExp = (extensions == "") ? new RegExp("(\\.ts|x$)|(\\.js|x$)") : new RegExp(extensions);

            if (extensionsRegExp.test(file)) {

                const entryStore = iQuery.or({ entry: true }).last;
                const { entry } = await $DecodeStore(entryStore);

                const platformStore = iQuery.or({ platform: true }).last;
                const { platform } = await $DecodeStore(platformStore);

                const formatStore = iQuery.or({ format: true }).last;
                const { format } = await $DecodeStore(formatStore);

                await $BuildManifest(iQuery.or({ manifest: true }).last);

                const errors = await $CheckTypes(entry, iQuery.or({ types: true }).last);

                const { types } = await $DecodeStore(iQuery.or({ types: true }).last);
                if (types ) {

                    
                    /* try {

                        console.log("generating @types from manifest ( ignoring warnings & errors )");
                        execSync(`npx -p typescript@5.6.2 tsc ${entryFile} --declaration --allowJs --emitDeclarationOnly --allowSyntheticDefaultImports --outDir ${DIST}/@types --target esnext --moduleResolution ${platform}`, { stdio: "inherit" });


                    } catch (error) {

                        console.log("@types have errors");
                        console.error(error);
                        // process.exit();

                    } */

                }

                console.red(entry, entryStore);


                const esBuilder = new ESBuildBundler(entry, new BuildConfig({
                    format,
                    platform,
                    "external": ["path", "node:worker_threads", "child_process", "fs", "os", "crypto", "tty", "esbuild", "express"]
                }));

                // invalidate the cache entry for the modified file
                esBuilder.cache.delete(file);

                const result = await esBuilder.$build();

                console.group("\nbuild attributes...");
                for (const [entry, attributes] of result) console.yellow(attributes);
                console.groupEnd();

                // purge previous errors and warnings
                const errorsStore = iQuery.or({ errors: true }).last;

                if (result.success) {

                    const targetsStore = iQuery.or({ targets: true }).first;
                    const [buffer, mime] = await targetsStore.$read();
                    const targets = DecodeAttributes(buffer).targets;


                    console.parse(`\n<green>bundling <yellow>${entry}</yellow> to targets:</green><red>`, targets, "\n");

                    // cleat out the errors
                    const newError = await errorsStore.$write(EncodeAttributes({ errors }), ForgeStoreMime.JSON);

                    await this.iModel.$flush();

                    const { code } = result.or({ code: true }).last;

                    for (const targetData of targets) {

                        const { file, transform, overwrite } = targetData;

                        if (overwrite == false && ForgeFile.$FileExist(file)) continue;

                        switch (transform) {
                            case "none":
                                await ForgeFile.$Write(file, code);
                                break;

                            case "minify":

                                console.red("UglifyJS.minify renewing 25000", Date.now());
                                await (async function () {
                                    
                                    const result = UglifyJS.minify(code);
                                    if (result.error === undefined) { // runtime error, or `undefined` if no error

                                        session.renew(25000);
                                        await ForgeFile.$Write(file, result.code);

                                    } else {

                                        console.magenta(result.error)

                                        errors.push({

                                            source: "Minify",
                                            file,
                                            row: 0,
                                            column: 0,
                                            message: result.error,
                                            notes: []

                                        });

                                    }

                                })();
                                
                                break;

                            case "obfuscate":
                                console.red(`obfuscate ${entry} to ${file}`);
                                console.yellow("Renewing Session for obfuscate: 25000");

                                session.renew(25000);
                                await (async function () {

                                    const obfuscationResult = JavaScriptObfuscator.obfuscate(code);
                                    await ForgeFile.$Write(file, obfuscationResult.getObfuscatedCode());

                                })();

                                break;

                        }

                    }

                    await this.iModel.$flush();

                    console.green("success bundling", entry, Date.now());

                    return {

                        success: true,
                        message: `typescript compiled from "${entry}" to [${targets.map((targetData) => `"${targetData.file}"`).join(", ")}]`

                    };

                } else {

                    // save new errors
                    for (const [error, attributes] of result.or({ error: true })) {

                        console.red(error);
                        errors.shift(error);

                    }

                    const newError = await errorsStore.$write(EncodeAttributes({ errors, "date": Date.now() }), ForgeStoreMime.JSON);

                    await this.iModel.$flush();

                    console.log(String(this.iModel));

                    console.red(`error bundling with ${result.or({ error: true }).size} errors`, entry);

                    return {

                        success: false,
                        message: "error compiling"

                    };

                }

            } else if (/.scss$/.test(file)) {

                try {

                    const source = `./src/scss/index.scss`;
                    const target = `./www/css/compiled.css`;
                    const result = sass.compileString(await ForgeIO.File.$ReadString(source));
                    await ForgeFile.$Write(target, String(result.css));

                    console.parse(`<green>SASS/SCSS successfully compile from <yellow>${source}<green> to <yellow>${target}`);

                    return {
                        success: true,
                        message: `scss compiled to ${target}`
                    };

                } catch (error) {

                    console.error(error);

                    return {
                        success: false,
                        message: `scss compile errors`
                    };
                }

            }

            return {
                success: false,
                message: `no compatible files found for ${file}` };

        }

    }({ race: { ".": 5000 } });


    await application.$connect({ hi: "drew", client: true });

    

}());



async function $DecodeStore(store) {

    const [buffer, mime] = await store.$read();
    return DecodeAttributes(buffer);

}

async function $BuildManifest(store) {

    const { manifest } = await $DecodeStore(store);
    if (manifest == "") return;

}

async function $CheckTypes(entry, store) {

    const { types } = await $DecodeStore(store);
    if (types == false) return;

    console.yellow("compiling types @ entry")

    try {

        const outputBuffer = execSync(`npx -p typescript@5.6.2 tsc ${entry} --jsx react-jsx --declaration --allowJs --emitDeclarationOnly --allowSyntheticDefaultImports --noEmit --target esnext --moduleResolution node`, { stdio: "pipe" });

        const outputString = outputBuffer.toString(); // Convert the Buffer to a string
        console.log("YIPPE");


    } catch (error) {

        const outputString = error.output.toString().slice(1); // Convert the Buffer to a string
        console.log(outputString)
        // if (outputFile) writeFileSync("./error.txt", outputString);

        const errors = [{

            file: entry,
            row: 0,
            column: 0,
            message: "STRICT TYOE CHECKING<hr/>",
            notes: []

        }];

        const lines = outputString.split("\n");
        for (let i = 0; i < lines.length; i++) {

            const line = lines[i];

            // first check if this line is a note for previous error. There should be 2 whitespaces
            if (line[0] == " " && line[1] == " ") {

                if (errors.length) errors[errors.length - 1].notes.push(line);

            } else {

                const result = /(?<file>(\w+\/)+(\w+(\.\w+)?))\((?<row>\d+),(?<column>\d+)\): error \w+: (?<message>.+)/.exec(line);

                if (result === null) continue;

                const { file, row, column, message } = result.groups;
                errors.push({

                    source: "Checking Types",
                    file,
                    row,
                    column,
                    message,
                    notes: []

                });

            }

        }

        return errors;

    }

}