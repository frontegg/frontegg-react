import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import ts from "rollup-plugin-typescript2";
import progress from "rollup-plugin-progress";
import postcss from "rollup-plugin-postcss";
import visualizer from "rollup-plugin-visualizer";
import typescript from "typescript";
import fs from "fs";
import transformTypesAlias from "../../conf/transfomTypesAlias";
import loadClassByLibrary from "../../conf/loadClassByLibrary";

const pkg = JSON.parse(fs.readFileSync("./package.json"));
const isProduction = process.env.NODE_ENV === "production";
const uiLibrary = process.env.UI_LIBRARY || "semantic";
console.log(`Building Angular with ${uiLibrary}`)
const plugins = [
  replace({
    __BUILD_ENV__: isProduction ? "prod" : "dev",
    __BUILD_DATE__: () => new Date(),
    "process.env.NODE_ENV": JSON.stringify(isProduction ? "production" : "development"),
    "process.env.FRONTEGG_DEBUG_LEVEL": JSON.stringify(isProduction ? "error" : "debug")
  }),
  json(),
  resolve({ jsnext: true, browser: true }),
  postcss({ extensions: ["scss", "sass"], minimize: true, extract: "style.css" }),
  // commonjs({
  //   include: [
  //     // /node_modules/
  //     // /node_modules\/react/,
  //     // /node_modules\/react-dom/
  //     // /node_modules\/scheduler/,
  //     // /node_modules\/semantic-ui-react/,
  //     // /node_modules\/loose-envify/,
  //     // /node_modules\/prop-types/,
  //     // /node_modules\/object-assign/,
  //     // /node_modules\/@babel/,
  //     // /node_modules\/lodash/,
  //     // /node_modules\/classnames/,
  //     // /node_modules\/keyboard-key/,
  //   ],
  //   exclude: ["/node_modules/**"],
  //   sourceMap: false
  // }),
  isProduction ? terser() : progress(),
  ts({
    typescript,
    clean: true,
    check: true,
    abortOnError: false
  })
];

export default [{
  input: "src/index.ts",
  plugins: [
    ...plugins,
    transformTypesAlias(),
    loadClassByLibrary({ uiLibrary }),
    visualizer()
  ],
  external: [...Object.keys(pkg.dependencies || [])],
  // external: [
  //   "semantic-ui-react",
  //   "underscore",
  //   "redux",
  //   "moment"
  // ],
  // inlineDynamicImports: true,
  output: {
    exports: "named",
    sourcemap: !isProduction,
    dir: "./dist/angular",
    format: "es",
    name: "FronteggWeb"
  }
}];
