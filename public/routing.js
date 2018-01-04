console.log("hello from routing");

$(".delete-link").click(function(e){
	e.preventDefault();
	$.ajax({
		url: $(this).attr("href"),
		method: "DELETE"
	}).done(function(data){
		window.location.href = "/"
	});
});

$(".delete-cat").click(function(e){
	e.preventDefault();
	$.ajax({
		url: $(this).attr("href"),
		method: "DELETE"
	}).done(function(data){
		window.location.href = "/categories/all"
	});
});

