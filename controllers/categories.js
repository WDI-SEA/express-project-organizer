let express = require('express')
let db = require('../models')
let router = express.Router()


//GET /categories -index - show all the categories!
router.get('/', function(req, res) {
    db.category.findAll().then(function(categories) {
        res.render('categories/index', {categories});
    });
});


//POST /categories - post them
router.post('/', function(req, res){
    db.project.findByPk(parseInt(req.body.projectId)).then(function(project) {
        db.category.findOrCreate({
            where: {
                name: req.body.category
            }
        }).spread(function(category, created) {
            project.addCategory(category).then(function(category) {
                console.log(`${category} added to ${project}`)
                res.redirect('/projects/' + req.body.projectId);
            })
        })
    })
})


//GET /categories/:id - show one categories and its associated projects
router.get('/:id', function(req, res){
    db.category.findOne({
        where: {id: parseInt(req.params.id)},
        include: [db.project]
    }).then(function(category){
            res.render('category/show', {category});
        });
});
module.exports = router;