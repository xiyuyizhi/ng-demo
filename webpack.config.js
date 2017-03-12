/**
 * Created by xiyuyizhi on 16-12-20.
 */

var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var DashboardPlugin = require('webpack-dashboard/plugin')

var config={

    entry:{
        app:__dirname+'/src/index.js',
        vendors:['angular','angular-ui-router','angular-ui-bootstrap','dragula','angular-drag-and-drop-lists']
    },
    output:{
        path:'docs',
        filename:'[name].[hash].js'
    },
    resolve: {
        modulesDirectories: ['node_modules','./'],
        alias: {
            'npm': __dirname + '/node_modules',
            'dragula':'angularjs-dragula/dist/angular-dragula.js',
            'dragular.css':'angularjs-dragula/dist/dragula.min.css'
        },
        extensions: ['', '.js', '.html','.css']
    },
    module:{
        // preLoaders: [
        //     {
        //         test: /\.js$/,
        //         loader: "eslint-loader",
        //         exclude: /node_modules/,
        //     },
        // ],
        loaders:[
            {
                test:/\.js/,
                loaders:['ng-annotate?add=true','babel'],
                exclude:/node_modules/
            },{
                test:/\.less/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader!less'
                )
            },
            {
                test:/\.css/,
                loader: ExtractTextPlugin.extract(
                  'style-loader',
                  'css-loader'
                )
            },
            {
                test: /\.(png|jpg|jpeg|svg)$/,
                loader: 'url?limit=1024'
            },{
                test:/\.html/,
                loader:'html'
            }
        ]
    },
    // eslint: {
    //     configFile: '.eslintrc',
    //     fix:true
    // },
    //devtool: 'eval-source-map',
    plugins:[
        //new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new DashboardPlugin(),
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            template:'src/index.html',
            inject: 'body'
        })
    ],
    devServer: {
        host:'0.0.0.0',
        port: 3001,
        proxy: {
            '/api/*': {
                target: 'http://localhost:3005/',
                changeOrigin: true,
                secure: false
            }
        }
    }

}

module.exports=config