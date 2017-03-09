/**
 * Created by PY-DEV on 2/28/2017.
 */
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const fs = require("graceful-fs");


module.exports = {

    devServer: {
        host: '192.168.1.130',
        port: 3001,
        inline: true,

    },


    target:"node",
    node:{
        fs: "empty"
    },
    externals: [nodeExternals()],
    devtool: 'cheap-eval-source-map',
    entry: [
        'webpack-dev-server/client?http://192.168.1.130:3001',
        'webpack/hot/dev-server',
        './drawCircle.js'
    ],



    plugins:  [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                template:'./public/index.html',
            })

        ],

    resolve: {
        modules:['node_modules'],
        extensions: ['.pug','.js','.css','.html','.jpg','.png','.gif']
    },
    module: {
            rules: [{
                test: /\.js$/,
                loaders: 'babel-loader',
                // exclude: '/node_modules/'


            },{
                test: /\.(jpg|png|gif)$/,
                loaders: 'file-loader',
                // exclude: '/node_modules/'


            },{

                test: /\.scss$/,
                loaders:["style-loader","css-loader","sass-loader"],
                // exclude: '/node_modules/'

            },{
                test: /\.pug$/,
                loader:['html-loader','pug-html-loader'],
                // exclude: '/node_modules/'

            }
        ]
    },



    output:{

        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
    },







};
