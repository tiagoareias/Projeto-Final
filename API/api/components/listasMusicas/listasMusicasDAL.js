var models = require('../models/index');

exports.addMusic = async (lista) => {
    await models.ListasMusicas.create(lista);
}

exports.deleteMusicList = async (musicID,listID) =>{
    var deleteMusicMusic;
    await models.ListasMusicas.destroy({where:{listaFK:listID,musicFK:musicID}}).then(usr => deleteMusicMusic = usr).catch(err => console.log(err));
    return deleteMusicMusic;
  }

  
exports.getMusicList = async (listID) =>{
    var deleteList;
    await models.ListasMusicas.findAll({where:{listaFK:listID}}).then(usr => deleteList = usr).catch(err => console.log(err));
    return deleteList;
  }