module.exports = {
  entry: './lib/clapy.js',
  output: {
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
