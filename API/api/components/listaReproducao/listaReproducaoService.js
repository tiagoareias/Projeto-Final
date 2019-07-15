const listaReproducaoDAL = require('./listaReproducaoDAL');

exports.createList = async(lista) =>{
    await listaReproducaoDAL.createList(lista);
    return lista;
}

exports.deleteList = async(listID) =>{
    return await listaReproducaoDAL.deleteList(listID);
}

exports.getList = async(userFK, nomeLista) =>{
    return await listaReproducaoDAL.getList(userFK, nomeLista);
}