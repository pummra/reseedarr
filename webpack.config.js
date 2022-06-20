/* eslint-disable no-unused-expressions */
/* eslint-disable global-require */

// core modules
import path from "path";
import { fileURLToPath } from "url";

// npm modules
import HtmlWebpackPlugin from "html-webpack-plugin";

// internal modules

const dirname = path.dirname(fileURLToPath(import.meta.url));

const configuration = {
  entry: `${dirname}/app/src/js/index.js`,
  output: {
    path: `${dirname}/app/dist`,
    filename: "main.js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Reseedarr",
    }),
  ],
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => {
                  [require("autoprefixer")];
                },
              },
            },
          },
          {
            // compiles Sass to CSS
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
};
export default configuration;
