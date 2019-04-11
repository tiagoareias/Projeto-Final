var musicsDAL = require("./musicsDAL")
exports.uploadVideo = async (params) => {
    var response = {}
    if(!params.url){
        return response = {data: "Insert URL"}
    }
    /*await musicsDAL.uploadVideo(params.url).then(
        status => {
            response = {data: status}
        }
    )*/
    return response;
}