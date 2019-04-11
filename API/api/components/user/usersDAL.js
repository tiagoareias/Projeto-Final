
var db = require('../database/index')

exports.createUser =  () => {
    db.User.create();
}


exports.getUserByUsername =  (username) => {
  var user =  db.User.findOne( {where: {username:username}})
    console.log(user)
    return user
}

exports.deleteUser =  () => {
   
}