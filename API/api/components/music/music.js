'use strict';

module.exports = (sequelize, DataTypes) => {
    var Music = sequelize.define('Music', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        idVideo: {
            type: DataTypes.STRING,
            allownull: false
        },
        name:{
            type: DataTypes.STRING,
            allownull: false
        },
        url: {
            type: DataTypes.STRING,
            allownull: false
        },
        emocao: {
            type: DataTypes.STRING,
            allownull: false
        },
<<<<<<< HEAD
        userFK:{type: DataTypes.UUID,
=======
        userFK: {
            type: DataTypes.UUID,
>>>>>>> Back-End
            references: {         
                model: 'Users',
                key: 'userID'
            }
        }
    })

    Music.associate = function(models) {
        Music.belongsTo(models.User, {foreignKey: 'userFK', as: 'Users'})
      };    
       
      Music.sync({ force: false }).then(() => {
        // Now the `music` table in the database corresponds to the model definition
        return;
    });

    return Music;
}