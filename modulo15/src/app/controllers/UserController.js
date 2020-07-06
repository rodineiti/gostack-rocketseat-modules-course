import User from "../models/User";
import File from "../models/File";
import Cache from "../../lib/Cache";

class UserController {
  async store(request, response) {
    const exists = await User.findOne({ where: { email: request.body.email } });

    if (exists) {
      return response.status(400).json({ error: "User already exists." });
    }

    const { id, name, email, provider } = await User.create(request.body);

    if (provider) {
      await Cache.invalidate("providers");
    }

    return response.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(request, response) {
    const userId = request.userId;

    const { email, password_current } = request.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return response.status(400).json({ error: "User not found." });
    }

    if (email && email !== user.email) {
      const exists = await User.findOne({ where: { email } });

      if (exists) {
        return response.status(400).json({ error: "User already exists." });
      }
    }

    if (password_current && !(await user.checkPassword(password_current))) {
      return response.status(401).json({ error: "Password does not match." });
    }

    await user.update(request.body);

    const { id, name, file } = await User.findByPk(userId, {
      include: [
        {
          model: File,
          as: "file",
          attributes: ["id", "path", "url"],
        },
      ],
    });

    return response.json({
      id,
      name,
      email,
      file,
    });
  }
}

export default new UserController();
