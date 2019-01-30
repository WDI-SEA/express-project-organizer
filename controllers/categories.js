var express = require('express');
var router = express.Router();
var db = require('../models')

// categories main page route
router.get('/', (req, res)=>{
    db.category.findAll()
    .then((results)=>{
        res.render('categories/show', { categories: results });
    })
    .catch((error)=>{
        console.log('ERROR', error);
        res.send('Check your error logs')
    })
})

module.exports = router;