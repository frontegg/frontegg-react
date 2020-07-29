const ReplacePlugin = require("webpack-plugin-replace");

module.exports = {
  plugins: [
    new ReplacePlugin({
      values: {
        "process.env.NODE_ENV": JSON.stringify("production")
      }
    })
  ]
};
