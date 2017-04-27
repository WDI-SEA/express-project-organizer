var express = require('express');
var db = require('../models');
var router = express.Router();

router.post("/", function(req, res) {
    db.category.create({
        name: req.body.name,
    }).then(function(newCategory) {
        var project = [];
        if (req.body.categories) {
            categories = req.body.categories.split(",");
        }
        if (categories.length > 0) {
            async.forEachSeries(categories, function(s, callback) {
                db.category.findOrCreate({
                    where: { name: s.trim() }
                }).spread(function(category, wasCreated) {
                    newCategory.addCategory(category);
                    callback();
                });
            }, function() {
                res.redirect("/categories");
            });
        } else {
            res.redirect("/categories");
        }
    }).catch(function(error) {
        res.send(error);
    });
});
