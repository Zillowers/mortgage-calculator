const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/public/dist');

const browserConfig = {
  entry: SRC_DIR + '/index.jsx',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1, modules: true },
            },
            {
              loader: 'postcss-loader',
              options: { plugins: [autoprefixer()] },
            },
          ],
        }),
      },
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: { presets: ['react-app'] },
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles/[name].css',
    }),
  ],
  externals: {
    newrelic: true,
  },
};

const serverConfig = {
  entry: './server/server.js',
  target: 'node',
  output: {
    path: DIST_DIR,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader/locals',
            options: { importLoaders: 1, modules: true },
          },
        ],
      },
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: { presets: ['react-app'] },
      },
    ],
  },
  externals: {
    newrelic: true,
  },
};

module.exports = [browserConfig, serverConfig];

// module.exports = {
//   entry: `${SRC_DIR}/index.jsx`,
//   output: {
//     filename: 'bundle.js',
//     path: DIST_DIR,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx?/,
//         include: SRC_DIR,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//         },
//       },
//       {
//         test: /\.css$/,
//         loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
//       },
//     ],
//   },
// };
