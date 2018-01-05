var express = require('express');
var async = require('async');
var router = express.Router();
var db = require('../models');

router.post('/', function(req, res) {
  console.log()
  db.project.create(req.body).then(function(createdProject){
    //new code
    if(!req.body.categories){
      console.log("no categories added");
      res.redirect('/projects/'+createdProject.id);
    }
    else {
      //Will need to make a hook to avoid adding empty tags,
      //but this will trim the whitespace around each tag,
      //and put them into an array called categories
      var categories = req.body.categories.split(',');
      //removes any whitespace elements from the array
      categories = categories.filter(function(category) { return /\S/.test(category); });
      categories.forEach(function(item, index, arr){
        arr[index] = item.trim();
      });
      //add categories to table
      async.forEach(categories, function(c, callback){
        db.category.findOrCreate({
          where: {name: c}
        })//end of findOrCreate
        .spread(function(cat, wasCreated){
          if(cat){
            createdProject.addCategory(cat);
          }//end of if(cat){
          //calling callback(null) is saying everything is done
          callback(null);
        })//end of spread(function(cat, wasCreated){
      },
      //Third argument of the async.forEach()
      //happens when ALL the calls have been resovled
      function(){ 
        res.redirect('/projects/'+createdProject.id);
      });//end of async.forEach(
    }//end of else
    //end of new code
  })//end of db.project.create(req.body)
  .catch(function(err){
    console.log('err', err);
    res.send('uh oh!');
  }); //end of catch
});//end of route

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
