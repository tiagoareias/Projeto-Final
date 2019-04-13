//rotas
module.exports = (app) => {
    var usersController = require('./usersController');
    //criar novo user
    app.post('/user/create', usersController.createUser);
    //obter user pelo seu username
    app.get('/user/:username', usersController.getUser);
    //obter todos os utilizadores
    app.get('/user', usersController.getAllUsers);
    //editar dados do utilizador
    app.post('/user/:username/edit',usersController.editUser);
    //eliminar utilizador
    app.post('/user/:username/delete',usersController.deleteUser);
}