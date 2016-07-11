var http = require("http");
var express = require("express");
var path = require("path");
//DB
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/article_db');
mongoose.connection.on('error', function(err){
    console.log(err);
});
mongoose.connection.once('open', function(){
    console.log('Connection Established');
});
var Schema = mongoose.Schema;
var Article_Schema = new Schema({
    Title: {type: String, required: true},
    Author: {type: String, required: true},
    Content: {type: String, required: true},
    Create: {type: Date, default: Date.now},
    UpDate: Date,
});
var article = mongoose.model('Article', Article_Schema);

var app = express();
// for static files
app.use(express.static(path.join(__dirname, 'public')));
//paging

//homepage
app.get( ('/' || '/home.html') , function(req, res){
    res.sendfile("home.html", { root: path.join(__dirname, 'public') });
    console.log("Turn to home...");
});

//post page
app.get('/post.html',function(req, res){
    res.sendfile("post.html", { root: path.join(__dirname, 'public') });
    console.log("Turn to posting page...");
});

app.get('/articles',function(req,res){
     article.find(function(err, articles){
        if(err){
            console.error(err);
            res.json({error: err.Title}, 500);
        };
        res.json(articles);
    });
});

//create server
var server = http.createServer(app);
server.listen(8080,function(){
    console.log("Server running...");
});

