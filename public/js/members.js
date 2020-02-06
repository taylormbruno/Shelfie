/* eslint-disable no-undef */
$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page

    $('#logoutBtn').on('click', function(event) {
        event.preventDefault();
        $.get('/logout', {
            type: 'GET'
        }, function() {
            window.location.replace('/');
            // If there's an error, log the error
        });
    });
});
