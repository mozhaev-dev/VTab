const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');


module.exports = (env, args) => {
  const isProd = args.mode === 'production';

  const outputFileName = ext => isProd ? 
        `[name].[contenthash].bundle.${ext}` : 
        `[name].bundle.${ext}`;

  const plugins = () => {
    const base = [
      new MiniCssExtractPlugin({
        filename: outputFileName('css'),
      }),

      new HtmlWebpackPlugin({
        template: './index.html',
      }),
    ];

    if (!isProd) {
      base.push(new ESLintPlugin());
    }

    return base;
  };

  return {
    target: 'web',

    context: path.resolve(__dirname, 'src'),
  
    resolve: {
      extensions: ['.js'],
  
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src', 'core'),
      },
    },
    
    entry: {
      main: './index.js',
    },
  
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: outputFileName('js'),
      clean: true,
    },

    devtool: isProd ? false : 'source-map',

    devServer: {
      port: 3000,
      open: true,
      hot: true,
      // watchContentBase: true,
    },
  
    plugins: plugins(),
  
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
