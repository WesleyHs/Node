module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true, // data de criação de cada registro
    underscored: true, // user_groups
    underscoredAll: true, // tabelas e colunas
  },
};
