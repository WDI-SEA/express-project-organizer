var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require('async');



// POST /projects - create a new project
router.post('/', function(req, res) {
    db.project.create({
            name: req.body.name,
            githubLink: req.body.githubLink,
            deployedLink: req.body.deployedLink,
            description: req.body.description
        })
        .then(function(project) {
    var categories = [];
    if (req.body.categories) {
        categories = req.body.categories.split(',');
    }

            if (categories.length > 0) {
                async.forEachSeries(categories, function(category, cb) {
                    db.category.findOrCreate({
                        where: { name: category.trim() }
                    }).spread(function(newCategory, wasCreated) {
                        if (newCategory) {
                            project.addCategory(newCategory);
                        }
                        cb();
                    });
                }, function() {
                    res.redirect('/');
                });
            } else {
                res.redirect('/');
            }
        }).catch(function(error) {
            res.status(400).render('main/404');
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
        });
});


router.put('/:id', function(req, res) {

    res.send({ message: 'successful update' });
    db.project.update({
        name: req.body.name,
        githubLink: req.body.githubLink,
        deployedLink: req.body.deployedLink,
        description: req.body.description,
    }, {
        where: { id: req.params.id }
    }).then(function(projectUpdated) {
        res.send({ message: 'successful update' });
    });
});



module.exports = router;
