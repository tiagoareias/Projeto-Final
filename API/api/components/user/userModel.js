//model
'use strict';

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        userID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allownull: false
        },
        username: {
            type: DataTypes.STRING,
            allownull: false
        },
        hashPassword: {
            type: DataTypes.STRING,
            allownull: false
        },
        nome: {
            type: DataTypes.STRING,
            allownull: false
        },
        
    })

    User.sync({ force: false }).then(() => {
        // Now the `users` table in the database corresponds to the model definition
        return ;
      });

      return User;
}