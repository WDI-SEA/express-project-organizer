$(document).ready(function() {
	console.log('DOC READY');

	$('.delete-btn').click(function(e) {
		console.log('DEELLLLEEETTTEE');
		e.preventDefault();
		url = $(this).attr('href');
		$.ajax({
			method: 'DELETE',
			url: url
		}).done(function(data) {
			window.location = '/';
		});
	});
});