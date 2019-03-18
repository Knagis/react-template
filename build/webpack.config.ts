/// <reference path="./types.d.ts" />

import * as path from "path";
import * as webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as ExtractCssChunksWebpackPlugin from "extract-css-chunks-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";

function config(env: any, argv: any): webpack.Configuration {
    const mode = argv.mode || "development";

    return {
        context: path.resolve(__dirname, ".."),
        entry: {
            "app": "./src/index.ts",
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: "ts-loader",
            }, {
                test: /\.p?css$/,
                use: [
                    ExtractCssChunksWebpackPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            url: true,
                            importLoaders: 1,
                            localIdentName: "[local]--[hash:5]",
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: "./",
                            },
                        },
                    },
                ],
            }, {
                test: /\.(svg|jpg|png|gif)$/,
                oneOf: [{
                    resourceQuery: /download/, // require("./foo.svg?download")
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "images/[name].[hash:5].[ext]",
                        },
                    },
                }, {
                    resourceQuery: /embed|inline/, // require("./foo.svg?inline")
                    use: {
                        loader: "url-loader",
                        options: {
                            name: "images/[name].[hash:5].[ext]",
                        },
                    },
                }, {
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 1024,
                            name: "images/[name].[hash:5].[ext]",
                        },
                    },
                }],
            },],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
        resolveLoader: {
            modules: ["./build/node_modules"],
        },
        output: {
            filename: mode === "development" ? "[name].js" : "[name].[contenthash:5].js",
            path: path.resolve(__dirname, "..", "dist"),
        },
        plugins: [
            new webpack.optimize.ModuleConcatenationPlugin(),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
            }),
            new ExtractCssChunksWebpackPlugin({
                filename: mode === "development" ? "[name].css" : "[name].[contenthash:5].css",
                chunkFilename: mode === "development" ? "[id].css" : "[id].[contenthash:5].css",
            }),
            new CleanWebpackPlugin(),
        ],
    };
}

export = config;
