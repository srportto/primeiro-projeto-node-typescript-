/*
  appointtments.routes e o arquivo que trata as requisições para a rora /appointments
*/

import {Router} from 'express';
// parseISO    ->  converte string para o formato date nativo do javascrip
// startOfHour ->  start o datetime enviado na hora, zerando os minutos, seguns, etc
import {startOfHour, parseISO, isEqual} from 'date-fns';
import Appointment  from '../models/Appointment';
import AppointmentsRepository from '../repositories/appointmentsRepository';




const appointtmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository;


appointtmentsRouter.get('/', (request, response) => {
  const allAppointments = appointmentsRepository.all();

  return response.json(allAppointments);

});


appointtmentsRouter.post('/', (request, response) => {
  //provider = barbeador
  //date = data
  const {provider, date} =request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSamedate = appointmentsRepository.findByDate(parsedDate);


  if (findAppointmentInSamedate){
    return response.status(400).json({"message": "This appointment is already booked"});
  }

  // na hora de criar o appointment(agendamento) tem que enviar a variavel parsedDate pois ela está com o tipo Date
  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate
  });

  return response.json(appointment);
});

export default appointtmentsRouter;
