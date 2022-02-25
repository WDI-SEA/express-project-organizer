let express = require("express");
let db = require("../models");
let router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await db.category.findAll()
    res.render('categories/index.ejs', { category: categories})
  } catch (error) {
    console.log(error)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const findCategory = await db.category.findOne({
      where: {
        id: req.params.id
      },
      include: [db.project]
    })
    res.render('categories/show.ejs', { cat: findCategory})
    console.log(findCategory)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
