import { Router } from 'express'; // importando o Router do express
import multer from 'multer'; //importando o multer
import multerConfig from './config/multer'

import UserController from './app/controllers/UserController'; // importa o UserController
import SessionController from './app/controllers/SessionController'; // importa o SessionController

import authMiddleware from './app/middlewares/auth';

const routes = new Router(); // cria as rotas
const upload = multer(multerConfig);

routes.post('/users', UserController.store); // rota do create user
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware) //só acessa abaixo se o user estiver logado

routes.put('/users', UserController.update); //rota pra atualizar

routes.post('/files', upload.single('file'), (req, res) => {
    return res.json({ ok: true});
})


export default routes;
