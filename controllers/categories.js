// show a list of used categories

let express = require("express");
let db = require("../models");
let router = express.Router();



router.get("/", (req, res) => {

  db.category.findAll({
    include: [db.project]
  })
    .then(categories => {
      console.log(categories)
      res.render("categories/categories", { categories});
    })
    .catch((error) => {
      console.log("Error in GET /", error);
      res.status(400).render("main/404");
    });
});

router.get("/:id", (req, res) => {
  db.project
    .findOne({
      where: { id: req.params.id },
    })
    .then((project) => {
      if (!project) throw Error();
      res.render("projects/show", { project: project });
    })
    .catch((error) => {
      res.status(400).render("main/404");
    });
});




module.exports = router;