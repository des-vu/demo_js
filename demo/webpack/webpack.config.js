const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    //模式  development 开发模式     生产模式（线上模式）production
    mode: 'production',
    // loader
    module: {
        rules: [{
            //es6 解析成es5的loader    babel-loader
            //npm install -D babel-loader @babel/core @babel/preset-env
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }, {
            //css-loader style-loader  解析css的loader
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        }, {
            //解析图片的 url-loader
            test: /\.(png|jpg|gif)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }]
        }, {
            //file-loader 文件管理的loader
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {}
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './index.html',
            title: '微信'
        })
    ]
}

//   webpack-dev-server 配置项目服务
//   npm install webpack-dev-server --save-dev
//   去package.json中的scripts
//       "dev": "webpack-dev-server   --inline --hot --host 0.0.0.0"
//       --host 0.0.0.0  真机测试    在手机输入 ip+端口
//       --hot 热编译
//       --inline 一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台。
//       --port 8888   端口改变
//  npm run dev 运行服务器

// npm run build 打包命令