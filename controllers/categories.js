var express = require('express');
var db = require('../models');
var router = express.Router();

router.get("/show", function(req, res) {
    db.category.findAll().then(function(categories) {
        res.render("categories/show", { categories: categories });
    });
});

// router.get('/categories/show', function(req, res) {
//     db.category.findAll()
//         .then(function(projects) {
//             res.render('/categories/show', { categories: categories });
//         })
//         .catch(function(error) {
//             res.status(400).render('main/404');
//         });
// });


// GET /category/:id - display a specific project
router.get('/:id', function(req, res) {
    db.category.find({
            where: { id: req.params.id },
            include: [db.project]
        })
        .then(function(category) {
            if (!category) throw Error();
            res.render('categories/indiv', { category: category });
        })
        .catch(function(error) {
            res.status(400).render('main/404');
        });
});

module.exports = router;
