$(document).ready(function(){
   $('#delete-project').click(function(e){
     e.preventDefault();
     $.ajax({
       url: $(this).attr('href'),
       method: "DELETE"
     }).success(function(data){
       window.location.href = "/"
     });
  });
 
 //Delete category
   $('#delete-category').click(function(e){
     e.preventDefault();
     $.ajax({
       url: $(this).attr('href'),
       method: 'DELETE'
     }).success(function(data){
       window.location.href = "/categories"
     });
   });
 
 });