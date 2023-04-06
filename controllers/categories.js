let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req,res) => {
    db.category.findAll()
    .then((categories) => {
        res.render('categories/index', {categories: categories})
    })
})

router.get('/:id', (req,res) => {
    try{ 
        db.category.findByPk(req.params.id, {
            include: [{
                model: db.project,
            }]
        })
            .then((projects) => {
                console.log(projects)
                res.render('categories/show', {
                    projects: projects.projects
                })
        })
    } catch(error) {
        console.log(error)
    }
})
module.exports = router