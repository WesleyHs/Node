import User from '../models/User'
import File from '../models/File'


class ProviderController {
    async index(req, res){
        const providers = await User.findAll({
            where: { provider: true }, //listar os providers
            attributes: ['id', 'name', 'avatar_id'], //retorna apenas os atributos citados
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attibutes: ['name', 'path', 'url']
                }
            ],
        });

        return res.json(providers)
    }
}

export default new ProviderController();