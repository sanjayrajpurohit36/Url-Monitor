module.exports = {
  entry: {
    app: "./app/view"
  },
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "css-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "stage-0", "react"],
          plugins: ["transform-runtime", "transform-decorators-legacy"]
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
};
