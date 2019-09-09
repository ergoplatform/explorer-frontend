const nodeExternals = require('webpack-node-externals');
const paths = require('./paths');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssFilename = 'static/css/[name].css';
const autoprefixer = require('autoprefixer');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = {
  entry: paths.server.root,
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: paths.server.build
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
      'react-dom': '@hot-loader/react-dom',
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
      'styles': paths.client.styles,
      'apiSpec': paths.apiSpec,
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
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
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
                    sourceMap: shouldUseSourceMap
                  }
                },
                require.resolve('sass-loader')
              ]
            },
          )
        )
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
      },
      {
        // Exclude `js` files to keep "css" loader working as it injects
        // its runtime that would otherwise processed through "file" loader.
        // Also exclude `html` and `json` extensions so they get processed
        // by webpacks internal loaders.
        exclude: [/\.(ts|tsx|js|jsx|mjs|scss|svg)$/, /\.html$/, /\.json$/],
        test: /\.(ttf|woff|woff2|eot|yaml)/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[ext]'
        }
      },
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
