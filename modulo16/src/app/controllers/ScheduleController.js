import { Op } from "sequelize";
import { startOfDay, endOfDay, parseISO } from "date-fns";
import File from "../models/File";
import User from "../models/User";
import Appointment from "../models/Appointment";

class ScheduleController {
  async index(request, response) {
    const { date } = request.query;
    const userId = request.userId;

    /**
     * Check if user_id is a provider
     */
    const checkProvider = await User.findOne({
      where: { id: userId, provider: true },
    });

    if (!checkProvider) {
      return response.status(401).json({ error: "User is not a provider" });
    }

    const appointments = await Appointment.findAll({
      where: {
        provider_id: userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parseISO(date)), endOfDay(parseISO(date))],
        },
      },
      order: ["date"],
      attributes: ["id", "date"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "name"],
          include: [
            {
              model: File,
              as: "file",
              attributes: ["id", "path", "url"],
            },
          ],
        },
      ],
    });

    return response.json(appointments);
  }
}

export default new ScheduleController();
