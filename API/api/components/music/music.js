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
        url: {
            type: DataTypes.STRING,
            allownull: false
        },
        emocao: {
            type: DataTypes.STRING,
            allownull: false
        },
        userFK: {
            type: DataTypes.UUID,
            references: {         
                key: 'userID'
            }
                model: 'Users',
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