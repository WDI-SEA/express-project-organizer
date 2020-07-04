const express = require('express')
const router = express.Router()
const db = require('../models')

router.use(express.static('public'))

// GET  /categories -- displays categories
router.get('/', (req, res) => {
    db.category.findAll({
        include: [db.project]
    })
    .then(categories => {
        res.render('categories/index', {categories})
    })
    .catch(err => {
        console.log(err)
        res.render('main/404')
    })
})


// GET /categories/:id -- displays all projects under 1 category
router.get('/:id', (req, res) => {
    db.category.findOne({
        where: {id: req.params.id},
        include: [db.project]
    })
    .then(category => {
        res.render('categories/show', {category})
    })
    .catch(err => {
        console.log(err)
        res.render('main/404')
    })
})


//DELETE
router.delete('/:id', (req, res) => {
    // res.send('Delete a category')

    //onDelete cascade not working - first look up the category, and destroy association in table
    db.categories_projects.destroy({
        where: {categoryId: req.params.id}
    })
    .then(()=> {
        db.category.destroy({
            where: {id: req.params.id}
        })
        .then(destroyedCategory => {
            res.redirect('/categories')
        })
    })
    .catch(err => {
        console.log(err)
        res.render('main/404')
    })

})

module.exports = router