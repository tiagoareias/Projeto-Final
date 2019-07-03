var Sequelize = require('sequelize')
var sequelize = new Sequelize('database_projetoFinal','root','root', {
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone:"+01:00",
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