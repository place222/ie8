var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
//只在不使用压缩的时候起作用
var es3ifyPlugin = require('es3ify-webpack-plugin')
//真正干活好使的
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var path = require('path')


module.exports = {
    mode: 'development', //生产
    devtool: 'inline-source-map',
    entry: {
        'split.test':"./src/js/split.test.js"
        // main: './src/js/main.js',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, './dist')
    },
    externals: {
        jquery: 'window.jquery',
        $: 'widnow.$'
    },
    module: {
        //并没用 只在开发也可以转，但是用es3ifyplugin更好
        // rules: [{
        //     test: /\.js$/,
        //     loader: 'es3ify-loader',
        //     exclude: /node_modules/
        // }]
        //这个开始支持es6
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new es3ifyPlugin(), //开发没用压缩工具的话需要这个来兼容ie8
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin('./dist'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new webpack.DllReferencePlugin({
            manifest: require('./dist/dll/manifest.json')
        }),
    ]
}