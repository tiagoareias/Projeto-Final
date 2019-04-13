var db = require('../database/index')

exports.uploadVideo = async (musica) => {
    await db.Music.create(musica);
}