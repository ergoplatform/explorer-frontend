const nodeExternals = require('webpack-node-externals');
const paths = require('./paths');

module.exports = {
  entry: {
    server: paths.appSrc + '/server/server.tsx'
  },
  output: {
    path: paths.serverBuild,
    filename: '[name].js'
  },

  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    extensions: [
      '.mjs',
      '.web.ts',
      '.ts',
      '.web.tsx',
      '.tsx',
      '.web.js',
      '.js',
      '.json',
      '.web.jsx',
      '.jsx'
    ],
    alias: {

      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
      'styles': paths.appStyles
    }
  },

  // Source maps support ('inline-source-map' also works)
  devtool: 'source-map',

  // Add the loader for .ts files.
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader'
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { mergePaths: true },
                { removeDesc: true },
                { convertPathData: false }
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loader: 'css-loader/locals'
      },
      {
        test: /\.scss$/,
        loader: 'css-loader/locals'
      }
    ]
  },
  target: 'node',
  externals: [nodeExternals()]
};
