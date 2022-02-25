let router = require('express').Router()
let db = require('../models')

router.get('/', (req, res) => {
  db.category.findAll({
    include: [db.project]
  })
  .then(categories => {
    res.render('categories/index', { categories })
  })
  .catch(err => {
    console.log('Error', err)
    res.render('main/404')
  })
})

router.get('/:id', (req, res) => {
  db.category.findOne({
    where: { id: req.params.id },
    include: [db.project]
  })
  .then(category => {
    res.render('categories/show', { category })
  })
  .catch(err => {
    console.log('Error', err)
    res.render('main/404')
  })
})

router.delete('/:id', (req, res) => {
  // Delete from the join table
  db.categoriesProjects.destroy({
    where: { categoryId: req.params.id }
  })
  .then(() => {
    // Now I am free to delete the category itself
    db.category.destroy({
      where: { id: req.params.id }
    })
    .then(destroyedCategory => {
      res.redirect('/categories')
    })
    .catch(err => {
      console.log('Oh no what happened', err)
      res.render('main/404')
    })
  })
  .catch(err => {
    console.log('Oh no what happened', err)
    res.render('main/404')
  })


})

module.exports = router