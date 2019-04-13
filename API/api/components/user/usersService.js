//middle -- todos os métodos

var usersDAL = require('./usersDAL');

exports.createUser = async (user) => {

    await usersDAL.createUser(user);
    return user;
}

exports.createToken = async () => {
    
}

exports.getUser = async (username) => {
    return usersDAL.getUserByUsername(username);
}