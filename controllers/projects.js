let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project


router.post("/", (req, res) => {
  db.category.findOrCreate({
    where: {
      name: req.body.category,
    },
  });

  db.project
    .create({
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployLink: req.body.deployedLink,
      description: req.body.description,
    })
    .then((project) => {
      res.redirect("/");
    })
    .catch((error) => {
      res.status(400).render("main/404");
    });
});



// router.post('/', (req, res) => {
//   console.log(req.body)
//     db.project.create({
//         name: req.body.name,
//         githubLink: req.body.githubLink,
//         deployLink: req.body.deployedLink,
//         description: req.body.description
//     })    
//     .then(createdProject =>{
//       console.log(`project herer: ${createdProject}`)
//       db.category.findOrCreate({
//         where: { 
//           category: req.body.categories
//         }
//       })
//       .then(category =>{
//         console.log(`cat here: ${category}`)    
//         createdProject.addCategory(category)
//         // console.log(`${category.category} added to ${project.name}`)
//         .then(()=>{
//           res.redirect("/");
//         })
//       })
//     })
//   .catch((error)=>{
//     res.status(400).render('main/404')
//   })
// })

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
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

module.exports = router
