$(document).ready(function(){
$(".delete-link").on("click", function(e){
		e.preventDefault(); //stops click
		var projectUrl = $(this).attr("href"); // get href delete link button
		console.log(projectUrl);
		

		$.ajax({
			type: "DELETE",
			url: projectUrl

		}).done(function(data){
			
			// window.location = "/";
			console.log('in done func')

			
			$(e.target).parent().parent().remove();
		}); // end ajax function


	});//end delete-link
});



// ajax changed