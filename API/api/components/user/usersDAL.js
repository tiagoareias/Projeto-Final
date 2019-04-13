
var db = require('../database/index')

exports.createUser = async (user) => {
    await db.User.create(user);
}


exports.getUserByUsername =  (username) => {
  var user =  db.User.findOne( {where: {username:username}})
    return user
}

exports.deleteUser =  () => {
   
}

exports.getAllUsers =() =>{
  var users = db.User.findAll();
  return users;
}

exports.editUser = async (user,username) =>{
  var update = await db.User.update(user,{where:{username:username}});
  return update;
}

exports.deleteUser = async (username) =>{
  var deletedUser = await db.User.destroy({where:{username:username}})
  return deletedUser;
}