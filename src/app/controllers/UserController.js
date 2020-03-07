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
}

export default new UserController();
