const express = require('express')
let router = require('express').Router()
let db = require('../models')

// GET /categories -- show all categories (along with associated projects)
router.get('/', async (req, res) => {
    try {
        // find all categories and include their projects
        const categories = await db.category.findAll({
            include: [db.project]
        })
        // render a view that shouws the categories
        res.render('categories/index.ejs', {
            categories
        })
    } catch(err) {
        console.log(err)
        res.send('err')
    }
})

module.exports = router