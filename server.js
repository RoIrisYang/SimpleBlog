var http = require("http");
var express = require("express");
var app = express();
var path = require("path");

app.use(express.static(path.join(__dirname, 'public')));

app.get( ('/' || '/home.html') , function(req, res){
    res.sendfile("home.html", { root: path.join(__dirname, 'public') });
    console.log("Turn to home...");
});

app.get('/post.html',function(req, res){
    res.sendfile("post.html", { root: path.join(__dirname, 'public') });
    console.log("Turn to posting page...");
});

var server = http.createServer(app);
server.listen(8080,function(){
    console.log("Server running...");
});