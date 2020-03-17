module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: '5432',
  username: 'postgres',
  password: 'docker',
  database: 'goBarber',
  define: {
    timestamps: true, // data de criação de cada registro
    underscored: true, // user_groups
    underscoredAll: true, // tabelas e colunas
  },
};
