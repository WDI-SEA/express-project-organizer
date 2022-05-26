let express = require("express");
let db = require("../models");
let router = express.Router();

router.get("/", async (req, res) => {
  const showC = await db.category.findAll();
  console.log(showC);
  res.render("categories/index", { showC: showC });
});
router.get("/:id", async (req, res) => {
  const showCs = await db.category.findAll({
    where: {
      id: req.params.id,
    },
  });
  const showPs = await db.categoriesProjects.findAll({
    where: {
      categoryId: req.params.id,
    },
  });
  const showPx = showPs.projectId;
  const showX = await db.projects.findAll({
    where: {
      id: showPx,
    },
  });

  console.log(showPx);
  //   console.log(showCs);
  res.render("categories/id", { showCs: showCs, showX: showX });
});

module.exports = router;
