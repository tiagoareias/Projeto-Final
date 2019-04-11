//funções que retorna a resposta

var usersService = require('./usersService')
exports.createUser = async () => {
    await usersService.createUser().then().catch(ex => console.log(ex));
}

exports.getUser = async (req, res) => {
    var user;
    //ERRO TA AQUI A RETORNAR
    
    await usersService.getUser(req.params.username).then(user => user=user)
    return res.send(user)
}