
var db = require('../database/index')

exports.createUser = async (user) => {
    await db.User.create(user);
}

exports.getUserByUsername = async (username) => {
  var user;
  await db.User.findOne( {where: {username:username}}).then(usr => user = usr).catch(err => console.log(err));
  return user
}

exports.getUserByEmail = async (email) =>{
  var user;
  await db.User.findOne( {where: {email:email}}).then(usr => user = usr).catch(err => console.log(err));
  return user;
}

exports.getAllUsers = async () =>{
  var users;
  await db.User.findAll().then(usr => users = usr).catch(err => console.log(err));
  return users;
}

exports.editUser = async (user,username) =>{
  var update;
  await db.User.update(user,{where:{username:username}}).then(usr => update = usr).catch(err => console.log(err));
  return update;
}

exports.deleteUser = async (username) =>{
  var deletedUser;
  await db.User.destroy({where:{username:username}}).then(usr => deletedUser = usr).catch(err => console.log(err));
  return deletedUser;
}

