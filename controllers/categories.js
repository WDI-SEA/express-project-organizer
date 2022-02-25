let express = require('express')
const res = require('express/lib/response')
let db = require('../models')
let router = express.Router()

router.get('/', async (req, res) => {

    try {
        const viewCategories = await db.category.findAll()
        res.render('categories/view', { categories: viewCategories })

    } catch (error) {
        console.log('Error in GET /', error)
        res.status(400).render('main/404')
    }
})

router.get('/:id', async (req, res) => {

    try {
        const projectsCategory = await db.category.findAll({
            where: { id: req.params.id },
            include: [db.project]
        })
        console.log("WASSUP" + projectsCategory)
        // res.json(projectsCategory[0])
        res.render('categories/show', { catProj: projectsCategory[0] })

    } catch (error) {
        console.log('Error in GET /', error)
        res.status(400).render('main/404')
    }
})

module.exports = router
