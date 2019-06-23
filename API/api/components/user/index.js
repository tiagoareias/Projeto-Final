//rotas
module.exports = (app) => {
    var usersController = require('./usersController');
    const rateLimit = require('express-rate-limit');
    //limite no número de contas criadas e na edição de dados - 3 contas criadas em 30 segundos
    const createEditAccountLimiter = rateLimit({
        windowMs: 30, // 30 segundos
        max: 3, // bloqueia após 3 pedidos
        message:
            "Foram criadas demasiadas contas nos últimos minutos! Volte a tentar daqui a uma hora"
    });

    //rate limit para a autenticação - 5 autenticações em 30 segundos
    const loginLimiter = rateLimit({
        windowMs: 30, // 30 segundos
        max: 5, // bloqueia após 5 pedidos
        message:
            "Realizou demasiadas autenticações na última hora. Tente novamente mais tarde"
    });
    //rate limit para os restantes pedidos
    const requestsLimit = rateLimit({
        windowMs: 30, // 30 segundos
        max: 10, // bloqueia após 10 pedidos
        message:
            "Realizou demasiados pedidos ao servidor nos últimos minutos. Tente novamente mais tarde"
    });
    //criar novo user
    app.post('/user/create', createEditAccountLimiter, usersController.createUser);
    //obter user pelo seu username
    app.get('/user/:username', requestsLimit,usersController.getUser);
    //obter todos os utilizadores
    app.get('/user', requestsLimit, usersController.getAllUsers);
    //editar dados do utilizador
    app.post('/user/:username/edit', createEditAccountLimiter, usersController.editUser);
    //eliminar utilizador
    app.post('/user/:username/delete', requestsLimit,usersController.deleteUser);
    //login
    app.post('/auth/login', loginLimiter, usersController.login);

}