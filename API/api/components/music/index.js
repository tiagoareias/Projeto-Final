module.exports = (app) => {
    var musicsController = require('./musicsController');
    const rateLimit = require('express-rate-limit');
    //rate limit para o upload de músicas
    const uploadLimiter = rateLimit({
        windowMs: 30 * 60 * 1000, // 30 minutos
        max: 15, // bloqueia após 3 pedidos
        message: {status:"Excedeu o número de uploads permitidos nos últimos minutos"}
    });
    //rate limit para os restantes pedidos
    const requestsLimit = rateLimit({
        windowMs: 20 * 60 * 1000, // 20 minutos
        max: 25, // bloqueia após 25 pedidos
        message: {status:"Realizou demasiados pedidos ao servidor nos últimos minutos. Tente novamente mais tarde"}
    });
    app.post('/music/upload', uploadLimiter, musicsController.uploadVideo);
    app.get('/music/:idVideo', requestsLimit,musicsController.getVideo);
    app.get('/music', requestsLimit,musicsController.getLastVideos);
    app.post('/music/:idVideo/delete',requestsLimit, musicsController.deleteMusic);
    app.get('/music/search/:pesquisaMusica', musicsController.getVideoPesquisa);
}