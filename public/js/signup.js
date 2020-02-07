/* eslint-disable no-undef */
$(document).ready(function() {
    console.log('sign in fired!');
    // Getting references to our form and input
    var signUpForm = $('form.signup');
    var username = $('input#loginUser');
    var passwordInput = $('input#loginPass');

    // When the signup button is clicked, we validate the username and password are not blank
    signUpForm.on('submit', function(event) {
        event.preventDefault();
        var userData = {
            username: username.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.username || !userData.password) {
            return;
        }
        // If we have an username and password, run the signUpUser function
        signUpUser(userData.username, userData.password);
        username.val('');
        passwordInput.val('');
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(username, password) {
        $.post('/api/signup', {
            type: 'POST',
            username: username,
            password: password
        }, function(res) {
            console.log(res);
            // If there's an error, handle it by throwing up a bootstrap alert
            window.location = res.redirectTo;
        });
        // .then(function() {
        // });
        // .catch(handleLoginErr);
    }

    // function handleLoginErr(err) {
    //     $('#alert .msg').text(err.responseJSON);
    //     $('#alert').fadeIn(500);
    // }
});
