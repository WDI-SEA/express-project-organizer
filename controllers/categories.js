var express = require('express');
var db = require('../models');
var router = express.Router();
//GET for /categories - show all the categories that exist

router.get('/', function(req, res) {
	console.log("This is the categories thing")
  	db.category.findAll()
    .then(function(category) {
      res.render('/categories/show', { category: category });
    })
    .catch(function(error) {
      res.status(400).render('main/404');
    });
});

//GET for /categories/:id - show a specific category
//all the projects with that category

router.get('/:id', function(req, res) {

})

module.exports = router