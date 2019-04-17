let express = require('express')
let ejsLayouts = require('express-ejs-layouts')
let db = require('./models')
let rowdy = require('rowdy-logger')
let app = express()

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

app.get('*', (req, res) => {
  res.render('main/404')
})

let server = app.listen(process.env.PORT || 3000, function() {
  rowdy.print()
})

module.exports = server
