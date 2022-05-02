const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PrettierPlugin = require("prettier-webpack-plugin");
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const pages = [
	'home',
	'about',
	'blog'
]

module.exports = {
	entry: pages.reduce((config, page) => {
		config[page] = `./pages/${page}.js`;
		return config;
	}, {}),
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		},
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false
			})
		]
	},
	plugins: [].concat(
		pages.map(
			(page) =>
				new HtmlWebpackPlugin({
					inject: true,
					template: `./${page}.html`,
					filename: `${page}.html`,
					chunks: [page]
				})
		),
		new HtmlWebpackPugPlugin(),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: `./style.css`
		}),
		new ESLintPlugin(),
		new PrettierPlugin({
			printWidth: 80,
			tabWidth: 3,
			useTabs: true,
			semi: true,
			encoding: 'utf-8',
			extensions: ['.js', '.ts'],
			singleQuote: true
		})
	),
	mode: 'development'
}
