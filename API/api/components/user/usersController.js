
//funções que retorna a resposta

var usersService = require('./usersService')

//criação de um novo utilizador
exports.createUser = async (req,res) => {
    //resposta por defeito do servidor
    let serverResponse = {status:"Not Created", response:{}}
    //criação de um novo user de acordo com os parâmetros recebidos
    const novoUser = await usersService.createUser(req.body);
    
    //**FALTA VERIFICAR O ESTADO  */
    serverResponse = {status:"Created", response:novoUser};

    res.send(serverResponse);
}
//request a um utilizador de acordo com o seu username
exports.getUser = async (req, res) => {
    let serverResponse = {status:"Não existe na base de dados",response:{}}
    const userName = req.params.username;
    const user = await usersService.getUser(userName).then().catch(err => console.log(err));
    if(user !=null){
        serverResponse = {status:"Utilizador existe na Base de Dados",response:user}
    }
    
    res.send(serverResponse);
}

//request a todos os utilizadores
exports.getAllUsers = async(req,res) =>{

    const allUsers = await usersService.getAllUsers().then().catch(err => console.log(err));
    res.send(allUsers);
}

//editar um utilizador
exports.editUser = async(req,res) =>{
    let serverResponse = {status:"Not Updated | Utilizador não está na base de dados",response:{}}
    //username inserido no URL
    const userName = req.params.username;
    const userUpdate = await usersService.editUser(req.body,userName).then().catch();

    if(userUpdate != 0){
        serverResponse = {status:"Updated",response:userUpdate}
        
    }
   
    res.send(serverResponse);
}

//eliminar utilizador
exports.deleteUser = async(req,res) =>{
    let serverResponse = {status:"Not Deleted | Utilizador não está na base de dados",response:{}}
    //username inserido no URL
    const userName = req.params.username;
    const userDelete = await usersService.deleteUser(userName).then().catch();
    if(userDelete != 0){
        serverResponse = {status:"Deleted",response:userDelete}
    }
    res.send(serverResponse);
}