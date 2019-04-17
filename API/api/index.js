var expressValidator = require('express-validator');

var express = require('express'),
    bodyParser = require('body-parser')

var app = express()
app.use(expressValidator());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization, Accept-Version")
    res.header("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Credentials",true)
    next();
})
//app.use(expressSession({secret:'max',saveUninitialized:false,resave:false}));
require('./components/database/index')
require('./components/user/index')(app)
require('./components/music/index')(app)

var port = 8000
app.listen(port, () => {
    console.log('\x1b[32m%s %d\x1b[0m.','Server HTTP listening on port', port)
})

app.get('/', function(req,res){
   res.sendFile(__dirname + '/public/index.html')
})