var path = require('path');

var functions = require('./functions');




module.exports.index = function (req, res) {
    res.render('cvUpload');
};

module.exports.indexPost = function (req, res) {
    functions.saveForm(req)
   
    res.render("successful");
}

