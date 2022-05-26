let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', async (req, res) => {
    try {
        const categories = await db.category.findAll()
        res.render('categories/show', {categories})
    } catch (err) {
        console.log('FIRE2', err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const category = await db.category.findOne({
            where: {id: req.params.id,}, 
            include: [db.project]
        })
        const projects = category.projects
        res.render('categories/related', {category, projects})
    } catch (err) {
        console.log('FIRE3', err)
    }
})

module.exports = router