// Generated using webpack-cli https://github.com/webpack/webpack-cli
import path from "path";
import { fileURLToPath } from "url";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV;

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: {
    scripts: [
      "./public/js/clientInquiries.js",
      "./public/js/clientList.js",
      "./public/js/error.js",
      "./public/js/estimation.js",
      "./public/js/login.js",
      "./public/js/mixins.js",
      "./public/js/userInquiries.js",
    ],
    styles: "./public/css/mystyle.css",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public/dist"),
  },
  mode: env,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css", // Specify the output filename for the extracted CSS
    }),
    new CleanWebpackPlugin(),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

export default config;
