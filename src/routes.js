import { Router } from 'express'; // importando o Router do express
import multer from 'multer'; //importando o multer
import multerConfig from './config/multer'

import UserController from './app/controllers/UserController'; // importa o UserController
import SessionController from './app/controllers/SessionController'; // importa o SessionController
import FileController from './app/controllers/FileController'//importando o 
import ProviderController from './app/controllers/ProviderController'//importando o 
import AppointmentsController from './app/controllers/AppointmentsController'; // importa o 
import ScheduleController from './app/controllers/ScheduleController' //importa 

import authMiddleware from './app/middlewares/auth';

const routes = new Router(); // cria as rotas
const upload = multer(multerConfig);

routes.post('/users', UserController.store); // rota do create user
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware) //só acessa abaixo se o user estiver logado

routes.put('/users', UserController.update); //rota pra atualizar

routes.get('/providers', ProviderController.index);

routes.get('/appointment', AppointmentsController.index); // listar agendamentos
routes.post('/appointment', AppointmentsController.store); //agendamentos

routes.get('/schedule', ScheduleController.index); //listagem de pproviders

routes.post('/files', upload.single('file'), FileController.store); //rota dos uploads de imagens


export default routes;
