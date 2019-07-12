const Sequelize = require('sequelize');

var sequelize = new Sequelize('d26jd4h2uf79uj','rhmnaceoelvzyc','125b87feeb6607bb08a6e1cd3e2f53a65e8f26ab6549f684468fe16872442b52', {
  host: 'ec2-174-129-229-106.compute-1.amazonaws.com',
  dialect: 'postgres',
  timezone:"+01:00",
  port:5432,
  dialectOptions: {
    "ssl": true
  },
  define: {
      charset: 'utf8',
      collate: 'utf8_general_ci', 
    }
})

const models = {
  User: sequelize.import('./user'),
  Music:sequelize.import('./music'),
  Feedback:sequelize.import('./feedback')
};


Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;