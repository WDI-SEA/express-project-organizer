var express = require('express');
var db = require('../models');
var router = express.Router();

router.get("/", function(req, res) {
   db.category.findAll().then(
      function(category) {
         res.render("category/all", {category: category});
      }
   );
});

router.get("/:id", function(req,res) {
   console.log(222);
   db.category.findOne({
      where: {name: req.params.id},
      include: [db.project]
   }).then(
         function(result) {
            //console.log(JSON.stringify(result));
            res.render("category/single", {result:result});
         }
      )
});

module.exports = router;
