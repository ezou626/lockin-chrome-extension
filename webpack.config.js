const HTMLPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require("path");

module.exports = {
    entry: {
      popup: "./src/popup_components/popup_index.tsx", 
      page: "./src/page_components/page_index.tsx",
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src'),
                use: ["style-loader", "css-loader", "postcss-loader"],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-bundle.js",
        chunkFilename: '[id].[chunkhash].js',
        clean: true
    },
    plugins: [
      new HTMLPlugin({
        inject: false,
        template: './public/popup.html',
        chunks: ['popup'],
        filename: 'popup.html'
      }),
      new HTMLPlugin({
        inject: false,
        template: './public/page.html',
        chunks: ['page'],
        filename: 'page.html'
      }),
      /* Necessary to use HTMLPlugin to inject the bundle into the popup and page HTML */
      new CopyWebpackPlugin({
          patterns: [
              { 
                  from: "public", 
                  to: "", 
                  globOptions: {
                      ignore: ["**/popup.html", "**/page.html"], // This line changes with folder
                  },
              },
          ],
      }),
      // new BundleAnalyzerPlugin({
      //   generateStatsFile: true,
      //   statsFilename: 'data.json',
      // }),
    ]
};
