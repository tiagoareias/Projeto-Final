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

exports.getLastVideos = async () =>{
    var musicas;
    await db.Music.findAll({ order: [['createdAt', 'DESC']], limit:4 })
        .then(mus => musicas = mus).catch(err => console.log(err));
    return musicas;
}

exports.deleteMusic = async (idVideo) => {
    var musica
    await db.Music.destroy( {where: {idVideo:idVideo}}).then(mus => musica = mus).catch(err => console.log(err))
    return musica;
}