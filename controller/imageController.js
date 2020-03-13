var settings = require('cloud_settings');
var formidable = require('formidable');
exports.show_uplaoder_form = function(req,res){
	res.sendFile(settings.PROJECT_DIRECTORY+'/imageUpload.html');
}

exports.uploadImage = function(req,res){
	var uploadedImages=[]
	var form = new formidable.IncomingForm();
    form.parse(req);
    console.log("uploadedImages");
    form.on('fileBegin', function (name, file){
        file.path = settings.ASSETS_FOLDER+'/uploads/' + file.name;
        uploadedImages.push(file.name);
    });

    //Emitted whenever a field / file pair has been received. file is an instance of File
    form.on('file', function (name, file){
        //console.log('Uploaded ' + file.name);
    });

    //Emitted when the entire request has been received, and all contained files have finished flushing to disk. 
    //This is a great place for you to send your response.
    form.on('end', function() {
    	res.send('Uploaded ' + uploadedImages);
	});
    
    //res.sendFile(settings.PROJECT_DIRECTORY+'/imageUpload.html');
}