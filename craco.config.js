const webpack = require('webpack');
const path = require('path');

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.resolve = {
                ...webpackConfig.resolve,
                fallback: {
                    "url": require.resolve("url/"),
                    "buffer": require.resolve("buffer/"),
                    "util": require.resolve("util/"),
                    "stream": require.resolve("stream-browserify"),
                    "crypto": require.resolve("crypto-browserify"),
                    "http": require.resolve("stream-http"),
                    "https": require.resolve("https-browserify"),
                    "os": require.resolve("os-browserify/browser"),
                    "process": require.resolve("process/browser"),
                    "path": require.resolve("path-browserify"),
                    "querystring": require.resolve("querystring-es3/"),
                    "zlib": require.resolve("browserify-zlib"),
                    "assert": require.resolve("assert/"),
                    "constants": require.resolve("constants-browserify"),
                    "fs": false,
                    "tls": false,
                    "net": false,
                    "child_process": false
                }
            };

            webpackConfig.plugins = [
                ...webpackConfig.plugins,
                new webpack.ProvidePlugin({
                    process: 'process/browser',
                    Buffer: ['buffer', 'Buffer']
                }),
                new webpack.NormalModuleReplacementPlugin(
                    /node:url/,
                    require.resolve('url/')
                )
            ];

            return webpackConfig;
        }
    }
};