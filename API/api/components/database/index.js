var Sequelize = require('sequelize')
var sequelize = new Sequelize('database_projetoFinal','user','123qwe', {
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone:"+01:00",
    port:4000,
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci', 
      }
})

const db = {
    'User': require('../user/userModel')(sequelize, Sequelize),
    'Music': require('../music/music')(sequelize, Sequelize)
}
db.sequelize = sequelize;

module.exports = db;