const webpack = require('webpack'); // eslint-disable-line
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'dist/scripts');
const APP_DIR = path.resolve(__dirname, 'src/');

const config = {
  devtool: 'source-map',
  entry: {
    vendor: [
      'react',
      'react-dom',
    ],
    app: `${APP_DIR}/scripts/output/app.js`,
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: path.resolve(__dirname, 'node_modules/'),
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: path.resolve(__dirname, 'node_modules/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader',
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new MiniCssExtractPlugin({
    //     // Options similar to the same options in webpackOptions.output
    //     // both options are optional
    //     filename: "[name].css",
    //     chunkFilename: "[id].css"
    // }),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // new HtmlWebpackPlugin({
    //     inject: "body",
    //     title: "tools",
    //     template: path.resolve(__dirname, 'src/index.html')
    // }),
    // new CopyWebpackPlugin([
    //     {
    //         from: path.resolve(__dirname, 'node_modules/react/cjs/react.development.js'),
    //         to: path.resolve(__dirname, 'public/react.js')
    //     },
    //     {
    //         from: path.resolve(__dirname, 'node_modules/react-dom/cjs/react-dom.development.js'),
    //         to: path.resolve(__dirname, 'public/react-dom.js')
    //     }
    // ]),
    // new webpack.DefinePlugin({
    //     'process.env.NODE_ENV': '"development"'
    // }),
    // new webpack.optimize.AggressiveMergingPlugin()
  ],
};

module.exports = config;
