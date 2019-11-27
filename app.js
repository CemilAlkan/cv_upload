
var fs = require('fs');
var path = require('path');
var express = require('express');
var fileUpload = require('express-fileupload');

var app = express();
var ejslayout = require('express-ejs-layouts');
var bodyParser = require('body-parser');
app.use(fileUpload());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/app_server/views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(ejslayout)
app.use('/public', express.static(path.join(__dirname, "public")));

var router = require('./app_server/router/projeRouter');

app.use('/', router);

app.listen(8000);