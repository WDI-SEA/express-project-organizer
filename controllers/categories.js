var express = require('express');
var db = require('../models');
var router = express.Router();
// /////////////////////////////

router.get('/', function(req, res) {
  db.category.findAll().then(function(list) {
    // res.send(list);
    res.render('categories/categories', { list: list });
  }).catch(function(error) {
    res.send('categories error');
  });
});

router.get('/:id', function(req, res) {
  // res.send("category deets");
  db.category.find({
    where: { id: req.params.id },
    include: [db.project]
  }).then(function(list) {
    // res.send(list);
    res.render('categories/cShow.ejs', { list: list });
  });
});

// ////////////////////////////
module.exports = router;
