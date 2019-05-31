var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname));

app.get('/*', function (req, res) {
res.sendFile(path.join(__dirname,'index.html'));
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
if (app.get('env' == 'development'))
{
    app.listen(3000, function () {
    console.log('Example listening on port 3000!');
});
}
else{
    app.listen(8080, function () {
    console.log('Example listening on port 8080!');
});
}

sendMail();

function sendMail(){
    console.log('here...s')
    var email 	= require("emailjs");
    var server 	= email.server.connect({
   user:    "anishenos", 
   password:"*****", 
   host:    "smtp.gmail.com", 
   ssl:     true
});
 
// send the message and get a callback with an error or details of the message that was sent
server.send({
   text:    "i hope this works", 
   from:    "anish <anishenos@gmail.com>", 
   to:      "Anish Enos <anishenos@gmail.com>",
   subject: "testing emailjs"
}, function(err, message) { console.log(err || message); });
}

module.exports = app;