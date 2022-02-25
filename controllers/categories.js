let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', async (req, res) => {
    // res.send('hello')
    try {
        const foundCategories = await db.category.findAll({}) // findAll gives us an array
        res.render('./categories/index.ejs', {categoryArray: foundCategories})
    } catch (error) {
        console.log(error)
    }
  })

router.get('/:id', async (req, res) => {
    try {
        const selectedCategory = await db.category.findOne({ // gives us just one object
            where: {
                id: req.params.id
            },
            include: [db.project]
        })
        res.render('./categories/show.ejs' , {categoryObject: selectedCategory})
        console.log(selectedCategory)

    } catch (error) {
        console.log(error)
    }
})

module.exports = router