/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    entry: "./src/frontend/src/index.tsx",
    mode: "production",
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: "ts-loader",
            include: [path.resolve(__dirname, "src/frontend"), path.resolve(__dirname, "src/shared")]
        }]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist/frontend/public"),
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/frontend/html"),
                    to: path.resolve(__dirname, "dist/frontend/html")
                },
                {
                    from: path.resolve(__dirname, "package.json"),
                    to: path.resolve(__dirname, "dist")
                },
            ] 
        })
    ]
};