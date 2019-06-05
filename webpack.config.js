const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: [
            path.resolve(__dirname, 'public'),
            path.resolve(__dirname, 'src'),
        ],
        publicPath: '/dist/',
        hot: true,
        http2: false,
        port: 9000,
        open: false,
    },
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public', 'dist')
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS, using Node Sass by default
                    }
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ],
    },
    plugins: [
        new MomentLocalesPlugin({
            localesToKeep: ['de'],
        }),
    ],
};