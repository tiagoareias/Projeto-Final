const musicsDal = require('./musicsDAL');

exports.uploadVideo = async(musica) =>{
    return await musicsDal.uploadVideo(musica);
}

exports.getVideo = async(idVideo) =>{
    return await musicsDal.getVideo(idVideo);
}

exports.getLastVideos = async() =>{
    return await musicsDal.getLastVideos();
}

exports.deleteMusic = async(idVideo) => {
    return await musicsDal.deleteMusic(idVideo);
}