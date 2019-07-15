module.exports =  (sequelize, DataTypes) => {
    const ListasMusicas = sequelize.define('ListasMusicas', {});
  
    ListasMusicas.associate = (models) => {

        // ListasMusicas.belongsTo(models.Music, {
        //     foreignKey: 'musicFK',onDelete: 'cascade',
        //     hooks: true, 
        // });

        
        ListasMusicas.belongsTo(models.ListaRepro, {
            foreignKey: 'listaFK', onDelete: 'cascade',
            hooks: true, 
        });
    }; 
    return ListasMusicas;
  };
