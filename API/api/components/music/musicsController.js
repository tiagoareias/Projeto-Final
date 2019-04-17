var musicsService = require('./musicsService');
var getYoutubeTitle = require('get-youtube-title')
 
exports.uploadVideo = async (req,res) => {
    let serverResponse = {status:"Not Uploaded", response:{}}
    //endereço do vídeo do youtube
    const url = req.body.url +"";
    //id do vídeo
    const idVideo = url.substring(32);
    if(url !=null){
    getYoutubeTitle(idVideo, async function (err, title) {
        var newUpload;
        const nome = title;
        const dadosMusica = {url:url,name:nome}
        await musicsService.uploadVideo(dadosMusica);
        serverResponse = {status:"Upload",response:title}
        res.send(serverResponse);
      });
    }
    else{
        res.send(serverResponse);
    }
      
   

}