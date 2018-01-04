var express = require('express');
var async = require('async');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
  // res.send('get all tags route');
  db.category.findAll().then(function(categories){
    res.render('categories/all', {categories: categories});
  });
});

router.get('/:id', function(req, res){
  // res.send('just one tag route');
  db.category.findOne({
    where: {id: req.params.id},
    include: [db.project, db.category]
  }).then(function(category){
    res.render('categories/single', {category: category});
  });
});

// router.delete('/:id', function(req, res){
//   // res.send('delete tag route');
//   db.category.findOne({
//     where: {id: req.params.id},
//     include: [db.project]
//   }).then(function(category){
//     async.forEach(category.projects, function(a, callback){
//       category.removeArticle(a);
//       callback(null);
//     }, function(){
//       //Runs when all done
//       db.category.destroy({
//         where: {id: req.params.id}
//       }).then(function(deletedItem){
//         res.send('all good');
//       }); //end of destroy
//     }); //end of async.forEach
//   }); //end of findOne
// });

module.exports = router;
