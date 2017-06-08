const config = require('config');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

var list = {};
var currentId = 0;

app.get('/new/:url', function(req, res){  
    console.log(req.path);
    console.log(req.params);
    
    list[(++currentId).toString()] = req.params.url;
    res.send(list)
}) 

app.get('/:id', function(req, res){
    var id = req.params.id;
    if(id in list){
        res.redirect(301, 'http://'+list[id]); 
    }
    else{
        res.status(404).send('no such element');
    }
})

app.listen(port, function () {
  console.log('Example app listening on port '+port)
})
