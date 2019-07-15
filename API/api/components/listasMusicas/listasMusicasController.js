var listaMusicasService = require('./listasMusicasService');
var fetchVideoInfo = require('youtube-info');
const { check, validationResult } = require('express-validator/check');
var jwt = require('jsonwebtoken');
var amqp = require('amqplib/callback_api')

const ytdl = require('ytdl-core');


exports.addMusic = async (req, res) => {
    let serverResponse = { status: "Musica não adicionada à lista", response: {} }
    //variável que guarda a query à base de dados
    var novaMusica;
    //variável que recolhe o parâmetro enviado na request
    var dados = {
        musicFK:req.body.musicFK,
        listaFK:req.body.listaFK
        };

    await listaMusicasService.addMusic(dados).then(url => novaMusica = url).catch(err => console.log(err));
    if (novaMusica != null) {
        serverResponse = { status: "Musica adicionada à lista", response: novaMusica }
    }
    return res.send(serverResponse);
}

exports.deleteMusicList = async (req, res) => {
    let serverResponse = { status: "Musica não eliminada da lista", response: {} }
    //variável que guarda a query à base de dados
    var musicaEliminada;
    var musicID = req.body.musicFK;
    var listID = req.body.listFK;
    
    //variável que recolhe o parâmetro enviado na request

    await listaMusicasService.deleteMusicList(musicID,listID).then(url => musicaEliminada = url).catch(err => console.log(err));
    if (musicaEliminada != null) {
        serverResponse = { status: "Música Eliminada da lista com sucesso", response: musicaEliminada }
    }
    return res.send(serverResponse);
}

exports.getMusicList = async (req, res) => {
    let serverResponse = { status: "Lista sem músicas", response: {} }
    //variável que guarda a query à base de dados
    var musicasLista;
    var listaFK = req.body.listaFK;
    
    //variável que recolhe o parâmetro enviado na request

    await listaMusicasService.getMusicList(listaFK).then(url => musicasLista = url).catch(err => console.log(err));
    var count = Object.keys(musicasLista).length;
    if (count != 0) {
        serverResponse = { status: "Existem músicas nesta lista", response: musicasLista }
    }
    return res.send(serverResponse);
}