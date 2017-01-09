const Listeners = require('./listeners');

function initLayout () {
    let layout = '<div id="wrapper"><input id="search" type="text"><span id="search-icon"><i class="fa fa-search"'
    +'aria-hidden="true"></i></span><div id="container"><ul id="content"></ul></div><div id="pagination">'
    +'<ol id="pages"></ol></div></div>';
    let body = document.querySelector('body');
    body.insertAdjacentHTML('afterbegin', layout);
    body.addEventListener('mousedown', Listeners.getStartX)
    let input = document.getElementById('search');
    input.addEventListener('keydown', Listeners.listenInput);
    let button = document.getElementById('search-icon');
    button.addEventListener('click', Listeners.listenButton);
    body.addEventListener('touchstart', Listeners.listenButton);
    let list = document.getElementById('pages');
    list.addEventListener('click', Listeners.listenPagination);
    list.addEventListener('touchstart', Listeners.listenPagination);
}

module.exports = initLayout;
