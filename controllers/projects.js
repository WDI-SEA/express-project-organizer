let express = require('express')
let db = require('../models')
let router = express.Router()
let async = require('async')
let methodOverride = require('method-override')

router.use(express.static('public'))
router.use(methodOverride('_method'))

// POST /projects - create a new project
router.post('/', (req, res) => {
  let categories = []

  if(req.body.categories) {
    categories = req.body.categories.split(',')
    // console.log(typeof(categories) + '🌷🌷🌷🌷🌷🌷')
  }
  
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(project => {
    console.log(project + '👻👻👻👻👻👻')
    if(categories.length){
      //create new category or categories
      console.log('looking for new categories 🌷🌷🌷🌷🌷🌷🌷🌷')
      async.forEach(categories, (c, done) => {
        db.category.findOrCreate({
          where: {name: c.trim()}
        })
        .then(([category, wasCreated]) => {
          //add category to project
          console.log(category + '🙂🙂🙂🙂🙂🙂🙂')
          console.log(wasCreated ? category + ' was created' : category + ' already exists')
          project.addCategory(category)
          .then(() => {
            done()
          })
          .catch(done)
        })
        .catch(done)
      }, () => {
        //once done, redirect to that project
        res.redirect('/projects/' + project.id)
      })
    } else {
      res.redirect('/projects/' + project.id)
    }
  })
  .catch((error) => {
    console.log(error, '⁉️⁉️⁉️⁉️⁉️⁉️⁉️')
    res.status(400).render('main/404')
  })
})

//POST - edit project
router.post('/:id', (req, res) => {
  let categories = []

  if(req.body.categories) {
    categories = req.body.categories.split(',')
    console.log(categories + '🌷🌷🌷🌷🌷🌷')
  }
  
  db.project.update({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployLink,
    description: req.body.description
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then(project => {
    console.log(project + '👻👻👻👻👻👻')
    if(categories.length){
      //find or create new categories
      console.log('🌷🌷🌷find or create new categories 🌷🌷🌷')
      async.forEach(categories, (c, done) => {
        db.category.findOrCreate({
          where: {name: c.trim()}
        })
        .then(([category, wasCreated]) => {
          //add category to project
          console.log(category + '🙂🙂🙂🙂🙂🙂🙂')
          console.log(wasCreated ? category + 'was created' : category + 'already exists')
          project.addCategory(category)
          .then(() => {
            done()
          })
          .catch(done)
        })//end of findorcreate.then
        .catch(done)
      }, () => {
        //once done, redirect to that project
        console.log(project.id + '🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳')
        res.redirect('/projects/' + req.params.id)
      })//end of async function
    } else {
      console.log(project.id + '🐳🐳🐳🐳🐳🐳🐳🐳🐳🐳')
      res.redirect('/projects/' + req.params.id)
    }

  })
  .catch(err => {
    console.log(err)
    res.render('404')
  })
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
    if (!project) throw Error()
    res.render('projects/show', { project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

//DELETE PROJECTS
router.delete('/:id', (req, res) => {
  db.project.destroy({
    where: {id: req.params.id}
  })
  .then(project => {
    //if project has categories - check projectId
    //look at categories, see if exist with other projects
      //if don't exist with other projects, destroy
      //else - dont do anything
    res.redirect('/')
  })
})

module.exports = router
