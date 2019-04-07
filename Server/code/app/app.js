//fornece api
const express = require('express');
//criação da api
const app = express();
const router = express.Router();

/**PÁGINA PRINCIPAL */

const index = router.get('/', (req,res,next) =>{
   res.send("Projeto Final: Portal para interação com serviço de reconhecimento emocional em música");
});

app.use('/',index);
module.exports = app;