import { Router } from 'express'; // importando o Router do express

import UserController from './app/controllers/UserController'; // importa o UserController

const routes = new Router(); // cria as rotas

routes.post('/users', UserController.store); // rota do create user

export default routes;
