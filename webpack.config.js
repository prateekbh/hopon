module.exports = {
  entry: {
   app: './hop/app.js'
  },
  output: {
    path: __dirname + '/hop/public/js',
    publicPath: '/hop/public/js/',
    filename: '[name].js',
  }
}