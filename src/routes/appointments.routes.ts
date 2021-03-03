/*
  appointtments.routes e o arquivo que trata as requisições para a rora /appointments
*/

import {Router} from 'express';
// parseISO    ->  converte string para o formato date nativo do javascrip
import {parseISO} from 'date-fns';
import Appointment  from '../models/Appointment';
import AppointmentsRepository from '../repositories/appointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';




const appointtmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository;


appointtmentsRouter.get('/', (request, response) => {
  const allAppointments = appointmentsRepository.all();

  return response.json(allAppointments);

});


appointtmentsRouter.post('/', (request, response) => {
  try{
    //provider = barbeador
    //date = data
    const {provider, date} =request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(appointmentsRepository);

    const appointment = createAppointment.execute({date: parsedDate,provider});

    return response.json(appointment);
  } catch(err) {
    return response.status(400).json({erro: err.message});

  }

});

export default appointtmentsRouter;
