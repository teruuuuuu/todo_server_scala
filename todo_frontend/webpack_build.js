import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
const webpack = require('webpack');

const src  = path.join(__dirname, 'src')
const dist = path.join(__dirname, 'dist')


export default {
  entry: [
    src + '/index.js',
  ],
  output: {
    path: dist,
    filename: 'bundle.js',
  },
  devServer: {
    hot: true, // Live-reload
    inline: true,
    port: 8000, // Port Number
    host: 'localhost', // Change to '0.0.0.0' for external facing server
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
    {
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.(jpg|jpeg|gif|png|ico|ttf|otf|eot|svg|woff|woff2)(\?[a-z0-9]+)?$/,
      loader: 'file-loader?name=[path][name].[ext]'
    },
    {
      test: /\.styl$/,
      loader: "style!css!stylus",
      exclude: /\.useable\.css$/,
    },
    {
      test: /\.useable\.css$/,
      loader: "style/useable!css"
    }
  ]
  },
  stylus: {
    use: [require('nib')()],
    import: ['~nib/lib/nib/index.styl']
  },
  resolve: {
    extensions: ['', '.js']
  }
}
