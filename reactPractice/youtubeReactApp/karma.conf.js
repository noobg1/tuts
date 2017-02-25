let webpack = require('webpack');

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        singleRun: false,
        frameworks: ['mocha'],
        files: [
            'tests.webpack.js'
        ],
        preprocessors: {
            'tests.webpack.js': ['webpack']
        },
        reporters: ['dots'],
        webpack: {
            module: {
                loaders: [
                    {test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader'},
                    {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
                    { test: /sinon.js$/,                loader: "imports?define=>false" }
                ]
            },
            watch: true
        },
        webpackServer: {
            noInfo: true
        }
    });
};