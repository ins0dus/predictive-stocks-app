const webpack = require('webpack');
const path = require('path');

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.resolve = {
                ...webpackConfig.resolve,
                fallback: {
                    "url": false,
                    "util": require.resolve("util/"),
                    "stream": require.resolve("stream-browserify"),
                    "buffer": require.resolve("buffer/"),
                    "process": require.resolve("process/browser"),
                    "crypto": require.resolve("crypto-browserify"),
                    "https": require.resolve("https-browserify"),
                    "os": require.resolve("os-browserify"),
                    "http": require.resolve("stream-http"),
                    "path": require.resolve("path-browserify"),
                    "querystring": require.resolve("querystring-es3"),
                    "zlib": require.resolve("browserify-zlib"),
                    "assert": require.resolve("assert/"),
                    "constants": require.resolve("constants-browserify"),
                }
            };

            webpackConfig.plugins = [
                ...webpackConfig.plugins || [],
                new webpack.ProvidePlugin({
                    process: 'process/browser',
                    Buffer: ['buffer', 'Buffer'],
                }),
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
                })
            ];

            return webpackConfig;
        }
    }
};