const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.js',
  devServer: {
    port: 3001,
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
      name: 'chatApp',
      filename: 'remoteEntry.js',
      
      // Expose the main App component
      exposes: {
        './App': './src/App.js',
        './ChatComponent': './src/components/ChatComponent.js',
      },

      // Consume shared components from host
      remotes: {
        hostApp: 'hostApp@http://localhost:3000/remoteEntry.js',
      },

      // Shared dependencies - must match host configuration
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
      title: 'Chat Micro-Frontend',
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