let express = require("express");
let db = require("../models");
let router = express.Router();

router.get('/',async (req, res) => {
    const categories = await db.category.findAll()
    res.render('categories/show.ejs', {categories})
})

router.get('/:id', async (req,res) => {
    const category = await db.category.findOne()
    res.render('categories/show.ejs', {category})
})

module.exports = router;