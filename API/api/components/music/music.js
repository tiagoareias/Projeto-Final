'use strict';

module.exports = (sequelize, DataTypes) => {
    var Music = sequelize.define('Music', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        idVideo:{
            type: DataTypes.STRING,
            allownull:false
        },
        url:{
            type: DataTypes.STRING,
            allownull: false
        },
        name:{
            type: DataTypes.STRING,
            allownull: false
        },
        autor:{
            type: DataTypes.STRING,
            allownull: false  
        },
        dataPublicacao:{
            type: DataTypes.DATE,
            allownull: false  
        },
        numViews:{
            type: DataTypes.STRING,
            allownull: false  
        },
        numDislikes:{
            type: DataTypes.STRING,
            allownull: false  
        },
        numLikes:{
            type: DataTypes.STRING,
            allownull: false  
        },
        numComentarios:{
            type: DataTypes.STRING,
            allownull: false  
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
      });
    Music.sync({ force: false }).then(() => {
        // Now the `music` table in the database corresponds to the model definition
        return ;
      });

      return Music;
}