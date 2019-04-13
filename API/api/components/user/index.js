//rotas
module.exports = (app) => {
    var usersController = require('./usersController');
    //criar novo user
    app.post('/user/create', usersController.createUser);
    //obter user pelo seu username
    app.get('/user/:username', usersController.getUser);
}