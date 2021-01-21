const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
    port: 9000,
    writeFile: true
  },
  entry: {
    options: path.resolve(__dirname, "./src/index-options.js"),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                {
                  'plugins': ['@babel/plugin-proposal-class-properties']
                }
              ]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'options.html',
      template: 'src/options.html',
      chunks: ['options']
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets/manifest.json', to: '[name].[ext]' },
        { from: 'src/background.js', to: '[name].[ext]' },
        { from: 'src/inject_script.js', to: '[name].[ext]' },
        { from: 'assets/*.png', to: '[name].[ext]' }
      ]
    }),
    new CleanWebpackPlugin()
  ]
}