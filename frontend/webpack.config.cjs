const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath')
const fs = require('fs')
const getClientEnvironment = require('./config/env.cjs')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isEnvProduction = process.env.NODE_ENV === 'production'
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
)

const env = getClientEnvironment(publicUrlOrPath.slice(0, -1))

module.exports = {
  mode: process.env.NODE_ENV,
    entry: {
        main: {
            import: ['./src/index.tsx'],
            filename: 'index.js'
        }
    },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  target: 'web',
  devServer: {
    port: '3000',
    static: ['./public'],
    open: true,
    hot: true,
    https: true,
    liveReload: true,
    devMiddleware: {
      writeToDisk: true
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // kind of file extension this rule should look for and apply in test
        exclude: /node_modules/, // folder to be excluded
        use: 'babel-loader' // loader which we are going to use
      },
      {
        test: /\.scss$/,
        use: [
          'css-loader',
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
    ]
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: path.resolve(__dirname, 'public/index.html')
        },
        isEnvProduction
          ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true
            }
          }
          : undefined
      )
    ),
    // allows access to ENV variables in template
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    // Creates Manifest file
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
      publicPath: publicUrlOrPath,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path
          return manifest
        }, seed)
        const entrypointFiles = entrypoints.main.filter(
          fileName => !fileName.endsWith('.map')
        )

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles
        }
      }
    })
  ],
  optimization: {
    minimize: isEnvProduction,
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
}
