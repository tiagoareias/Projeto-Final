
//funções que retorna a resposta
const { check, validationResult } = require('express-validator/check');

var usersService = require('./usersService')

//criação de um novo utilizador
exports.createUser = async (req, res) => {
    //resposta por defeito do servidor
    let serverResponse = { status: "Not Created", response: {} }
    //variável que recebe a query da base de dados sobre o email
    var existsEmail;
    //variável que recebe a query da base de dados sobre o username
    var existsUserName;

    //***Validação do Email***/

    //verificar se o campo email está vazio e se é realmente um email
    req.checkBody('email', 'Email is required or is not valid').notEmpty().isEmail();

    //***Validação do Username***/
    req.checkBody('username', 'Username is required').notEmpty();

    //***Validação do Nome***/
    req.checkBody('nome', 'Nome is required').notEmpty();

    //verificar se o email inserido existe na base de dados
    await usersService.getUserByEmail(req.body.email).then(user => existsEmail = user).catch(err => console.log(err));
    //verificar se o username inserido existe na base de dados
    await usersService.getUser(req.body.username).then(user => existsUserName = user).catch(err => console.log(err));
    //se o email existe
    if (existsEmail != null || existsUserName != null) {
        serverResponse = { status: "Email e/ou username já existe(m) na base de dados", response: {} }
        return res.send(serverResponse);
    }
    //verificar erros 
    var errors = req.validationErrors();
    //se existir erros de validação
    if (errors) {
        serverResponse = { status: "Erros na validação", response: errors }
        return res.send(errors)
    }
    //caso contrário, cria o utilizador
    else {
        var createUser;
        //criação de um novo user de acordo com os parâmetros recebidos
        await usersService.createUser(req.body).then(user => createUser = user).catch(err => console.log(err));
        if (createUser != null) {
            serverResponse = { status: "Utilizador Criado com Sucesso", response: createUser };
        }
        res.send(serverResponse);
    }
}
//request a um utilizador de acordo com o seu username
exports.getUser = async (req, res) => {
    let serverResponse = { status: "Não existe na base de dados", response: {} }
    var getUser;
    const userName = req.params.username;
    await usersService.getUser(userName).then(user => getUser = user).catch(err => console.log(err));
    if (getUser != null) {
        serverResponse = { status: "Utilizador existe na Base de Dados", response: getUser }
    }

    res.send(serverResponse);
}

//request a todos os utilizadores
exports.getAllUsers = async (req, res) => {
    var allUsers;
    await usersService.getAllUsers().then(user => allUsers = user).catch(err => console.log(err));
    res.send(allUsers);
}

//editar um utilizador
exports.editUser = async (req, res) => {
    var userUpdate;
    let serverResponse = { status: "Not Updated | Utilizador não está na base de dados", response: {} }
    //username inserido no URL
    const userName = req.params.username;
    await usersService.editUser(req.body, userName).then(user => userUpdate = user).catch(err => console.log(err));

    if (userUpdate != 0) {
        serverResponse = { status: "Updated", response: userUpdate }
    }

    res.send(serverResponse);
}

//eliminar utilizador
exports.deleteUser = async (req, res) => {
    let serverResponse = { status: "Not Deleted | Utilizador não está na base de dados", response: {} }
    var userDelete;
    //username inserido no URL
    const userName = req.params.username;
    await usersService.deleteUser(userName).then(user => userDelete = user).catch(err => console.log(err));
    if (userDelete != 0) {
        serverResponse = { status: "Deleted", response: userDelete }
    }
    res.send(serverResponse);
}