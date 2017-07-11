const plugin = require('babel-plugin-async-to-promises');
module.exports = {
	entry: {
	 app: './index.js',
	},
	output: {
		path: __dirname + '/public',
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				loader: 'babel-loader',
				test: /\.(js|jsx)$/,
				exclude: /node_modules\/proptypes|scripts\/sw.js/,
				options: {
					presets: ['es2017'],
					plugins:[
						["async-to-promises"]
					],
				}
			}
		]
	},
}