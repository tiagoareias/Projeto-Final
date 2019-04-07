//fornece api
const express = require('express');
//criação da api
const app = express();
const router = express.Router();
const db = require('../config/database')
const {User} = require('../app/models')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));

/**********PÁGINA PRINCIPAL **********/

app.get('/',async (req,res) =>{
    
    res.status(201).send("Página Inicial");
  
});

/**********UTILIZADORES **********/

//obter todos os utilizadores da base de dados

app.get('/api/users',async (req,res) =>{
    User.findAll().then(users =>{
       res.status(201).send(users);
    })
    .catch(err => console.log(err));
});


//criar novo utilizador
app.post('/api/users/create', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
  });


//obter utilizador pelo id
app.get('/api/users/:id', async (req,res) => {
    let id = req.params.id;
    User.findByPk(id).then(user =>{
        res.status(201).send(user);
    })
    .catch(err => console.log(err));
});

//editar dados do utilizador

//editar utilizador
app.post('/api/users/:id/edit', async (req, res) => {
    let id = req.params.id;
    User.findByPk(id).then(user =>{
        const userEdited = user.update(req.body);
        res.json(user);
    })
    .catch(err => console.log(err));
  });

//apagar utilizador
app.post('/api/users/:id/delete', async (req,res) => {
    let id = req.params.id;
    User.findByPk(id).then(user =>{
        const userDeleted = user.destroy();
        res.json("Utilizador Eliminado");
    })
    .catch(err => console.log(err));
})

module.exports = app;