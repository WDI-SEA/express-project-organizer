var express = require('express');
var async = require('async');
var db = require('../models');
var router = express.Router();

router.get('/', function(req,res){
	res.send('get route reached for categories');
});

router.get('/:id', function(req,res){
	res.send('get route for individual page reached');
});

router.delete('/:id', function(req,res){
	res.send('delete route reached for individual category');
});

module.exports = router;