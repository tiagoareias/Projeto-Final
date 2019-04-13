
//funções que retorna a resposta

var usersService = require('./usersService')
exports.createUser = async (req,res) => {
    //resposta por defeito do servidor
    let serverResponse = {status:"Not Created", response:{}}
    //criação de um novo user de acordo com os parâmetros recebidos
    const novoUser = await usersService.createUser(req.body);
    
    //**FALTA VERIFICAR O ESTADO  */
    serverResponse = {status:"Created", response:novoUser};

    res.send(serverResponse);

    
     
  
}

exports.getUser = async (req, res) => {
    var user;
    //ERRO TA AQUI A RETORNAR
    
    await usersService.getUser(req.params.username).then(user => user=user)
    return res.send("Ola")
}