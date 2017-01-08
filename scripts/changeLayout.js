function createlayout(v) {
    let template = '<li data-nextpage ="' + v.nextpage +'"><img src="'+ v.imgSrc +'" alt="videoPreview"><div class="title"><a href="' +
    v.link + '">'+ v.title +'</a></div><span class="clearfix"><i class="fa fa-calendar" aria-hidden="true">'+
    v.date +'</i><i class="fa fa-eye" aria-hidden="true">'+ 
    v.views +'</i></span><span class="author"><i class="fa fa-user" aria-hidden="true"><a href="'+
    v.authorLink +'">'+ v.author +'</a></i></span><div class="description"><span>'+ v.desc +'</span></div>';

    let parent = document.getElementById('content');
    parent.insertAdjacentHTML('beforeend', template);
}  

function clearResults() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.style.transform = 'translateY(0px)';
}

function initPagination () {
    let pagination = '<li><span id="p" class="active">1</span></li><li><span id="p">2</span></li>';
    document.getElementById('pages').insertAdjacentHTML('beforeend', pagination);
}

function addPage () {
    let prevPage = document.getElementById('pages').lastChild.childNodes[0].innerHTML;
    prevPage++;
    let page = '<li><span id="p">'+ prevPage +'</span></li>';
    document.getElementById('pages').insertAdjacentHTML('beforeend', page);
}

function removePage() {
    let pages = document.getElementById('pages');
    if(pages.childNodes.length > 2) {
        pages.removeChild(pages.lastChild);
    }
}

function clearPagination () {
    document.getElementById('pages').innerHTML = '';
}

function swipeForward () {
    let currentActive = document.getElementsByClassName('active')[0];
    let currentActiveNumber = currentActive.innerHTML;
    currentActive.className = '';
    document.getElementById('pages').childNodes[currentActiveNumber].firstChild.className = 'active';
}

function swipeBackward () {
    let currentActive = document.getElementsByClassName('active')[0];
    let currentActiveNumber = currentActive.innerHTML;
    currentActive.className = '';
    document.getElementById('pages').childNodes[(currentActiveNumber - 2)].firstChild.className = 'active';
}

const moveContent = 420;

module.exports = {
    moveContent,
    swipeBackward,
    swipeForward,
    clearPagination,
    removePage,
    addPage,
    initPagination,
    clearResults,
    createlayout
}
