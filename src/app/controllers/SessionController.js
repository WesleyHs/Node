import jwt from 'jsonwebtoken';
import * as Yup from 'yup'

import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {

    //validação
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }


    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } }); // busca 1 email

    if (!user) {
      // se nao existir usuario
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      // verifica se a senha bate o email
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      // retornar dados do usuario e o token
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn, // tempo de expiração do token 7 dias
      }),
    });
  }
}

export default new SessionController();
