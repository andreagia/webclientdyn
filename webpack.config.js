//var path = require('path');
var webpack = require('webpack');
var combineLoaders = require('webpack-combine-loaders');
//const WorkboxPlugin = require('workbox-webpack-plugin');
module.exports = {
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    entry: './src/main/js/index.js',
//    devtool: 'sourcemaps',
//    cache: true,
    output: {
        path: __dirname + "/src/main/webapp/static/built/",
        filename: 'bundle.js'
    },
//    mode: 'development',
//    mode: 'production',
    mode: 'none',
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