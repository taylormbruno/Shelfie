// eslint-disable-next-line no-undef
$(document).ready(function() {
    // Getting references to our form and inputs
    // eslint-disable-next-line no-undef
    var loginForm = $('form.login');
    // eslint-disable-next-line no-undef
    var usernameInput = $('input#loginUser');
    // eslint-disable-next-line no-undef
    var passwordInput = $('input#loginPass');

    // When the form is submitted, we validate there's an email and password entered
    loginForm.on('submit', function(event) {
        event.preventDefault();
        var userData = {
            username: usernameInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.username || !userData.password) {
            return;
        }

        // If we have an username and password we run the loginUser function and clear the form
        loginUser(userData.username, userData.password);
        usernameInput.val('');
        passwordInput.val('');
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(username, password) {
        // eslint-disable-next-line no-undef
        $.ajax('/api/login', {
            type: 'POST',
            url: '/api/login',
            username: username,
            password: password,
            success: function(data, textStatus) {
                console.log(textStatus);
                console.log(data.redirect);
                if (data.redirect) {
                    // data.redirect contains the string URL to redirect to
                    window.location.href = data.redirect;
                }
            }
        }).then(function() {
            // window.location.replace('/home/:id');
            // If there's an error, log the error
        })
            .catch(function(err) {
                console.log(err);
            });
    }
});
