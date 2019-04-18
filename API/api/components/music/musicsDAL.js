var db = require('../database/index')

exports.uploadVideo = async (musica) => {
    await db.Music.create(musica);
}

exports.getVideo = async (idVideo) => {
    var musica;
    await db.Music.findOne( {where: {idVideo:idVideo}}).then(music => musica = music).catch(err => console.log(err))
    return musica;
}

exports.getVideoByURL = async (url) => {
    var musica;
    await db.Music.findOne( {where: {url:url}}).then(music => musica = music).catch(err => console.log(err))
    return musica;
}