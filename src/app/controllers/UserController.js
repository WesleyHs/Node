import User from '../models/User';

class UserController {
  async store(req, res) {
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

    return res.json({ok:true})
  }
}

export default new UserController();
