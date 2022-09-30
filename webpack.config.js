const pathModule = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");


module.exports = {
    mode: 'development',
    entry: {
      bundle: pathModule.resolve(__dirname, 'src/index.js'),
    },
    output: {
      path: pathModule.resolve(__dirname, 'dist'),
      filename: '[name].js',
      assetModuleFilename: 'images/[name][ext]',
    },
    devServer: {//Dev Server Options
      static: {
        directory: pathModule.resolve(__dirname, 'dist'),
      },
      port: 3000,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        { //Css Loader
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },

        {//Images Loader
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },

        {//Sass Loader
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
       
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        // title: 'Webpack App',
        // filename: 'index.html',
        // template: 'src/template.html',
      }),
      new MiniCssExtractPlugin({
        filename: "style.min.css"
      })
    ],
    optimization: {
      minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
         `...`,
        new CssMinimizerPlugin(),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              // Lossless optimization with custom option
              // Feel free to experiment with options for better result for you
              plugins: [
                ["gifsicle", { interlaced: true }],
                ["mozjpeg", { quality: 60 }],
                ["optipng", { optimizationLevel: 5 }],
                // Svgo configuration here https://github.com/svg/svgo#configuration
                [
                  "svgo",
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        // customize plugin options
                        convertShapeToPath: {
                          convertArcs: true
                        },
                        // disable plugins
                        convertPathData: false
                      }
                    }
                  }
                ],
              ],
            },
          },
        }),
      ],
    },
}