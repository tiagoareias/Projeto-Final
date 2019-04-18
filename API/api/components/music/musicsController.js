var musicsService = require('./musicsService');
var getYoutubeTitle = require('get-youtube-title')
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
            getYoutubeTitle(idVideo, async function (err, title) {

                if (title == null) {
                    serverResponse = { status: "URL Inválido ou inexistente", response: url }
                    return res.send(serverResponse)
                }
                var newUpload;
                const nome = title;
                console.log(nome);
                const dadosMusica = { url: url, name: nome, idVideo:idVideo}

                await musicsService.uploadVideo(dadosMusica);
                serverResponse = { status: "Upload", response: title }
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
        serverResponse = {status: "URL com o id " + idVideo + "já está na base de dados",response:urlBD}
    }
    res.send(serverResponse);
}