//middle -- todos os métodos

var usersDAL = require('./usersDAL');
//obter todos os utilizadores
exports.getAllUsers = async(users) =>{
    return usersDAL.getAllUsers();
}
//criar novo utilizador
exports.createUser = async (user) => {

    await usersDAL.createUser(user);
    return user;
}

exports.createToken = async () => {
    
}

//obter utilizador pelo seu username
exports.getUser = async (username) => {
    return usersDAL.getUserByUsername(username);
}

//editar dados de um utilizador
exports.editUser = async(user, username) =>{
    return usersDAL.editUser(user,username);
}

//remover utilizador
exports.deleteUser = async(username) =>{
    return usersDAL.deleteUser(username);
}