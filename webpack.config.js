var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractPlugin = new ExtractTextPlugin({
    filename: "main.css"
});
var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
    entry: ["babel-polyfill",SRC_DIR + "/app/index.js"],
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: ['transform-decorators-legacy'],
                        presets: ["react", "es2015", "stage-2"]
                       }
                }
            },
            {
                test: /\.less$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    },
    plugins: [extractPlugin]
};
module.exports = config;﻿