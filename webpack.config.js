const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: {
        index:"./src/js/index.js",
        info:"./src/js/info.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-[hash:5].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(jpg|png|jpeg|gif|ttf|woff|eot|svg)$/,
                use:[
                  {
                    loader:"url-loader",
                    options:{
                      name:"[name]-[hash:5].[ext]",
                      limit:2000,
                    //   publicpath:"dist/",
                    //   outputpath:"dist/"
                    }
                  }
                ]
            },
          
            {
                test:/\.less$/,
                loader:[{
                    loader:MiniCssExtractPlugin.loader
                },
                {
                    loader:"css-loader"
                },
                {
                    loader:"postcss-loader",
                    options:{
                        ident:"postcss",
                        plugins:[
                            require("autoprefixer")(),
                            require("cssnano")()
                        ]
                    }
                },
                {
                    loader:"less-loader"
                }
            ]

            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]-[hash:5].css'
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename:"index.html",
            template: "./src/index.html",
            minify: {
                removecomment: true,
                collapsewhitespce: true
            },
            chunks:["index"]
        }),
        new HtmlWebpackPlugin({
            filename:"detail.html",
            template:"./src/detail.html",
            minify:{
                removecomment:true,
                collapsewhitespce:true
            },
            chunks:["info"]
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    devServer: {
        port: 1994,
        hot: true,
        contentBase: "./dist",
    },
    mode: "production"
}
