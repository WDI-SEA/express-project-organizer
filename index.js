const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const db = require('./models')
const rowdy = require('rowdy-logger')

const app = express()
const PORT = process.env.PORT || 3000
rowdy.begin(app)

app.set('view engine', 'ejs')
app.use(require('morgan')('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)

app.get('/', (req, res) => {
  db.project.findAll()
  .then((projects) => {
    res.render('main/index', { projects: projects })
  })
  .catch((error) => {
    console.log('Error in GET /', error)
    res.status(400).render('main/404')
  })
})

app.use('/projects', require('./controllers/projects'))

app.use('/categories', require('./controllers/categories'))



//lets just pretend that this is in a controller
// app.get('/categories/:id', async (req,res) => {
//   try{
//     //use to get req.params.id
//     const category = await db.category.findOne({
//       where: {
//         id: req.params.id
//       },
//       //imbed associated projects in this category
//       include: [db.project]
//     })
//     //way one to get all projects associated with category, or can use the imbed above
//     //const projects = await category.getProjects()
//     //console.log(projects)
//     // res.json(category) // dont need this
//     res.render('categories/detail.ejs', {category})
//   }  catch(error) {
//       console.log('Error in GET /', error)
//       // res.status(400).render('main/404')
//   }
// })

// //lets just pretend that this is in a controller
// app.get('/categories', async (req,res) => {
//   try{
//     const allCategories = await db.category.findAll()
//     //way one to get all projects associated with category, or can use the imbed above
//     //const projects = await category.getProjects()
//     //console.log(category)
//     //res.json(category) // dont need this
//     console.log(allCategories[0].id, allCategories[0].name)
//     res.render('categories/show.ejs', {allCategories})
//   }  catch(error) {
//       console.log('Error in GET /', error)
//   }
// })

app.get('*', (req, res) => {
  res.render('main/404')
})

app.listen(PORT, function() {
  rowdy.print()
  console.log(`listening on port: ${PORT}`)
})
