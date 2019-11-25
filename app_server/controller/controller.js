var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var util = require('util');



module.exports.index = function (req, res) {
    res.render('cvUpload');
};

module.exports.indexPost = function (req, res) {
    mkdirp('./Cv/' + req.body.email, function (err) {

        console.log('Dosya oluşturulamadı.');

    });

    var str = util.format('{ "firstName":"%s", "lastName":"%s","email":"%s","phoneNumber":"%s" }', req.body.fName, req.body.lastName, req.body.email, req.body.phone);
    var jsonObj = JSON.parse(str);
    var jsonContent = JSON.stringify(jsonObj);
    var path = "./Cv/" + req.body.email
    fs.writeFile(path + "/form.json", jsonContent, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    });

    if (req.files) {
        var file = req.files.filename,
            filename = file.name;

        req.files.format
        file.mv(path + "/" + filename, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }

    res.render("successful");
}

