const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      "process": require.resolve("process/browser.js"),
      "url": false
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  devServer: {
    port: 3001,
    host: 'localhost',
    hot: true,
    open: true,
    historyApiFallback: true,
    client: {
      overlay: true,
    },
    onListening: function (server) {
      const port = server.server.address().port;
      console.log('Listening on port:', port);
    }
  }
}; 