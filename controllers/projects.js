let express = require('express')
let db = require('../models')
let router = express.Router()
let async = require('async')
// POST /projects - create a new project
router.post('/', (req, res) => {
  let categories = []
  if(req.body.categoryName){
    categories = req.body.categoryName.split(',')
  }
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  })
  .then((project) => {
    async.forEach(categories, (category, done) => {
      db.category.findOrCreate({  where: {name: category.trim()}
      })
      .then(([category, wasCreated]) => {
        project.addCategory(category)
        .then(() => {
         done()
        })
        .catch((error) => {
          console.log(error)
          done()
          //res.status(400).render('main/404')
        })
      })
      .catch((error) => {
        console.log(error)
        done()
        res.status(400).render('main/404')
      })
    },
    () => {
      res.redirect('/')
    }) //end of async function
  }) // end of then for the project create
})
// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
})
// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id },
    include: [db.category]
  })
  .then((project) => {
    console.log(project.categories)
    if (!project) throw Error()
    res.render('projects/show', { project })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

router.delete('/:id', (req, res) => {
  console.log('This is the request id', req.params.id)
  db.project.destroy({
    where: { id: req.params.id}
  })
  .then(() => {
      res.redirect('main/index')
    })
    .catch((error) => {
      console.log(error)
      res.status(400).render('main/404')
    })
})

router.put('/:id', (req, res) => {
  db.project.update(
    req.body,
    { where: { id: req.params.id},
      include: [db.category]
  }
  )
  .then(() => {
    res.redirect('/projects/' + req.params.id)
  })
  .catch(err => {
    console.log('Error in edit route', err)
    res.render('error')
  })
})

router.get('/:id/edit', (req, res) => {
  db.category.findAll()
  .then(categories => {
    db.project.findOne({
      where: { id: req.params.id }
    })
    .then(project => {

      res.render('projects/edit', { categories, project })
    })
    .catch((error) => {
      console.log(error)
      res.status(400).render('main/404')
    })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

module.exports = router

