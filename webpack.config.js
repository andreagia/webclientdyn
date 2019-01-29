var path = require('path');
var webpack = require('webpack');
var combineLoaders = require('webpack-combine-loaders');

module.exports = {
    entry: './src/main/js/index.js',
    devtool: 'sourcemaps',
    cache: true,
    output: {
        path: __dirname + "/src/main/webapp/static/built/",
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test:  /\.js|jsx$/,
                exclude: /(node_modules)/,
                use: ['babel-loader'],

            }, {
                test: /\.css$/,
                loader: combineLoaders([
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    }
                ])
            }
        ]
    }
};