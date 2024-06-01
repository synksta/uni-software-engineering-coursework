// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const json = require('./file.json')
const { prefetch } = require('webpack')

const isProduction = process.env.NODE_ENV == 'production'

const config = {
	entry: {
		bundle: path.resolve(__dirname, 'src/index.js'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[contenthash].js',
		clean: true,
		assetModuleFilename: '[name][ext]',
	},

	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
			// watchFile: ['src/**/*'],
		},
		port: 3000,
		hot: true,
		open: true,
		compress: true,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/i,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.css$/i,
				include: path.resolve(__dirname, 'src'),
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.(json|eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset/resource',
			},
			// Add your rules for custom modules here
			// Learn more about loaders from https://webpack.js.org/loaders/
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Dijkstra',
			filname: 'index.html',
			template: './src/template.html',
		}),
	],
}

module.exports = () => {
	if (isProduction) {
		config.mode = 'production'
	} else {
		config.mode = 'development'
	}
	return config
}
