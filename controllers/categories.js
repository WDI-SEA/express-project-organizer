let express = require("express")
let db = require("../models")
let router = express.Router()
const chalk = require("chalk")

router.get("/", async (req, res) => {
  try {
    const categories = await db.category.findAll()
    
    res.render("categories/index", { categories })
  } catch (error) {
    console.error(chalk.red('🔥 Error in route GET /categories ::', error))
  }

})

router.get("/:id", async (req, res) => {
  try {
    const category = await db.category.findOne({
      where: {id: req.params.id},
      include: db.project 
    })
    console.log(chalk.green('Category:', category.dataValues.name))
    res.render('categories/show', {category})
  } catch (error) {
    console.error(chalk.red('🔥 Error in route GET /categories/:id ::', error))
  }
})

module.exports = router
