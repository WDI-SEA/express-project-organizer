const express = require('express')
const db = require('../models')
const router = express.Router()

router.get('/', async (req, res)=>{
    try {
        const readCategories = await db.category.findAll()
        res.render('./categories/index.ejs', {readCategories})
    } catch (err) {
        console.log('error', err)
    }
})

router.get('/:id', async (req, res)=> {
    try {
        const displayCategory = await db.category.findOne({
            where: { id: req.params.id },
            include: [db.project]
        })
        console.log(displayCategory)
        res.render('./categories/show.ejs', {displayCategory})
    } catch (error) {
        console.log('there is an error', error)
    }
})

module.exports = router