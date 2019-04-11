module.exports = (app) => {
    var musicsAPI = require('./musicsAPI')
    app.post('/postvideourl', musicsAPI.uploadVideo)
}