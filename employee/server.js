var express 	= require('express');
var bodyParser 	= require('body-parser');
var chalk 		= require('chalk');

var db			= require('./models/db.js');
var routes		= require('./routes/route.js');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res) {
  res.sendFile('public/index.html');
});

app.get('/employee',routes.employeesList);

app.post('/employee',routes.insertEmployee);

app.delete('/employee/:id',routes.deleteEmployee);

app.get('/employee/:id',routes.getEmployeeDetails);

app.put('/employee/:id',routes.updateEmployee);


var port = process.env.PORT || 8080;

var server=app.listen(port,function(req,res){
    console.log(chalk.green("Catch the action at http://localhost:"+port));
});