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
    }).then(function(newProject) {
        var categories = [];
        if (req.body.categories) {
            categories = req.body.categories.split(",");
        }

        if (categories.length > 0) {
            async.forEachSeries(categories, function(c, callback) {
                    db.category.findOrCreate({
                        where: {
                            name: c.trim()
                        }
                    }).spread(function(category, wasCreate) {
                        newProject.addCategory(category);
                        callback();
                    });
                },
                function() {
                    res.redirect("/");
                });
        } else {
            res.redirect("/");
        }
    }).catch(function(error) {
        res.send(error);
    });
});

// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
    res.render('projects/new');
});

// GET /projects/:id - display a specific project
router.get('/:id', function(req, res) {
    db.project.findOne({
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
