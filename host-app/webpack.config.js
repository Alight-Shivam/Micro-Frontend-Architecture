const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.js',
  devServer: {
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'hostApp',
      filename: 'remoteEntry.js',
      
      // Expose shared components to remote apps
      exposes: {
        './SharedComponents': './src/SharedComponents',
        './Button': './src/components/Button',
        './Input': './src/components/Input',
        './Card': './src/components/Card',
      },

      // Remote micro-frontends
      remotes: {
        chatApp: 'chatApp@http://localhost:3001/remoteEntry.js',
        emailApp: 'emailApp@http://localhost:3002/remoteEntry.js',
      },

      // Shared dependencies
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
        },
        'styled-components': {
          singleton: true,
          requiredVersion: '^5.3.6',
        },
        'eventemitter3': {
          singleton: true,
          requiredVersion: '^5.0.0',
        },
      },
    }),

    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Host Micro-Frontend App',
    }),
  ],
  
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};