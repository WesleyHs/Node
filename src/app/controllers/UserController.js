import * as Yup from 'yup'; //vai importar tudo que tem dentro do yup

import User from '../models/User';

class UserController {
  async store(req, res) {
    //validação
    const schema = Yup.object().shape({
      name: Yup.string().required(), //obrigatorio
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),//minimo 6 digitos
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const userExists = await User.findOne({ where: { email: req.body.email } }); // verificando se o usuario ja existe pelo email

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' }); // se o usuario existir, devolve o status 400 error
    }
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      // retornar apenas esses dados
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) { //atualizar

    //validação
    const schema = Yup.object().shape({
      name: Yup.string(), 
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),//minimo 6 digitos
      //field se refere ao password
      password: Yup.string().min(6).when(
        'oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
      //confirmação de senha
      confirmPassword: Yup.string().when('password', (password, field) => //ref referente
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email != user.email) {
      const userExists = await User.findOne({ where: { email } }); // verificando se o usuario ja existe pelo email

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' }); // se o usuario existir, devolve o status 400 error
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      // verifica se a senha bate o email
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      // retornar apenas esses dados
      id,
      name,
      email,
      provider,
    });

    return res.json({ ok: true })
  }
}

export default new UserController();
