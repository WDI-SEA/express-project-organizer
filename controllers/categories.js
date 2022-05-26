let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', async function(req, res) {
    res.send('categories should be here')
})


module.exports = router