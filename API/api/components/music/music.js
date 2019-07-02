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
        name: {
            type: DataTypes.STRING,
            allownull: false
        },
        autor: {
            type: DataTypes.STRING,
            allownull: false
        },
        dataPublicacao: {
            type: DataTypes.DATE,
            allownull: false
        },
        numViews: {
            type: DataTypes.INTEGER,
            allownull: false
        },
        numDislikes: {
            type: DataTypes.INTEGER,
            allownull: false
        },
        numLikes: {
            type: DataTypes.INTEGER,
            allownull: false
        },
        numComentarios: {
            type: DataTypes.INTEGER,
            allownull: false
        },
        emocao: {
            type: DataTypes.STRING,
            allownull: false
        },
        userFK: {
            type: DataTypes.UUID,
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