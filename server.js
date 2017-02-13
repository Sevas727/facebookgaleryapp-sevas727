/**
 * Created by User on 06.02.2017.
 */
var express = require('express');
var app = express();
var path = require('path');
var port = 8080;

app.use(express.static(__dirname + '/build/'));
//app.use(express.static(__dirname + '/build/'));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.post('/test',function(req,res){
    res.json({test: "test"});
});

app.listen(port, function(){
    console.log(`App listen on port ${port}`);
});