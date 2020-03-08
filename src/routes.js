import { Router } from 'express'; // importando o Router do express

import UserController from './app/controllers/UserController'; // importa o UserController
import SessionController from './app/controllers/SessionController'; // importa o SessionController

const routes = new Router(); // cria as rotas

routes.post('/users', UserController.store); // rota do create user
routes.post('/sessions', SessionController.store);

export default routes;
