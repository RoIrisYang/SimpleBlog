var http = require("http");
var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
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
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//paging
//homepage
app.get( ('/' || '/home-new.html') , function(req, res){
    res.sendFile("home-new.html", { root: path.join(__dirname, 'public') });
});

//post page
/*app.get('/post.html',function(req, res){
    res.sendfile("post.html", { root: path.join(__dirname, 'public') });
});*/
app.post('/api/articles', function(req,res){
    //console.log("in post");
    //console.log(req.body);
    var intemp = {
        Title: req.body.Title,
        Author: req.body.Author,
        Content: req.body.Content,
        Create: Date.now(),
        UpDate: Date.now(),
    };
    article.create(intemp, function(err, article){
        res.json(article);
    });
});

app.get('/api/articles',function(req,res){
     article.find(function(err, articles){
        if(err){
            console.error(err);
            res.json({error: err.Title}, 500);
        };
        res.json(articles);
    });
});

app.get('/api/articles/:id', function(req, res){
    article.findOne({_id: req.params.id},function(err, detail){
        if(err){
            console.error(err);
            res.json({error: err.Title}, 500);
        };
        res.json(detail);
    });    
});

app.delete('/api/articles/:id', function(req, res){
   // console.log("in delete");
    article.remove({_id: req.params.id},function(err, de){
        if(err){
            console.error(err);
            res.send({error: err.Title}, 500);
        };
        res.json({message: 'Deleted!!!'});
    });
});

app.put('/api/articles/:id', function(req, res){
    //console.log("in edit");
    article.findById(req.params.id, function(err, p) {
        if (!p)
            return next(new Error('Could not load Document'));
        else {
            // do your updates here
            p.Title = req.body.Title;
            p.Author = req.body.Author;
            p.Content = req.body.Content;
            p.UpDate = Date.now();

            p.save(function(err) {
            if (err)
                console.log('error');
            else
                console.log('');
            });
        }
    });
    res.json({message: 'OK'});
});

//create server
var server = http.createServer(app);
server.listen(8080,function(){
    console.log("Server running...");
});