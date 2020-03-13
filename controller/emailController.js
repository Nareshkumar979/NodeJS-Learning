const nodemailer = require('nodemailer');
let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
       user: '06d95ca7e4bc62',
       pass: '40eb81b14d82a4'
    }
});


exports.sendEmail = function(req,res){
	if(JSON.stringify(req.body)=='{}')
	{
		return res.send({ status: true, data: userDataEdit, message: 'No Data Available' });
	}
	let emailContent = req.body.emailContent;
	// Sending the Email via nodeMailer
	const message = {
    	from: 'sdkat979@yopmail.com', // Sender address
    	to: 'nareshkumar-bcf85f@inbox.mailtrap.io',         // List of recipients
    	subject: 'Design Your Email Sent Via NodeJS', // Subject line
    	text: emailContent, // Plain text body
    	//html: '<h1>Html Email Format</h1><p>Get your <b>Email</b> today!</p>',
    	attachments: [
        	{ // Use a URL as an attachment
          		filename: 'dummy.pdf',
          		path: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      		}
    	]
	};
	transport.sendMail(message, function(err, info) {
    	if (err) {
      		return res.send({ status: true, data: err, message: 'Email Not Sent Successfully' });
    	} else {
      		return res.send({ status: true, data: info, message: 'Email Sent Successfully' });
    	}
	});
	
	
}