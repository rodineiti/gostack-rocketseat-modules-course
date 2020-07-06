import { startOfHour, parseISO, isBefore, format } from "date-fns";
import pt from "date-fns/locale/pt-BR";
import User from "../models/User";
import Appointment from "../models/Appointment";
import Notification from "../schemas/Notification";
import Cache from "../../lib/Cache";

class CreateAppointmentService {
  async run({ provider_id, userId, date }) {
    /**
     * Check if provider_id is a provider
     */
    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkIsProvider) {
      throw new Error("You can only create appointments with providers");
    }

    /**
     * Check if provider_id is user logged
     */
    if (provider_id === userId) {
      throw new Error("You cannot create a schedule for yourself");
    }

    // pegar o inicio da hora, ex: 18:30, get 18
    const hourStart = startOfHour(parseISO(date));

    // valida se eh uma data passada, ex: ontem não pode, somente a partir de hoje
    if (isBefore(hourStart, new Date())) {
      throw new Error("Past dates are not permitted");
    }

    // valida se o prestador de serviço já está ocupado com a data informada
    const checkAvailability = await Appointment.findOne({
      where: { provider_id, canceled_at: null, date: hourStart },
    });

    if (checkAvailability) {
      throw new Error("Appointment date is not available");
    }

    // agendamentos sempre por hora, não minutos
    const appointment = await Appointment.create({
      user_id: userId,
      provider_id,
      date: hourStart, // guarda sempre o inicio da hora: ex: 18:30, guarda: 18:00
    });

    /**
     * Notify appointment provider
     */
    const user = await User.findByPk(userId);
    const formatDate = format(hourStart, "'dia' dd 'de' MMMM', às' H:mm'h'", {
      locale: pt,
    });

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formatDate}`,
      user: provider_id,
    });

    await Cache.invalidatePrefix(`user:${userId}:appointments`);

    return appointment;
  }
}

export default new CreateAppointmentService();
