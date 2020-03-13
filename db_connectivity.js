var mysql = require('mysql');
// MYSQL DB connection configurations
var dbConn = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'nodelearning'
 });
// connect to database
dbConn.connect(function(err){
	if(err)
	{
		return console.log('error: '+err.message)
	}
	console.log('Connected to Mysql Server');
}); 

module.exports = dbConn;