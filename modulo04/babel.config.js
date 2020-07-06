module.exports = {
  presets: [
    "@babel/preset-env", // alterar as funcionalidades do javascript que o browser não entende, converter para o browser entender
    "@babel/preset-react", // alterar as funcionalidades do javascript que o browser não entende, converter para o browser entender, ex: jsx
  ],
  plugins: ["@babel/plugin-proposal-class-properties"],
};
