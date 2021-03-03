import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/appointmentsRepository';
// startOfHour ->  start o datetime enviado na hora, zerando os minutos, seguns, etc
import {startOfHour} from 'date-fns';

/**
 * Recebimento das informacoes
 * Tratativa de erros/excessões
 * Acesso ao repositorio
 */

interface requestDTO{
  provider: string;
  date: Date;
}






class CreateAppointmentService {

  private appointmentsRepository: AppointmentsRepository;

/**
 * Dependency inversion
 * Sempre que minha clase tiver a dependencia de um objeto, ela deve receber este como parametro no construtor
 */
  constructor(appointmentsRepository: AppointmentsRepository){
    this.appointmentsRepository = appointmentsRepository;

  }


  public execute({date,provider}:requestDTO): Appointment{
    const appointmentDate = startOfHour(date);

    const findAppointmentInSamedate = this.appointmentsRepository.findByDate(appointmentDate);


    if (findAppointmentInSamedate){
      throw Error('This appointment is already booked');
    }

    // na hora de criar o appointment(agendamento) tem que enviar a variavel parsedDate pois ela está com o tipo Date
    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;

  }

}

export default CreateAppointmentService;
