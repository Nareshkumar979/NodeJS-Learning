var express = require('express');
const express_router = express.Router();

// Invoking Middleware
const express_middleware = require('../middleware/middleware');

// Controller Invoking
var crudController = require('../controller/crud');
var emailController = require('../controller/emailController');
var imageController = require('../controller/imageController');
var smsController = require('../controller/smsController');

// User CRUD Router goes Here
express_router.get('/',crudController.getAllUsers);
express_router.post('/',crudController.insertUsers);
express_router.get('/user/:id',express_middleware.check,crudController.editUser);
express_router.put('/user/:id',crudController.updateUser);
express_router.delete('/user/:id',crudController.deleteUser);

// Send Email 
express_router.post('/sendemail', emailController.sendEmail);

// Image Uploader
express_router.get('/image_uploader',imageController.show_uplaoder_form);
express_router.post('/image_uploader',imageController.uploadImage);

// Send SMS
express_router.post('/send_sms',smsController.send_sms)
module.exports = express_router; 

