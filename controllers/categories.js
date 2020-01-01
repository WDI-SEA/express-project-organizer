let express = require('express');
let db = require('../models');
let router = express.Router();

router.get('/', (req, res) => {
    db.category.findAll()
    .then((categories) => {
        // res.send(categories);
        res.render('categories/index', { categories })
    })
    .catch((error) => {
        res.status(400).render('main/404')
    })
})

router.get('/:id', (req, res) => {
    console.log(req.params.id)
    db.category.findOne({
        where: { id: req.params.id },
        include: [db.project]
    })
    .then(category => {
        db.project.findAll()
        .then(projects => {
            res.render('categories/show', { category, projects })
        })
    })
    .catch(err => console.log(err))
})

module.exports = router