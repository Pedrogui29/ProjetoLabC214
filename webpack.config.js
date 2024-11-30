const webpack = require('webpack');

module.exports = {
  // Suas outras configurações aqui

  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"]
          }
        }
      }
    ]
  },

  plugins: [
    // Certifique-se de adicionar este plugin
    new webpack.ProvidePlugin({
      process: 'process/browser', // Isso garante que o processo global seja corretamente carregado
    }),
  ]
};
