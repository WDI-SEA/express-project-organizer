var express = require('express');
var db = require('../models');
var async = require('async');
var router = express.Router();

// POST /projects - create a new project

router.post('/', function(req, res) {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(project) {
     //?? how to re-use existing route???
     let catList = req.body.cat.split(",");
     if (catList.length===0 || catList[0]=="") {
       res.redirect("/projects/"+project.id);
       return null;
     };

     //-- add in each tag
     async.forEach(catList, function(item, callback){
      //Add the tag to the tag table

      db.category.findOrCreate({
         where: {name: item.trim()}
     }).spread(function(cat, wasCreated){
         if(cat){
            //console.log("create",cat);
          //This part is what adds the relationship in the join table
          project.addCategory(cat);
         }
         //Calling this function is like saying this is all done
         callback(null);
      })
   }, function(err) {
      //Happens when ALL the calls have been resolved
      res.redirect("/projects/"+project.id);
   });

  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});


router.post("/:id/category", function(req,res) {

   db.project.find({
      where: {id: req.params.id},
      include: [db.category]
   }).then(function(project) {

      let catList = req.body.cat.split(",");
      if (catList.length===0 || catList[0]=="") {
         res.redirect("/projects/"+project.id);
         return null;
      };

      //-- add in each tag
      async.forEach(catList, function(item, callback){
        //Add the tag to the tag table

        db.category.findOrCreate({
          where: {name: item.trim()}
       }).spread(function(cat, wasCreated){
          if(cat){
             //console.log("create",cat);
            //This part is what adds the relationship in the join table
            project.addCategory(cat).then( function(c) {
               if(cat.name===catList[catList.length-1]) {
                  res.redirect("/projects/"+project.id);
               }
            });
          }
          //Calling this function is like saying this is all done
          callback(null);
        })
     }, function(err) {
        //Happens when ALL the calls have been resolved
        //--no, not really
        res.redirect("/projects/"+project.id);
     });

   }).catch(function(err) {
      res.status(500).send("db error",err);
   });
});


// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  res.render('projects/new');
});

// GET /projects/:id - display a specific project
router.get('/:id', function(req, res) {
  db.project.find({
    where: { id: req.params.id },
    include: [db.category]
  })
  .then(function(project) {
    if (!project) throw Error();
    res.render('projects/show', { project: project });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
