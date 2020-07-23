import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import ts from "rollup-plugin-typescript2";
import analyze from "rollup-plugin-analyzer";
import progress from "rollup-plugin-progress";
import postcss from "rollup-plugin-postcss";
import typescript from "typescript";
import fs from "fs";

const pkg = JSON.parse(fs.readFileSync("./package.json"));
const isProduction = process.env.NODE_ENV === "production";
const isWatching = process.argv.includes("-w") || process.argv.includes("--watch");

const commonOutput = {
  /**
   * default – suitable if you are only exporting one thing using export default ...
   * named – suitable if you are exporting more than one thing
   * none – suitable if you are not exporting anything (e.g. you are building an app, not a library)
   */
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
  resolve({
    jsnext: true,
    browser: true,
    main: true,
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
  }),
  postcss({ extensions: ["scss", "sass"], minimize: true, extract: "style.css" }),
  commonjs(),
  isProduction ? terser() : progress()
];

const commonConfig = {
  input: "src/index.ts",
  external: [...Object.keys(pkg.dependencies || [])]
};

export default [{
  ...commonConfig,
  plugins: [
    ...plugins,
    ts({
      typescript,
      clean: true,
      check: true,
      abortOnError: false
    })
  ],
  output: {
    ...commonOutput,
    dir: "./dist/cjs",
    format: "cjs"
  }
}, ...(isWatching ? [] : [{
  input: "src/index.ts",
  plugins: [
    ...plugins,
    ts({
      typescript,
      clean: true,
      check: true,
      abortOnError: false
    }),
    analyze({ summaryOnly: true })
  ],
  output: {
    file: "./dist/umd/index.js",
    name: pkg.name,
    sourcemap: !isProduction,
    format: "umd",
    globals: [],
    exports: "named"
  }
}])
];
