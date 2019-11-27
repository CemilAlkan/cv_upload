var path = require('path');

var functions = require('./functions');




module.exports.index = function (req, res) {
    res.render('cvUpload',{message:""});

};

module.exports.indexPost = function (req, res) {
    var message =  "The file type can be word or pdf. Also make sure the file size is less than 100 mb.";
    var alert = "danger"
    if(functions.fileTypecontrol(req)){
        functions.saveForm(req)
        alert = "success"
        message = "Cv has been successfully registered.";
    }
    
    
    res.render("cvUpload",{message:message,alert:alert});
}

