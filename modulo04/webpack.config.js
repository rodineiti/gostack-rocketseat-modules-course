const path = require("path");
module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"), // arquivo de entrada, master
  output: {
    path: path.resolve(__dirname, "public"), // pasta de saída do javascript transpilado
    filename: "bundle.js", // arquivo javascript que receberá o javascript transpilado
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"), // entrar o arquivo html para o autoreaload com webpack-dev-server
  },
  module: {
    rules: [
      {
        test: /\.js$/, // pega todos os arquivos que terminam com .js
        exclude: /node_modules/, // ignorar arquivos da pasta node_modules
        use: {
          loader: "babel-loader", // o cara que irá transpilar os javascript
        },
      },
      {
        test: /\.css$/, // pega todos os arquivos que terminam com .css
        exclude: /node_modules/, // ignorar arquivos da pasta node_modules
        use: [
          {
            loader: "style-loader", // o cara que irá transpilar os css, pra enviar para a index.html
          },
          {
            loader: "css-loader", // o cara que irá transpilar os css, permite importações de imagens e css dentro de um css
          },
        ],
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i, // pega todos os arquivos de imagem case incensitive
        exclude: /node_modules/, // ignorar arquivos da pasta node_modules
        use: {
          loader: "file-loader", // o cara que irá importar imagens
        },
      },
    ],
  },
};
