let express = require('express')
let moment = require('moment')
let ejsLayouts = require('express-ejs-layouts')
let db = require('./models')
let rowdy = require('rowdy-logger')
let app = express()

rowdy.begin(app)

app.use(function(req, res, next) {
  res.locals.moment = moment
  next()
})

app.use(express.static(__dirname + '/public/'))

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

app.get('*', (req, res) => { //used to get error on all non-useful urls
  res.render('main/404')
})

let server = app.listen(process.env.PORT || 3000, function() {
  rowdy.print() //print all the routes
})

module.exports = server
