var mkdirp = require('mkdirp');
var util = require('util');
var fs = require('fs');
var mime = require('mime');

// converting data from the form to JSON format
function createJSON(path, strJSON) {

    var jsonObj = JSON.parse(strJSON);
    var jsonContent = JSON.stringify(jsonObj);

    fs.writeFile(path + "/form.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("Could not write json file");
            return true;
        }
    });
}
// save cv file
function saveCvFile(req,path) {
    var file = req.files.filename,
        filename = file.name;
    if (filename) {
        file.mv(path + "/" + filename, function (err) {
            if (err) {
                console.log("An error occurred while saving the file.");
                return true;
            }
        })
    }

}



// file Type and size controller
module.exports.fileTypecontrol = function (req) {

    var file = req.files.filename;

    var message = false;
    currentftype = ["application/msword", "application/pdf"];
    console.log(file.size)
    currentftype.forEach(ftype => {

        if (file.mimetype == ftype && file.size < 100000) {
            message = true;
        }
    });
    return message;
}

// Save Form Function
module.exports.saveForm = function (req) {

    var folderName = req.body.email.replace('@', '-')
    var path = "./Cv/" + folderName
    //create Folder
    mkdirp('./Cv/' + folderName, function (err) {
        if (err) {
            console.log('Could not create file.');

            return true;
        }
    });

    var strJSON = util.format('{ "firstName":"%s", "lastName":"%s","email":"%s","phoneNumber":"%s" }', req.body.fName, req.body.lastName, req.body.email, req.body.phone);
    createJSON(path, strJSON);
    
    // save cv file
    saveCvFile(req,path);

};