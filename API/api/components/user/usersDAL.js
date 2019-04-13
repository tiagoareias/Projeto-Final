
var db = require('../database/index')

exports.createUser = async (user) => {
    await db.User.create(user);
}


exports.getUserByUsername =  (username) => {
  var user =  db.User.findOne( {where: {username:username}})
    console.log(user)
    return user
}

exports.deleteUser =  () => {
   
}