/*
  appointtments.routes e o arquivo que trata as requisições para a rora /appointments
*/

import {Router} from 'express';
import { v4 as uuid } from 'uuid';

const appointtmentsRouter = Router();

const appointments = [];


appointtmentsRouter.post('/', (request, response) => {
  const {provider, date} =request.body;

  //provider = barbeador
  //date = data

  const appointment = {
    id: uuid(),
    provider,
    date,
  }

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointtmentsRouter;
