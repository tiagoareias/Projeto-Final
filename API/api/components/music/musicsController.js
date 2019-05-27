var musicsService = require('./musicsService');
var fetchVideoInfo = require('youtube-info');
const { check, validationResult } = require('express-validator/check');
var jwt = require('jsonwebtoken');

const ytdl = require('ytdl-core');


exports.uploadVideo = async (req, res) => {
    let serverResponse = { status: "Not Uploaded", response: {} }
    //variável que guarda a query à base de dados
    var existsMusica;
    //validar url
    req.checkBody('url', 'URL is required or is not valid').isURL().notEmpty();
    //endereço do vídeo do youtube
    const url = req.body.url + "";
    //Returns a video ID from a YouTube URL.
    const idVideo = ytdl.getURLVideoID(url);

    //verificar se a música já existe na base de dados
    await musicsService.getVideo(idVideo).then(mus => existsMusica = mus).catch(err => console.log(err));

    if (existsMusica != null) {
        serverResponse = { status: "URL já existe na base de dados", response: existsMusica }
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

                const dadosMusica = {
                    idVideo: idVideo, url: url, name: nome, autor: autor,
                    dataPublicacao: dataPublicacao, numViews: numViews,
                    numDislikes: numDislikes, numLikes: numLikes, numComentarios
                }

                await musicsService.uploadVideo(dadosMusica);
                serverResponse = { status: "Upload", response: dadosMusica }
                return res.send(serverResponse);
            });
        }
        else {
            return res.send(serverResponse);
        }
    }

}

exports.getVideo = async (req, res) => {
    let serverResponse = { status: "URL não está presente na base de dados", response: {} }
    //variável que guarda a query à base de dados
    var urlBD;
    //variável que recolhe o parâmetro enviado na request
    var idVideo = req.params.idVideo;
    await musicsService.getVideo(idVideo).then(url => urlBD = url).catch(err => console.log(err));

    if (urlBD != null) {
        serverResponse = { status: "URL com o id " + idVideo + " está na base de dados", response: urlBD }
    }
    return res.send(serverResponse);
}

exports.getVideoPesquisa = async (req, res) => {
    let serverResponse = { status: "A pesquisa não retornou nenhuma música", response: "teste" }

    var nome;
    var pesquisaRealizada = req.params.pesquisaMusica;
    await musicsService.getVideoPesquisa(pesquisaRealizada).then(music => nome = music).catch(err => console.log(err));

    if(pesquisaRealizada !=null){
        serverResponse = {status:"Musicas encontradas que contem o seguinte conjunto de caracteres " + pesquisaRealizada, response:nome}
    }
    return res.send(serverResponse);
}
exports.getLastVideos = async (req, res) => {
    let serverResponse = { status: "Ainda não existem músicas na Base de Dados", response: {} }
    //variável que guarda a query à base de dados
    var musicas;
    var token = req.headers['x-access-token'];
    //console.log(token);
    if (token == "null") {
        await musicsService.getLastVideos().then(mus => musicas = mus).catch(err => console.log(err))
        if (musicas.length >= 0) {
            serverResponse = { status: "Últimas músicas classificadas", response: musicas }
        }
        return res.send(serverResponse);
    }
    else {
        try {
            jwt.verify(token, 'secret');
            await musicsService.getLastVideos().then(mus => musicas = mus).catch(err => console.log(err))
            if (musicas.length >= 0) {
                serverResponse = { status: "Últimas músicas classificadas", response: musicas }
            }
            return res.send(serverResponse);
        } catch (err) {
            serverResponse = { status: "token expired", response: {} }
            return res.send(serverResponse);
        }
    }
}

exports.deleteMusic = async (req, res) => {
    let serverResponse = { status: "Not Deleted | Música não está na base de dados", response: {} }
    var musicaDelete;
    //musica a apagar
    var musicaApagar = req.params.idVideo;

    var token = req.headers['x-access-token'];
    //se o token não existir
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    //se existir
    try {
        //validar
        jwt.verify(token, 'secret');
        //console.log("nao validou")
        //apagar música
        await musicsService.deleteMusic(musicaApagar).then(mus => musicaDelete = mus).catch(err => console.log(err));
        if (musicaDelete != 0) {
            serverResponse = { status: "Deleted", response: musicaDelete }
        }
        return res.send(serverResponse);
    } catch (err) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
}
