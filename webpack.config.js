const path = require('path');

module.exports = {
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [ 'style-loader', 'css-loader', 'sass-loader', 'postcss-loader' ],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
};
