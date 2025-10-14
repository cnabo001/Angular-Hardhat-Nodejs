const http = require('http')
const express = require('express')
//const bodyParser = require('body-parser')
//const logger = require('morgan');
//const config = require('./config/config/config.js')
const app = express()
const cors = require('cors')
const fs = require('fs')
const { userData } = require('../../chaincode/keys')
const port = 3000;

const addUser = fs.readFileSync('./data/users.json');

// Server
//const server = http.createServer(app)
const corsOpts = {
    origin: '127.0.0.1:3000',
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ],
    allowHeaders:[
        'Content-Type'
    ],
};
app.use(cors(corsOpts))
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '127.0.0.1:3000');
    

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, X-Requested-With', 'X-HTTP-Method-Override');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
})
// app.use(bodyParser.json()) // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })) // to support URL-encoded bodies

// Logging
//if (config.env === "development") { app.use(logger('dev')) }
//else if (config.env === "staging") { app.use(logger('dev')) }
//else if (config.env === "production") { app.use(logger('combined')) }
//console.log("------------------")
//console.log("Enviornment ======> ", config.env, " <=======")

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('title', 'Pharmanet App');
app.get('/', (req,res) => res.send('Hello world'));

app.post('/sum', (req,res) => {
// Printing the request submitted by the user on the console
console.log(req.body);
// Taking two numbers as input from user, storing them in keys x1 and x2 and calculating the sum
var sum = Number(req.body.x1) + Number(req.body.x2);
// Sending back the response
res.send(sum.toString());
});

app.post('/register', (req, res) => {
    res.set('Access-Control-Allow-Origin', '127.0.0.1:4200');
    var dataObj = JSON.parse(addUser);
    dataObj.users.push(req.body)
    console.log('users data: ', dataObj);
    const jsonstring = JSON.stringify(dataObj);
    fs.writeFile('./data/users.json', jsonstring, err => {
        if(err){
            console.log('error writing users file')
        } else{
            console.log('successful writing users file')
        }
    })

});

app.get('/logIn', (reg, res) => {
    res.send(addUser);
    return JSON.parse(addUser);
});

app.post('/createPO', (req, res) => {

});

app.post('/createShipment', (req, res) => {

});
app.get('/trackShipment', (req, res) => {

});
app.get('/trackItem', (req, res) => {

});

app.listen(port, () => console.log(`Listening on port ${port}!`));

// Start
// server.listen(config.server.port, config.server.host, () => {
//     console.log("------------------")
//     console.log('listening on http://' + (config.server.host ) + ":" + (config.server.port ));
// })

module.exports = app
