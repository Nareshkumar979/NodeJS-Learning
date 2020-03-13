// Connecting to the Database
var dbConn = require('../db_connectivity.js');

exports.getAllUsers = function(req,res){
	dbConn.query("SELECT * FROM users WHERE status=1 AND delete_status=0", function(error,results,fields){
		if(error) throw error;
		return res.send({ status: true, data: results, message: 'List All Users.' });
	});
};

exports.insertUsers = function(req,res){
	let userData = [];
	if(JSON.stringify(req.body)=='{}')
	{
		console.log('Inside If Condition');
		return res.status(404).send('No Data Available');
	}
	else
	{
		let name = req.body.name;
		let email = req.body.email;
		userData.push({name,email});
		var query = dbConn.query("INSERT INTO users SET ? ",userData, function(error,results,fields){
			if(error) throw error;
			return res.send({ status: true, data: results, message: 'New user has been created successfully.' });
		});
		console.log(query.sql);
	}
	
};


// Edit User View Page
exports.editUser = function(req, res){
	let user_id = req.params.id;
	if (!user_id) {
      return res.send({ error: true, message: 'Please provide USER ID' });
    }
     var query = dbConn.query("SELECT * FROM users WHERE id=? AND status=1 AND delete_status=0", user_id, function(error,results,fields){
     		if(error) throw error;
     		return res.send({status : true, data: results[0], message: 'Edit User List'});
     });
     console.log(query.sql);
}



// Update User Data
exports.updateUser = function(req, res){
	let userDataEdit=[];
	let user_id = req.params.id;
	if(JSON.stringify(req.body)=='{}')
	{
		return res.send({ status: true, data: userDataEdit, message: 'No Data Available' });
	}
	else
	{
		let name = req.body.name;
		let email = req.body.email;
		let editid = req.body.edituserid;
		if(user_id==editid)
		{
			userDataEdit.push({name,email});
			 var query = dbConn.query("UPDATE users SET ? WHERE id = ?",[{name,email}, editid], function(error,results,fields){
				if(error) throw error;
				return res.send({ status: true, data: results, message: 'User has been updated successfully.' });
			});
			console.log(query.sql);		
		}
		else
		{
			return res.send({ status: true, data: userDataEdit, message: 'OOPS!. Something went wrong. Please try again' });
		}
		

	}
}

exports.deleteUser = function(req,res){
	let user_id = req.params.id;
	console.log(user_id);
	if (!user_id) {
      return res.send({ error: true, message: 'Please provide USER ID' });
     }
     var query = dbConn.query("UPDATE users SET delete_status=? WHERE id=?", [1,user_id], function(error,results,fields){
     		if(error) throw error;
     		return res.send({status : true, data: results[0], message: 'User Deleted Successfully'});
     });
     console.log(query.sql);
}

//https://stackabuse.com/how-to-send-emails-with-node-js/
//https://alligator.io/nodejs/express-routing/
//https://www.tutsmake.com/node-express-js-creating-a-restful-crud-api-with-mysql/