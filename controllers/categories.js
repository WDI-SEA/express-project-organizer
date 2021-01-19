let express = require('express')
let db = require('../models')
let router = express.Router()


// GET /categories - all categories
router.get('/', (req, res) => {
    db.category.findAll()
    .then((categories) => {
      res.render('categories/index', { categories: categories})
    })
    .catch((error) => {
      console.log('Error in GET /', error)
      res.status(400).render('main/404')
    })
  })
  
  
  // GET /categories/:id - display a specific category
  router.get('/:id', (req, res) => {
    db.category.findOne({
      where: { id: req.params.id }
    })
    .then((category) => {
        if (!category) throw Error()
        category.getProjects().then(projects =>{
            res.render('categories/show', {category:category, projects:projects})
        })  
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
  })

  router.delete("/:id", (req,res)=>{
      db.category.destroy({
          where:{id: req.params.id}
      })
      .then(rowsDeleted =>{
          res.redirect('/categories')
      })
    })



module.exports = router


