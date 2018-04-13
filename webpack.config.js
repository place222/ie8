var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
//只在不使用压缩的时候起作用
var es3ifyPlugin = require('es3ify-webpack-plugin')
//真正干活好使的
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var path = require('path')


module.exports = {
    mode: 'production', //生产
    // devtool: 'none',//不要映射 使用自定义的压缩在那里面设置了
    // devtool:'inline-source-map',
    entry: {
        main: './src/js/main.js',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, './dist')
    },
    externals:{
        jquery:'window.jquery',
        $:'widnow.$'
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
    optimization: {
        //定义代码拆分
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /node_modules\//,
                    name: 'js/vendor',
                    enforce: true
                }
            }
        },
        //自定义压缩工具
        minimizer: [
            //真正生产构建的时候需要设置压缩兼容ie8的
            new UglifyJsPlugin({
                cache: true,
                parallel: true,

                uglifyOptions: {
                    ecma: 7,
                    ie8: true
                }
            }),
        ]
    },
    plugins: [
        // new es3ifyPlugin(),
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin('./dist'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
}