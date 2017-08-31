// Webpack configuration
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './lib/clapy.js',
  output: {
    library: 'Clapy',
    libraryTarget: 'window',
    filename: './dist/clapy.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env']
        }
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {}
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: 'dist/clapy.css',
      allChunks: true,
    }),
  ],
}
