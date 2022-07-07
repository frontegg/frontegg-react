const webpack = require('@cypress/webpack-preprocessor');
const webpackOptions = {
  mode: 'development',
  node: {
    fs: 'empty',
  },
  resolve: {
    extensions: ['.jsx', '.tsx', '.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread',
            [
              '@babel/plugin-transform-runtime',
              {
                regenerator: true,
              },
            ],
            'istanbul',
          ],
        },
      },
    ],
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
};

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config);
  on(
    'file:preprocessor',
    webpack({
      webpackOptions,
      watchOptions: {},
    })
  );
  return config;
};
