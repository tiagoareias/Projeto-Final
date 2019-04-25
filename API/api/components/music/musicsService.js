const musicsDal = require('./musicsDAL');

exports.uploadVideo = async(musica) =>{
    return await musicsDal.uploadVideo(musica);
}

exports.getVideo = async(idVideo) =>{
    return await musicsDal.getVideo(idVideo);
}

exports.getVideoByURL = async(url) =>{
    return await musicsDal.getVideoByURL(url);
}

exports.getLastVideos = async() =>{
    return await musicsDal.getLastVideos();
}