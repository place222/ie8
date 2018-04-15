const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode:'production',
    entry: {
        dll: ['babel-polyfill']
    },
    output: {
        path: path.resolve('./dist/dll'),
        filename: '[name].js',
        library: '[name]'
    },
    optimization: {
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
    module: {
        // rules: [{
        //     test: /\.js$/,
        //     loader: 'babel-loader',
        //     exclude: /node_modules/
        // }]
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve('./dist/dll', 'manifest.json'),
            name: "[name]"
        })
    ]
}