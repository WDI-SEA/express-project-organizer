let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
// router.post("/", async (req, res) => {
//   db.project
//     .findOrCreate({
//       where: {
//         name: req.body.name,
//         githubLink: req.body.githubLink,
//         deployLink: req.body.deployLink,
//         description: req.body.description,
//       },
//     })
//     .then(([project, created]) => {
//       let categoryName = req.body.category.toLowerCase();
//       // console.log(categoryName)
//       db.category.findOrCreate({
//         where: { name: categoryName },
//       });
//     })
//     .then((project) => {
//       res.redirect("/");
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(400).render("main/404");
//     });
// });


// POST /projects - create a new project✅
router.post('/', async (req, res) => {
  try {
    const project = await db.project.create ({
        name: req.body.name,
        githubLink: req.body.githubLink,
        deployLink: req.body.deployedLink,
        description: req.body.description
     
    })
    //find or create proj
    const [ category, created] = await db.category.findOrcreate({
      where: {
        name: req.body.category
      }
    })
    //find or create category
    //await category.addProject(project)
    res.redirect('/')
  } catch (err){
    console.log(err)
    res.status(400).render('main/404')
  }
 
  // .then((project) => {
  //   res.redirect('/')
  // })
  // .catch((error) => {
  //   res.status(400).render('main/404')
  // })
})


// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
})


// GET /projects/:id - display a specific project
router.get('/:id', (req, res)  => {
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
