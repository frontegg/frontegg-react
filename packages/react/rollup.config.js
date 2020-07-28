import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import ts from "rollup-plugin-typescript2";
import progress from "rollup-plugin-progress";
import postcss from "rollup-plugin-postcss";
import clear from "rollup-plugin-clear";
import typescript from "typescript";
import fs from "fs";

const pkg = JSON.parse(fs.readFileSync("./package.json"));
const isProduction = process.env.NODE_ENV === "production";

const commonOutput = {
  exports: "named",
  sourcemap: !isProduction
};

const plugins = [
  replace({
    __BUILD_ENV__: isProduction ? "prod" : "dev",
    __BUILD_DATE__: () => new Date(),
    "process.env.NODE_ENV": JSON.stringify(isProduction ? "production" : "development")
  }),
  json(),
  // resolve({
  //   jsnext: true,
  //   browser: true,
  //   main: true,
  //   extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
  // }),
  postcss({ extensions: ["scss", "sass"], minimize: true, extract: "style.css" }),
  commonjs(),
  isProduction ? terser() : progress(),
  ts({
    typescript,
    clean: true,
    check: true,
    abortOnError: false
  }),
];

const commonConfig = {
  input: "src/index.ts",
  external: [...Object.keys(pkg.dependencies || [])]
};

export default [{
  ...commonConfig,
  inlineDynamicImports: !isProduction,
  plugins,
  output: {
    ...commonOutput,
    dir: "./dist/cjs",
    format: "cjs"
  }
}
// , ...(isWatching ? [] : [{
//   input: "src/index.ts",
//   plugins: [
//     ...plugins,
//     ts({
//       typescript,
//       clean: true,
//       check: true,
//       abortOnError: false
//     }),
//     analyze({ summaryOnly: true })
//   ],
//   output: {
//     file: "./dist/umd/index.js",
//     name: pkg.name,
//     sourcemap: !isProduction,
//     format: "umd",
//     globals: [],
//     exports: "named"
//   }
// }])
];
