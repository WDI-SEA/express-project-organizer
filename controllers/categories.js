var express = require('express');
var db = require('../models');
var bodyParser = require('body-Parser')
var router = express.Router();
var async = require ('async');

router.get('/', function(req, res){
  db.category.findAll().then(function(categories) {
    res.render('categories/index', {categories: categories});
    }).catch(function(error) {
      res.status(400).render('main/404');
  });
});
router.get('/:id', function(req, res) {
  db.category.findOne({
    where: {id: req.params.id},
    include: [db.project]
  }).then(function(category){
    res.render('categories/show', {projects: projects, category: category});
    }).catch(function(error) {
      res.status(400).render('main/404');
    });
});
module.exports = router;
