let express = require('express')

let router = express.Router()
let async = require('async')
let db = require('../models')


// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
})


// POST /projects - create a new project
router.post('/', (req, res) => {
  let categories = []
  if(req.body.categories){
    categories = req.body.categories.split(',')
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

router.get('/:id/edit',(req,res)=>{

  db.project.findOne({
    where: { id: req.params.id },
    include: [ db.category]
  })
  .then((project) => {
    if (!project) throw Error()
    res.render('projects/edit', { project: project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
  
})
/*
router.put('/:id/edit',(req,res)=>{
  console.log("put route",req.body,req.params.id)
  let categories = []
  if(req.body.categories){
    categories = req.body.categories.split(',')
  }
    db.project.update({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
    }, {
    where: {
      id: req.params.id
    }
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
          console.log('error in project.add category',error)
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
      res.redirect('/projects/'+req.params.id)
    }) //end of async function
  }) // end of then for the project create
  //res.render('projects/show', { project: project })
})
*/

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id },
    include: [ db.category]
  })
  .then((project) => {
    if (!project) throw Error()
    res.render('projects/show', { project: project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// The commented out code is functionality without async of post request
// it only allows only one category to be added
/*
 router.post('/', (req, res) => {
  db.project.findOrCreate({
    where: {
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployLink: req.body.deployedLink,
      description: req.body.description
    }
  }).then(([project, created])=> {
    // Second, get a reference to a tag.
      db.category.findOrCreate({
        where: {name: req.body.categories}
      })
      .then(([category, created])=> {
        // Finally, use the "addModel" method to attach one model to another model.
            console.log("category added")
            project.addCategory(category)
            .then(function(category) {
            console.log(" category added to project");
            })
            .catch((error) => {
              console.log("error",error)
             // res.status(400).render('main/404')
            })
        res.send("post route")
      })
      .catch((error) => {
        console.log("error",error)
       // res.status(400).render('main/404')
      })
  })
  .catch((error) => {
    console.log("error",error)
    res.status(400).render('main/404')
  })
})
*/

module.exports = router
