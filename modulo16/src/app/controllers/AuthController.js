import jwt from "jsonwebtoken";
import User from "../models/User";
import File from "../models/File";
import authConfig from "../../config/auth";

class AuthController {
  async store(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({
      where: { email },
      include: [{ model: File, as: "file", attributes: ["id", "path", "url"] }],
    });

    if (!user) {
      return response.status(401).json({ error: "User not found." });
    }

    if (!(await user.checkPassword(password))) {
      return response.status(401).json({ error: "Password does not match." });
    }

    const { id, name, provider, file } = user;

    return response.json({
      user: {
        id,
        name,
        email,
        provider,
        file,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new AuthController();
