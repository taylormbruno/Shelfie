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
                var smallThumb = '';
                if ((response.items[i].volumeInfo.imageLinks.smallThumbnail)) {
                    smallThumb = response.items[i].volumeInfo.imageLinks.smallThumbnail;
                }
                else { smallThumb = '#' }


                var createImg = $('<img class=bookImg src=' + smallThumb + '>');
                var bookTitle = response.items[i].volumeInfo.title;
                var bookAuthor = response.items[i].volumeInfo.authors[0];
                var bookDesc = response.items[i].volumeInfo.description;
                var createRadioBtns = $(`<div class='control'>
                <label class='radio'>
                  <input data-id='`+ i + `' type='radio' name='Read'>
                  <strong>Have Read</strong>
                </label>
                <label class='radio'>
                  <input data-id='`+ i + `' type='radio' name='Unread'>
                  <strong>Want To Read</strong>
                </label>
                <label class='radio'>
                  <input data-id='`+ i + `'type='radio' name='Currently'>
                  <strong>Currently Reading</strong>
                </label>
              </div>`);
                // may have to create individual ids if  it's going to save that info into db?
                var createSaveBtn = $('<button data-id="' + i + '" class="saveBtn">Add to Shelf</button>');

                console.log(bookTitle);
                console.log(bookAuthor);
                console.log(bookDesc);

                $('#bookDiv').addClass('has-background-light');
                $('#bookDiv').append(createImg);
                $('#bookDiv').append(createRadioBtns);
                $('#bookDiv').append(createSaveBtn);
                $('#bookDiv').append('<br>');
                $('.saveBtn').addClass('button is-primary');
                $('#bookDiv').append('<strong>Title:</strong> <span data-id="' + i + '> ' + bookTitle + '</span><br>');
                $('#bookDiv').append('<strong>Author:</strong> ' + bookAuthor + '<br>');
                $('#bookDiv').append('<strong>Description:</strong> ' + bookDesc + '<br>');
                $('#bookDiv').append('<br><br>');
            }

        });


    });
    // add book to shelf
    // Nothing firing
    $('.saveBtn').click(function () {
        console.log('boop');
        // event.preventDefault();
        console.log('here');
        var dataID = this.attr('data-id');
        console.log(dataID);
    });
});


// will need an event listener for add to shelf button
// if thumbnail doesn't pull up gets an undefined error and won't pull up anything---fix for this?