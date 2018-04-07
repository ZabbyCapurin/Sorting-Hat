const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, 'dist/scripts');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
    devtool: 'source-map',
    entry: { 
        // jsx: APP_DIR + '/templates/index.jsx',
        app: APP_DIR + '/scripts/output/app.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                loaders: ['eslint-loader', 'babel-loader'],
                include : APP_DIR,
                exclude: path.resolve(__dirname, 'node_modules/')
            }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].bundle.js'
    },
};

module.exports = config;