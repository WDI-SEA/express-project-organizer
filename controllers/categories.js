let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req, res) => {
    db.category.findAll({
        include: [db.project]
    }).then(categories => {
        res.render('categories/index.ejs', {categories: categories})
    }).catch(error => {
        res.status(400).render('main/404')
    })
})

router.get('/:id', (req, res) => {
    db.category.findOne({
        where: {id: req.params.id}
    }).then(category => {
        category.getProjects().then(projects => {
            console.log(projects)
            res.render('categories/show.ejs', {category: category, projects: projects})
        })
    })
})

module.exports = router
