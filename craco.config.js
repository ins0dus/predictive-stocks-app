const webpack = require('webpack');
const path = require('path');

module.exports = {
    webpack: {
        configure: {
            resolve: {
                fallback: {
                    "url": false,
                    "buffer": require.resolve("buffer/"),
                    "util": require.resolve("util/"),
                    "stream": require.resolve("stream-browserify"),
                    "crypto": require.resolve("crypto-browserify"),
                    "http": require.resolve("stream-http"),
                    "https": require.resolve("https-browserify"),
                    "os": require.resolve("os-browserify/browser"),
                    "process": require.resolve("process/browser"),
                    "path": require.resolve("path-browserify")
                },
                alias: {
                    'url': path.resolve(__dirname, 'src/utils/urlPolyfill.ts')
                }
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                process: 'process/browser',
                Buffer: ['buffer', 'Buffer'],
                URL: ['./src/utils/urlPolyfill', 'URL'],
                URLSearchParams: ['./src/utils/urlPolyfill', 'URLSearchParams']
            })
        ]
    }
};