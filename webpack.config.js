module.exports = {
    entry: {
        style: './webapp/style.js',
        app: './webapp/app.js'
    },
    output: {
        path: './webapp/dist',
        filename: '[name]-bundle.js'
    },
    // devtool: 'inline-source-map',
    devtool: 'eval',
    module: {
        loaders: [
            {tests: /\.js$/, loaders: ['jsx?harmony'] },
            { test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader'] }
        ]
    }
}