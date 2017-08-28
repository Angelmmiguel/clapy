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
      }
    ]
  },
}
