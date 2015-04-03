var path = require('path');

var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    entry: {
        style: './webapp/style.js',
        app: './webapp/app.js'
    },
    output: {
        publicPath: '/webapp/dist',
        path: path.join(__dirname, './webapp/dist'),
        filename: '[name]-bundle.js'
    },
    devtool: 'source-map',
    plugins: [
        // new CommonsChunkPlugin("share.js"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
    ],
    module: {
        loaders: [
            {tests: /\.js$/, loaders: ['react-hot', 'jsx?harmony'] },
            { test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader'] }
        ]
    },
    externals:{
        // react: 'React',
        // 'react/lib/ReactWithAddons': 'React'
    }
}