require('babel-core/register');
const webpack = require('webpack');
const webpackConfig = require('./webpack_build');

var devUrl = require('./request.url.dev.json')

var devEnv = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
  REQUEST_URL: JSON.stringify(devUrl)
});

webpackConfig.plugins.push(devEnv)
module.exports = webpackConfig;
