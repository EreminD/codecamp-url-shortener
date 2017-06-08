const config = require('config');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

var list = {};
var currentId = 0;

app.get('/new/*', function(req, res){  
    var original_url = req.path.replace('/new/', '');
    list[(++currentId).toString()] = original_url;
    var response = {"original_url":original_url, "short_url":req.hostname+"/"+currentId };
    res.status(201).send(response);
}) 

app.get('/:id', function(req, res){
    var id = req.params.id;
    if(id in list){
        console.log(list[id]);
        if (list[id].match('http')) { res.redirect(301, list[id]) }
        else                        { res.redirect(301, 'http://'+list[id]) }
    }
    else{
        res.status(404).send('no such element');
    }
})

app.listen(port, function () {
  console.log('Example app listening on port '+port)
})
