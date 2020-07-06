import User from "../models/User";
import Notification from "../schemas/Notification";

class NotificationController {
  async index(request, response) {
    const userId = request.userId;

    /**
     * Check if provider_id is a provider
     */
    const checkIsProvider = await User.findOne({
      where: { id: userId, provider: true },
    });

    if (!checkIsProvider) {
      return response
        .status(401)
        .json({ error: "Only provider can load notifications" });
    }

    const notifications = await Notification.find({
      user: userId,
    })
      .sort({ createdAt: "desc" })
      .limit(20);

    return response.json(notifications);
  }

  async update(request, response) {
    const { id } = request.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      {
        read: true,
      },
      { new: true }
    );

    return response.json(notification);
  }
}

export default new NotificationController();
