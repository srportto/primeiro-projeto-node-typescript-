/*
  index.ts é o arquivo que as requisições caem  e ele encaminha para as demais rotas
  ele é a rota principal
*/

import {Router} from 'express';
import appointtmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointtmentsRouter);

export default routes;
