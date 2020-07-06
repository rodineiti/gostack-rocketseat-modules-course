import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../../config/auth";

export default async (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ error: "Token not provided." });
  }

  // desustrurando, forma de pegar somente a
  // posicao 1 do array gerado com o split
  const [, token] = authorization.split(" ");

  try {
    // await promisify(jwt.verify) irá retornar uma função, por isso passamos os parametros após
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    request.userId = decoded.id;
    return next();
  } catch (error) {
    return response.status(401).json({ error: "Token invalid." });
  }
};
