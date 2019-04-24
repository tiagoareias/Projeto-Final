var musicsService = require('./musicsService');
var fetchVideoInfo = require('youtube-info');   
const { check, validationResult } = require('express-validator/check');


exports.uploadVideo = async (req, res) => {
    let serverResponse = { status: "Not Uploaded", response: {} }
    //variável que guarda a query à base de dados
    var existsURL;
    //validar url
    req.checkBody('url', 'URL is required or is not valid').isURL().notEmpty();
    //verificar se o url já existe na base de dados
    await musicsService.getVideoByURL(req.body.url).then(url => existsURL = url).catch(err => console.log(err));
    if(existsURL !=null){
        serverResponse = {status:"URL já existe na base de dados",response:existsURL}
        return res.send(serverResponse)
    }

    //verificar erros 
    var errors = req.validationErrors();
    //se existir erros de validação
    if (errors) {
        serverResponse = { status: "Erros na validação", response: errors }
        return res.send(errors)
    }
    else {
        //endereço do vídeo do youtube
        const url = req.body.url + "";
        //id do vídeo
        const idVideo = url.substring(32);
        if (url != null) {
            fetchVideoInfo(idVideo, async function (err, videoInfo) {
                if (err) throw new Error(err);
                //console.log(videoInfo);
                const nome = videoInfo.title;
                const autor = videoInfo.owner;
                const dataPublicacao = videoInfo.datePublished;
                const numViews = videoInfo.views;
                const numDislikes = videoInfo.dislikeCount;
                const numLikes = videoInfo.likeCount;
                const numComentarios = videoInfo.commentCount;

                const dadosMusica = { idVideo: idVideo, url: url, name: nome, autor: autor, 
                                      dataPublicacao: dataPublicacao, numViews: numViews,
                                      numDislikes: numDislikes, numLikes: numLikes, numComentarios }

                await musicsService.uploadVideo(dadosMusica);
                serverResponse = { status: "Upload", response: dadosMusica }
                res.send(serverResponse);
            });
        }
        else {
            res.send(serverResponse);
        }
    }

}

exports.getVideo = async(req,res) =>{
    let serverResponse = { status: "URL não está presente na base de dados", response: {} }
    //variável que guarda a query à base de dados
    var urlBD;
    //variável que recolhe o parâmetro enviado na request
    var idVideo = req.params.idVideo;
    
    await musicsService.getVideo(idVideo).then(url => urlBD = url).catch(err => console.log(err));

    if(urlBD != null){
        serverResponse = {status: "URL com o id " + idVideo + " está na base de dados",response:urlBD}
    }
    res.send(serverResponse);
}