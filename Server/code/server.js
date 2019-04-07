
const app = require('../code/app/app');       
const http = require('http');
const bodyParser = require('body-parser');
const {User} = require('../code/app/models')

const port = 5000; 
app.set('port',port);

app.use(bodyParser.urlencoded({extended:false}));
User.create({firstName: "Tiago", lastName: "Areias", email:"areias@mail.pt"})
//Users.create(null);
//Users.create({firstName:"Tiago", lastName:"Areias", email:"areias@mail.pt"});


//criação do servidor
const server = http.createServer(app);


server.listen(port);

console.log("Server à escuta na porta 5000");