let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
router.post('/', (req, res) => {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  })
  .then((project) => {
    let str = req.body.categoryName
    str = str.split(",") 
    console.log(str)
    for(let i=0; i<str.length; i++){
      db.category.findOrCreate({
        where: {
          name: str[i]
        }
      }).then(([category, created]) => {
        project.addCategory(category)
        .then(relationInfo =>{
           console.log("Project-Category relation created")
        })  
      })
    }
    res.redirect('/')
    })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})


// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
})

// GET / - display a specific project
router.get('/edit/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id },
    include: [db.category]
  }).then((project) => {
    project.getCategories().then(categories =>{
      console.log(project)
      res.render('projects/edit', { project:project})
    })     
  }).catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id }
  })
  .then((project) => {
    if (!project) throw Error()
    res.render('projects/show', { project: project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

router.delete("/:id", (req,res)=>{
  db.project.destroy({
      where:{id: req.params.id}
  })
  .then(rowsDeleted =>{
      console.log(rowsDeleted)
      res.redirect('/')
  })
})

// To edit a specific project
router.put("/:id", (req,res)=>{
  // Start by finding the project
  db.project.findOne({
    where: {id: req.params.id},
    include: [db.category]    
  }).then(project =>{
    db.project.update(
      {
        name: req.body.name,
        githubLink: req.body.githubLink,
        deployLink: req.body.deployedLink,
        description: req.body.description
      },
      {where: {id: req.params.id}}
    ).then(()=>{
      let str = req.body.categoryName.split(',')
      str.forEach(s =>{
        db.category.findOrCreate({
          where: {
            name: s.trim()
          }
        }).then(([category, created]) => {
          project.addCategory(category).then(relationInfo =>{
             console.log("Project-Category relation created")
          })  
        })
      })
      res.redirect(`/projects/${req.params.id}`)
    })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})
})

module.exports = router
