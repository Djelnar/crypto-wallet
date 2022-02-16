const {
  override,
  addWebpackPlugin,
  removeModuleScopePlugin,
} = require('customize-cra')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = override(
  removeModuleScopePlugin(),
  addWebpackPlugin(new NodePolyfillPlugin()),
)
