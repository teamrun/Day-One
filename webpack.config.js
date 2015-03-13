module.exports = {
    entry: './webapp/app.js',
    output: {
        path: './webapp/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {tests: /\.js$/, loaders: ['jsx?harmony'] }
        ]
    }
}