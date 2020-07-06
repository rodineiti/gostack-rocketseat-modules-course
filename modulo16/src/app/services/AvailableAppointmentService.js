import { Op } from "sequelize";
import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from "date-fns";
import Appointment from "../models/Appointment";

class AvailableAppointmentService {
  async run({ date, providerId }) {
    const appointments = await Appointment.findAll({
      where: {
        provider_id: providerId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(date), endOfDay(date)],
        },
      },
    });

    const schedule = [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
    ];

    const hoursAvailable = schedule.map((time) => {
      // 1 verificar se já não passou o horário
      // 2 verificar se já está ocupado
      const [hour, minute] = time.split(":");
      const value = setSeconds(setMinutes(setHours(date, hour), minute), 0);
      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        // verifica se eh depois de agora, ou seja,
        // a partir da hora atual e se não tem agendamento pra o horário
        available:
          isAfter(value, new Date()) &&
          !appointments.find((a) => format(a.date, "HH:mm") === time),
      };
    });

    return hoursAvailable;
  }
}

export default new AvailableAppointmentService();
