import { ForgeFile } from "@onyx-ignition/forge-core";

const UglifyJS = require("uglify-js");

console.log("uglify");

var code = "function add(first, second) { return first + second; }";
var result = UglifyJS.minify(code);

Forge

if (result.error) {

    

} else {



}

console.log("error\n",result.error); // runtime error, or `undefined` if no error
console.log("code", result.code);  // minified output: function add(n,d){return n+d}

function $Compile() {




}