const { default: User } = require('../models/User');

class UserController {
  async store(request, response) {
    const { email } = request.body;

    const check = await User.findOne({ where: { email } });

    if (check) {
      return response.status(400).json({ error: 'Email Duplicate' });
    }

    const user = await User.create(request.body);

    return response.json(user);
  }
}

export default new UserController();
