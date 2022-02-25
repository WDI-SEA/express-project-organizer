// show a list of used categories

let express = require("express");
let db = require("../models");
let router = express.Router();



router.get("/", (req, res) => {

  db.category.findAll({
    include: [db.project]
  })
    .then(categories => {
      // console.log(categories)
      res.render("categories/categories", { categories});
    })
    .catch((error) => {
      console.log("Error in GET /", error);
      res.status(400).render("main/404");
    });
});

router.get("/:id", (req, res) => {
  db.category
    .findOne({
      where: { id: req.params.id },
      include:[db.project]
    })
    .then(category => {
      res.render("categories/show", { category });
    })
    console.log(category)
    .catch((error) => {
      res.status(400).render("main/404");
    });
});




module.exports = router;