$(document).ready(function() {
  $('#deleteProject').on(function(click) {
    db.project.destroy({
      where: { name: $(this).name }
    }).then(function() {
      res.redirect('/');
    });
  });
});
