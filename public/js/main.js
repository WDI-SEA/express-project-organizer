$(document).ready(function() {

	$('.delete-category').on('click', function(e) {
		//stops the GET method from an anchor element
		e.preventDefault();

		$.ajax({
			url: $(this).attr('href'),
			method: "DELETE"
		}).done(function(data) {
			location.reload();
		});
	});

	$('.edit-category').submit(function(e) {
		console.log('submit');
		e.preventDefault();
		$.ajax({
			url: $(this).attr('action'),
			method: "PUT",
			data: {
				name: $('#name').val()
			}
		}).done(function(data) {
			window.location.href = '/categories';
		});
	});
});