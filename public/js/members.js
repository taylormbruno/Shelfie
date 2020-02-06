// eslint-disable-next-line no-undef
$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    // eslint-disable-next-line no-undef
    $.get('/api/user_data').then(function(data) {
        // eslint-disable-next-line no-undef
        $('.member-name').text(data.email);
    });
});
