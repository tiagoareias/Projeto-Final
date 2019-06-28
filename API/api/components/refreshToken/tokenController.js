var jwt = require('jsonwebtoken');

exports.refreshToken = async(req,res) =>{

    let serverResponse = { status: "Token Não Atualizado", response: {}}
    console.log(req.body);
    var token = jwt.sign({ username: req.body.username,
        nome: req.body.nome, isAdmin:req.body.isAdmin }, 'secret', {
       expiresIn: 600 // expires in 10 minutos ***PARA TESTES****

   });
   serverResponse.status = "Token Atualizado";
   serverResponse.response = token;
 //resposta do servidor
 res
 .json(serverResponse);
}