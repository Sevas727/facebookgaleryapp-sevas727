/**
 * Created by User on 02.02.2017.
 */
var webpack = require("webpack");
var path = require('path');

module.exports = {
    entry: "./app/index.js",
    output: {
        path: __dirname + "/build",
        filename: "./index.js",
        publicPath: "/"

    },
    module: {
        loaders: [
            /*{
                test: /\.js$/,
                loaders: ['ng-annotate','required-loader?import[]=angular'],
                exclude: /node_modules/
            },*/
            {test: /\.html$/, loaders: "html-loader"},
            {
                test    : /\.css$/,
                loaders : 'style-loader!css-loader?importLoaders=2&sourceMap'
            },
            {
                test    : /\.(jpg|png|gif)$/,
                loaders :
                    [
                        'file-loader?name=[name].[ext]' // Any png-image or woff-font below or equal to 10K will be converted to inline base64 instead
                    ]
            },
            /*{
                test: /\.gif$/,
                loader: 'file-loader?name=[name].[ext]',
            },*/
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?mimetype=image/svg+xml',
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?mimetype=application/font-woff',
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?mimetype=application/font-woff2',
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?mimetype=application/octet-stream',
            },
            {
                test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader?mimetype=application/font-otf',
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
            },

        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery/dist/jquery.min.js",
            jQuery: "jquery/dist/jquery.min.js",
            "window.jQuery": "jquery/dist/jquery.min.js"
        })
    ],
    watch: true,
    devtool: "source-map"
}