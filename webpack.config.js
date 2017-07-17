module.exports = {
  entry: {
   app: './whs/app.js'
  },
  output: {
    path: __dirname + '/whs/public/js',
    publicPath: '/whs/public/js/',
    filename: '[name].js',
  }
}