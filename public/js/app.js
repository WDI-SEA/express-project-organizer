$(document).ready(function() {
    $('.delete-link').on('click', function(event) {
        event.preventDefault();
        $.ajax({
            method: 'DELETE',
            url: $(this).attr('href'),
        }).done(function() {
            window.location = "/";
        });
    });

    $('#update-form').on('submit', function(event) {
        event.preventDefault();
        $.ajax({
            method: 'PUT',
            url: $(this).attr('action'),
            data: {
                name: $('#name').val(),
                githubLink: $('#githubLink').val(),
                deployedLink: $('#deployedLink').val(),
                description: $('#description').val(),
                categories: $('#categories').val()
            }
        }).done(function() {
            window.location = "/";
        })
    });

});