$(document).ready(function(){
  console.log("DOM ready");

  $(".delete-link").click(function(e){
    e.preventDefault();
    var projectElement = $(this);
    var projectUrl = projectElement.attr('href');
    $.ajax({
      method: 'DELETE',
      url: projectUrl,
    }).done(function(data){
      projectElement.remove();
      window.location = "/";
    });
  });

  $(".put-form").on("submit", function(e){
    e.preventDefault();
    var projectElement = $(this);
    var projectUrl = projectElement.attr('action');
    var projectData = projectElement.serialize();
    $.ajax({
      method: "PUT",
      url: projectUrl,
      data: projectData,
    }).done(function(data){
      projectElement.remove();
      window.location = "/";
    });
  });

});
