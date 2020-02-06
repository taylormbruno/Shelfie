/* eslint-disable no-undef */
$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get('/api/user_data').then(function(data) {
        $('.member-name').text(data.email);
    });

    $('#logoutBtn').on('click', function(event) {
        event.preventDefault();
        $.ajax({
            type: 'GET',
            url: '/logout'
        }).then(function() {
            window.location.replace('/');
            // If there's an error, log the error
        })
            .catch(function(err) {
                console.log(err);
            });
    });
});
