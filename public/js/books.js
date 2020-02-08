/* eslint-disable for-direction */
/* eslint-disable no-undef */
$(document).ready(function () {

    // eslint-disable-next-line no-undef
    $('#searchBtn').click(function () {
        console.log('click');
        var searchInput = $('#searchBar').val().trim();
        console.log('searchInput' + searchInput);
        // search query works and returns response
        var queryURL = 'https://www.googleapis.com/books/v1/volumes?q=' + searchInput + '&key=AIzaSyDHWfAVWQPX7UK1qgA-EZvxpQROi2uXe_w';
        event.preventDefault();


        $.ajax({
            url: queryURL,
            method: 'GET',
            contentType: 'application/json'
        }).then(function (response) {
            $('#bookDiv').empty();
            // logs search result/response
            console.log(response);


            // will have to have a loop to go through all or some (maybe 3-5?) of the response
            for (i = 0; i < response.items.length; i++) {
                var createImg = $('<img class=bookImg src=' + response.items[i].volumeInfo.imageLinks.smallThumbnail + '>');
                var bookTitle = response.items[i].volumeInfo.title;
                var bookAuthor = response.items[i].volumeInfo.authors[0];
                var bookDesc = response.items[i].volumeInfo.description;
                var id = response.items[i].id;

                var createSaveBtn = $('<button data-title="' + bookTitle + '"data-id="' + id + '" class="saveBtn">Add to Shelf</button>');

                // console.log(id);
                console.log('book title' + bookTitle);
                console.log('book author' + bookAuthor);
                console.log('book desc' + bookDesc);
                console.log('HELLOOOOOOO');

                $('#bookDiv').addClass('has-background-light');
                $('#bookDiv').append(createImg);
                $('#bookDiv').append('<br>');
                // $('#bookDiv').append(createRadioBtns);
                $('#bookDiv').append(createSaveBtn);
                $('#bookDiv').append('<br>');
                $('.saveBtn').addClass('button is-primary');
                $('#bookDiv').append('<strong>Title:</strong> <span data-id="' + id + '"> ' + bookTitle + '</span><br>');
                $('#bookDiv').append('<strong>Author:</strong> ' + bookAuthor + '<br>');
                $('#bookDiv').append('<strong>Description:</strong> ' + bookDesc + '<br>');
                $('#bookDiv').append('<br><br>');
            }

        });


    });
});
// add book to shelf
// function saved in seperate variable to avoid ajax call firing twice.
$(document).on('click', '.saveBtn', saveNew);

var saveNew = function (event) {
    event.preventDefault();
    var dataID = $(this).attr('data-id');
    var dataTitle = $(this).attr('data-title');
    console.log('dataTitle ' + dataTitle);
    console.log('dataID' + dataID);
    console.log('PATH ~-~-~-~-~-~-~-~-~-~-~',window.location.pathname);
    // returns "/home/:id" and will slice to retrieve the id to pass through body
    var uspath = window.location.pathname;
    var userId = uspath.slice(6);
    let newBook = {
        title: dataTitle,
        isbn: dataID,
        shelf: 'Unread',
        usID: userId
    };
    $.ajax('/api/addNewBook', {
        type: 'POST',
        data: newBook
    }).then(function () {
        console.log(`Created new book ${newBook}`);
        location.reload();
    });
};

$(document).on('click', '.change', function () {
    event.preventDefault();
    // NOT SURE AB THIS PART:
    var readId = $(this).attr('data-id');
    var newRead = $(this).data('newread');

    console.log(readId);
    console.log(newRead);

    var newReadState = {
        id: readId,
        book_shelf: newRead
    };
    $.ajax('/api/updateShelf', {
        type: 'PUT',
        data: newReadState
    }).then(
        function () {
            console.log('changed unread to', newRead);
            location.reload();
        }
    );
    console.log('update', newReadState);
});

$(document).on('click', '.delete', function () {
    event.preventDefault();
    console.log('Delete click');
    var deleteId = $(this).attr('data-id');
    console.log('deleteID: ' + deleteId);

    // Send the DELETE request.
    $.ajax({
        url: '/api/remove/' + deleteId,
        type: 'DELETE',
        success: function () {
            console.log('deleted book', deleteId);
            // Reload the page to get the updated list
            location.reload();
        }
    });
});