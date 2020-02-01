var bookID = cover_id;
var modalID = modal_id;
var bookLink = document.getElementById('bookLink');
var bookModal = document.getElementById('bookModal');
// [0] gets 1st instance of modal-close class
var close = document.getElementsByClassName('modal-close')[0];
var background = document.getElementsByClassName('modal-background')[0];
bookLink.onclick = function () {
    bookModal.style.display = 'block';
}

close.onclick = function () {
    bookModal.style.display = 'none';
}

window.onclick = function (event) {
    if (event.target.className == 'modal-background') {
        bookModal.style.display = 'none';
    }
}