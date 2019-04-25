module.exports = (app) => {
    var musicsController = require('./musicsController');
    app.post('/music/upload',musicsController.uploadVideo);
    app.get('/music/:idVideo', musicsController.getVideo);
    app.get('/music', musicsController.getLastVideos);
}