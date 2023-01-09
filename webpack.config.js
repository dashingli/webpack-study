const path = require('path');
//引入html-webpack-plugin插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //开发模式
    mode:'development',
    //指定js入口文件
    entry:'./src/index.js',
    //指定输出文件
    output:{
       //指定输出文件夹名
        path:path.resolve(__dirname,'build'),
        //指定输出文件名
        filename:'output.js'
    },
    plugins:
        [
            new HtmlWebpackPlugin({
                //指定html模版入口文件位置
                template: path.resolve(__dirname, "src", "index.html"),
                //指定输出html文件名(他会自动为html文件添加script)
                filename: "output.html"
            })
        ]
    ,
    //devServer 快速开发应用程序
    devServer: {
        static: {
            directory: path.join(__dirname, "build")
        },
        compress: true,
        port: 9000,

    },
    //module表示该插件处理的是各种模块文件
    module: {
        //rules对应不同的文件类型使用不同的loaders
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
            ]
    }
}