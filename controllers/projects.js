let express = require('express')
let db = require('../models')
let router = express.Router()
let async = require('async')
let methodOverride = require('method-override')

router.use(express.static('public'))
router.use(methodOverride('_method'))

// POST /projects - create a new project
router.post('/', (req, res) => {
  //need to first check if there are existing categories?
  
  let categories = typeof req.body.existing_categories === 'string' ? [req.body.existing_categories] : req.body.existing_categories
    //above says if existing_categories comes back as a string(how data comes back if there is only one), force it into an array; otherwise, if there are multiple it will come back an array so keep as is
 
  if(req.body.categories) {
    // categories = req.body.categories.split(',')
    categories = categories.concat(req.body.categories.split(','))
    // console.log(typeof(categories) + '🌷🌷🌷🌷🌷🌷')
  }

  // res.send(categories)
  
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
            done() //since things are happening out of order, function compares number of requests put out to the number of times callbac function is called to confirm the overall loop function is complete
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
  .then(updated => {
    db.project.findByPk(req.params.id)
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
  })
  .catch(err => {
    console.log(err)
    res.render('main/404')
  })
})

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  db.category.findAll()
  .then(categories => {
    res.render('projects/new', {categories})
  })
  .catch(err => {
    console.log(err)
    res.status(400).render('main/404')
  })
  
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
  //first, find the project we want to delete, and get its associated categories from the database 
  db.project.findOne({
    where: {
      id: req.params.id
    },
    include: [db.category]
  })
  .then(project => {
    //store the project's categories in a variable and destroy that project from the database
    console.log(project + '🐳🐳🐳🐳🐳🐳🐳')
    let cats = project.categories
  
    db.project.destroy({
      where: {id: req.params.id}
    })
    .then(project => {
      if(cats.length) {
        async.forEach(cats, (c, done) => {
          db.category.findByPk(c.id)
          .then(category => {
            category.getProjects()
            .then(projects => {
              console.log('🍩🍩🍩🍩🍩' + projects + '🍩🍩🍩🍩🍩')
              //if category does not have other projects, destroy
              if(!projects.length) {
                console.log('🌷🌷 id for', category.name, ':', category.id, '🌷🌷 HAS NO OTHER PROJECT')
                db.category.destroy({
                  where: {id: category.id}
                })
                .then(destroyed => {
                  console.log('🚗🚗🚗 DESTROYED', destroyed, 'rows')
                  done()
                })
                .catch(err => {
                  console.log(err)
                })
              } else { //end of if !projects
                console.log('👻👻👻', category.name, 'has other projects 👻👻👻')
                done()
              }
            }).catch(done)
          }).catch(done)
        }, () => {
          //at end of foreach loop...
          console.log('🥁🥁🥁end of loop 🥁🥁🥁')
          res.redirect('/')
        })//end of foreach
        }//end of if cats.length
        })
      })
    //   //else - dont do anything
    // res.redirect('/')
  // })
// })
})

module.exports = router
