var express = require('express');
var db = require('../models/');
var router = express.Router();

router.get('/', function(req,res){
    res.send('get route');
    console.log('get route reached');
});

router.get('/:id', function(req, res){
    res.send('id route');
});


module.exports = router;