const nodeExternals = require('webpack-node-externals');
const paths = require('./paths');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === './';
// Note: defined here because it will be used more than once.
const cssFilename = 'static/css/[name].[contenthash:8].css';

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
  { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

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
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: {
                loader: require.resolve('style-loader'),
                options: {
                  hmr: false
                }
              },
              use: [
                require.resolve('isomorphic-style-loader'),
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: shouldUseSourceMap
                  }
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebookincubator/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9' // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009'
                      })
                    ]
                  }
                }
              ]
            },
            extractTextPluginOptions
          )
        )
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: {
                loader: require.resolve('style-loader'),
                options: {
                  hmr: false
                }
              },
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: shouldUseSourceMap
                  }
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebookincubator/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9' // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009'
                      })
                    ]
                  }
                },
                require.resolve('sass-loader')
              ]
            },
            extractTextPluginOptions
          )
        ),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: cssFilename
    }),
  ],
  target: 'node',
  externals: [nodeExternals()]
};
