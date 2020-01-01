let express = require('express');
let db = require('../models');
let router = express.Router();
let methodOverride = require('method-override')

router.use(methodOverride('_method'))


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

//ATTEMPTING TO MAKE DELETE ROUTE

router.delete('/:id', (req, res) => {
    db.category.destroy({
        where: { id: req.params.id }
    })
    res.redirect('/')
})

module.exports = router