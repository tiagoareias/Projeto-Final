module.exports = (app) => {
    var musicsController = require('./musicsController');
    app.post('/music/upload',musicsController.uploadVideo);
    //var musicsAPI = require('./musicsAPI')
    //app.post('/postvideourl', musicsAPI.uploadVideo);
    app.get('/music/:idVideo', musicsController.getVideo)
}