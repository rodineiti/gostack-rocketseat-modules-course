import User from "../models/User";
import File from "../models/File";
import AvailableAppointmentService from "../services/AvailableAppointmentService";
import Cache from "../../lib/Cache";

class ProviderController {
  async index(request, response) {
    const cached = await Cache.get("providers");

    if (cached) {
      return response.json(cached);
    }

    const providers = await User.findAll({
      where: { provider: true },
      attributes: ["id", "name", "email", "file_id"],
      include: [
        { model: File, as: "file", attributes: ["name", "path", "url"] },
      ],
    });

    await Cache.set("providers", providers);

    response.json(providers);
  }

  async available(request, response) {
    const { date } = request.query;
    const { providerId } = request.params;

    if (!date) {
      return response.status(400).json({ error: "Invalid date" });
    }

    const searchDate = Number(date);

    const hoursAvailable = await AvailableAppointmentService.run({
      date: searchDate,
      providerId,
    });

    return response.json(hoursAvailable);
  }
}

export default new ProviderController();
