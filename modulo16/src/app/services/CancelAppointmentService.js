import { isBefore, subHours } from "date-fns";
import User from "../models/User";
import Appointment from "../models/Appointment";
import Queue from "../../lib/Queue";
import CancelMail from "../jobs/CancelMail";
import Cache from "../../lib/Cache";

class CancelAppointmentService {
  async run({ id, userId }) {
    const appointment = await Appointment.findByPk(id, {
      include: [
        {
          model: User,
          as: "provider",
          attributes: ["name", "email"],
        },
        {
          model: User,
          as: "user",
          attributes: ["name"],
        },
      ],
    });

    if (!appointment) {
      throw new Error("Appointment not exists");
    }

    if (appointment.user_id !== userId) {
      throw new Error("You don´t have permission to cancel the appointment");
    }

    /**
     * remove duas horas do horário de agendamento
     * para permitir somente cancelar se tiver 2 horas antes da hora do agendamento
     */
    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      throw new Error("You can only cancel appointments 2 hours in advance");
    }

    appointment.canceled_at = new Date();
    await appointment.save();

    await Queue.add(CancelMail.key, {
      appointment,
    });

    await Cache.invalidatePrefix(`user:${userId}:appointments`);

    return appointment;
  }
}

export default new CancelAppointmentService();
