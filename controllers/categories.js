let express = require('express')
let db = require('../models')
let router = express.Router()

// Route to get all categories and projects
router.get('/', (req, res) => {
  db.category.findAll({
        include: [db.project]
    }).then(categories => {
        categories.forEach(category => {
            
        })
        console.log(categories)
        res.render('categories/index', {categories: categories})
    }).catch((error) => {
        res.status(400).render('main/404')
      })
})

// Route to get one category and all associated projects
router.get('/:name', (req, res) => {
    console.log(req.params.name)
    db.category.findOne({
        where: {name: req.params.name}
    }).then(category => {
        category.getProjects().then(projects => {
            console.log(category)
            console.log(projects)
            res.render('categories/show', {category: category, projects: projects})
        })
    })
})

module.exports = router
