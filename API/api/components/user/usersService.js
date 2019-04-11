//middle -- todos os métodos

var usersDAL = require('./usersDAL');

exports.createUser = async () => {

    await usersDAL.createUser();
}

exports.createToken = async () => {
    
}

exports.getUser = async (username) => {
    return usersDAL.getUserByUsername(username);
}