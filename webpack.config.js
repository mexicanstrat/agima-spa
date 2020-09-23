const path = require("path");
const webpack = require("webpack") ;
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve (__dirname, "src"),
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            }, 
            {
                test: /\.(jpg|JPG|jpeg|png|gif|ico|svg|ttf|woff2|otf|woff|eot)$/gi,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({template: path.resolve(__dirname, "src", "index.html")}),

    ],
    resolve: {
        extensions: ['.jsx', '.js']
    },
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    devtool: 'inline-source-map'
};