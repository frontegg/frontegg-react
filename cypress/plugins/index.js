/// <reference types="cypress" />
const webpack = require("@cypress/webpack-preprocessor");
const webpackOptions = {
  mode:'production',
  node: {
    fs: "empty"
  },
  resolve: {
    extensions: [".jsx", ".tsx", ".js", ".ts"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-typescript",
            "@babel/preset-react"
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-object-rest-spread",
            ["@babel/plugin-transform-runtime",
              {
                "regenerator": true
              }
            ], "istanbul"
          ]
        }
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  }
};

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  require("@cypress/code-coverage/task")(on, config);
  on("file:preprocessor", webpack({
    webpackOptions,
    watchOptions: {}
  }));
  return config;
};
