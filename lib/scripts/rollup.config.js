import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import ts from "rollup-plugin-typescript2";
import progress from "rollup-plugin-progress";
import postcss from "rollup-plugin-postcss";
import typescript from "typescript";
import fs from "fs";
import path from "path";
import movePackageJson from "./rollup.move-packace-json";
import transformTypesAlias from "./rollup.transform-types-alias";

const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), "./package.json")));
const tsConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), "./tsconfig.json")));
const isProduction = process.env.NODE_ENV === "production";
const distFolder = path.join(__dirname, `../../dist/${pkg.name}/`);


const internalDeps = [
  "redux",
  "react-redux"
];

const plugins = [
  replace({
    __BUILD_ENV__: isProduction ? "prod" : "dev",
    __BUILD_DATE__: () => new Date(),
    "process.env.NODE_ENV": JSON.stringify(isProduction ? "production" : "development"),
    "process.env.FRONTEGG_DEBUG_LEVEL": JSON.stringify(isProduction ? "error" : "debug")
  }),
  json(),
  resolve({
    jsnext: true,
    browser: true,
    preferBuiltins: true,
    main: true,
    module: true,
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
  }),
  postcss({
    extensions: ["scss", "sass"],
    minimize: true,
    extract: "style.css"
  }),
  commonjs({
    include: [/node_modules/],
    sourceMap: false
  }),
  isProduction ? terser() : progress(),
  ts({
    typescript,
    clean: true,
    check: true,
    abortOnError: false
  }),
  transformTypesAlias({distFolder, tsConfig}),
  movePackageJson({ distFolder, pkg })
];

export default {
  input: "src/index.ts",
  external: [...Object.keys(pkg.dependencies || []).filter(dep => internalDeps.indexOf(dep) === -1)],
  plugins,
  inlineDynamicImports: true,
  output: {
    exports: "named",
    sourcemap: !isProduction,
    dir: distFolder,
    format: "cjs"
  }
};
