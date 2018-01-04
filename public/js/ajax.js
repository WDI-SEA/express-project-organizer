console.log('hello js');

$('#delete-project').click(function(e){
	console.log('deleted')
	e.preventDefault();
	$.ajax({
		url: $(this).attr('href'),
		method: 'DELETE'
	}).then(function(response){
		window.location.href='index';
		console.log('done');
	});
});