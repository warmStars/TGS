const webpack = require('webpack');
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    //部署应用包时的基本 URL
    publicPath: './',
    //当运行 vue-cli-service build 时生成的生产环境构建文件的目录
    outputDir: 'dist',
    //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: 'assets',
    // eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
    lintOnSave: false,
    //是否使用包含运行时编译器的 Vue 构建版本。设置true后你就可以在使用template
    runtimeCompiler: false,
    // 生产环境是否生成 sourceMap 文件 sourceMap的详解请看末尾  
    productionSourceMap: false,
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('components', resolve('./src/components'))
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 生产
            config.mode = 'production'
        } else {
            // 开发
            config.mode = 'development'
        }
    },
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin 生产环境下是true,开发环境下是false
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    devServer: { // 设置代理
        host: '0.0.0.0', //ip地址
        port: 8084, //端口
        https: false, //false关闭https，true为开启
        proxy: {
            '/api': { //本地开发
                target: 'http://192.168.1.13:3000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
            '/test': { //测试
                target: 'xxx'
            },
            '/pre': { //预发布
                target: 'xxx'
            },
            '/pro': { //正式
                target: 'https://hb.icbc.com.cn/icbc/hbfh/etcw',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/pro': '/'
                }
            },
            '/yapi': { //mock数据
                target: 'http://yapi.demo.qunar.com/mock/46500',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/yapi': '/'
                }
            }
        }
    },
    // webpack-dev-server 相关配置
    pluginOptions: { // 第三方插件配置
        // ...
    }
}