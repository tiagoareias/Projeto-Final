//rotas
module.exports = (app) => {
    var usersController = require('./usersController');
    app.post('/user', usersController.createUser);

    app.get('/user/:username', usersController.getUser);
}