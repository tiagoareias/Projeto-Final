
const app = require('../code/src/app');       
const http = require('http');

const port = 5000; 
app.set('port',port);

//criação do servidor
const server = http.createServer(app);


server.listen(port);

console.log("Server à escuta na porta 5000");