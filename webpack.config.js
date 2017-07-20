module.exports = {
  entry: {
   app: './babylon/app.js'
  },
  output: {
    path: __dirname + '/babylon/public/js',
    publicPath: '/babylon/public/js/',
    filename: '[name].js',
  }
}