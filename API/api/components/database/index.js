var Sequelize = require('sequelize')
var sequelize = new Sequelize('database_projetoFinal','root','root', {
    host: 'localhost',
    dialect: 'mysql'
})

const db = {
    'User': require('../user/userModel')(sequelize, Sequelize),'Music': require('../music/music')(sequelize, Sequelize)
}
db.sequelize = sequelize;

module.exports = db;