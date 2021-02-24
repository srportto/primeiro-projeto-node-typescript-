/*
  appointtments.routes e o arquivo que trata as requisições para a rora /appointments
*/

import {Router} from 'express';
// parseISO    ->  converte string para o formato date nativo do javascrip
// startOfHour ->  start o datetime enviado na hora, zerando os minutos, seguns, etc
import {startOfHour, parseISO, isEqual} from 'date-fns';
import Appointment  from '../models/Appointment';




const appointtmentsRouter = Router();



const appointments: Appointment [] = [];


appointtmentsRouter.post('/', (request, response) => {
  //provider = barbeador
  //date = data
  const {provider, date} =request.body;

  const parsedDate = startOfHour(parseISO(date));

  console.log(parsedDate);
  console.log(appointments);

  const findAppointmentInSamedate = appointments.find(appointment => isEqual(parsedDate, appointment.date));

  if (findAppointmentInSamedate){
    return response.status(400).json({"message": "This appointment is already booked"});
  }


  const appointment = new Appointment(provider,parsedDate);



  appointments.push(appointment);

  return response.json(appointment);
});

export default appointtmentsRouter;
