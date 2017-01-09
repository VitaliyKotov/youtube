const ChangeLayout = require('./changeLayout');
const Request = require('./requests');

function listenInput (e) {
    if(e.keyCode === 13) {
        ChangeLayout.clearResults();
        ChangeLayout.clearPagination();
        let input = document.getElementById('search');
        Request.sendRequest(input.value);
    }
}

function listenButton (e) {
    if(e.target.id === 'search' || e.target.className === 'fa fa-search') {
        let input = document.getElementById('search');
        ChangeLayout.clearResults();
        ChangeLayout.clearPagination();
        if(input.value) {
            Request.sendRequest(input.value);   
        }
        e.stopPropagation(); 
    } else {
        let touchX = e.touches[0].clientX;
        getEndTouchX(this, touchX);
    }
}

function getStartX (e) {
    if(e.target.id === 'search' || e.target.className === 'fa fa-search' || e.target.id === 'p') {
        e.stopPropagation();
    } else {
        let startX = e.clientX;
        getEndX(this, startX);
    }
}

function getEndX(element, start) {
    let startX = start;
    element.addEventListener('mouseup', function getEndXListener(e) {
        let endX = e.clientX;
        let deltaX = endX - startX;
        let page = document.getElementById('content');
        if(Math.abs(deltaX) > 35) {
            if (deltaX > 35) {
                let firstPage = document.getElementById('pages').firstChild.childNodes[0].className;
                if(pages.childNodes.length > 2 && firstPage !== 'active') {
                    page.style.transform += 'translateY( ' + ChangeLayout.moveContent + 'px)';
                    this.removeEventListener('mouseup', getEndXListener);
                    ChangeLayout.removePage();
                    ChangeLayout.swipeBackward();
                }
            } else {
                page.style.transform += 'translateY( -' + ChangeLayout.moveContent + 'px)';
                this.removeEventListener('mouseup', getEndXListener);
                ChangeLayout.addPage();  
                ChangeLayout.swipeForward();
                Request.sendRequest();
            }
        } else {
            this.removeEventListener('mouseup', getEndXListener);
        }
    })
}

function getEndTouchX(element, start) {
    let touchX = start;
    element.addEventListener('touchend', function getEndTouchXListener(e) {
        let endX = e.changedTouches[0].clientX;
        let deltaX = endX - touchX;
        let page = document.getElementById('content');
        if(Math.abs(deltaX) > 35) {
            if (deltaX > 25) {
                let pages = document.getElementById('pages');
                let firstPage = document.getElementById('pages').firstChild.childNodes[0].className;
                if(pages.childNodes.length > 2 && firstPage !== 'active') {
                    page.style.transform += 'translateY( ' + ChangeLayout.moveContent + 'px)';
                    this.removeEventListener('touchend', getEndTouchXListener);
                    ChangeLayout.removePage();
                    ChangeLayout.swipeBackward();
                }
            } else {
                page.style.transform += 'translateY( -' + ChangeLayout.moveContent + 'px)';
                this.removeEventListener('touchend', getEndTouchXListener);
                ChangeLayout.addPage();
                ChangeLayout.swipeForward();
                Request.sendRequest();
            }
        }
    })
}

function listenPagination (e) {
    let currentActive = document.getElementsByClassName('active')[0];
    let currentActiveNumber = parseInt(currentActive.innerHTML, 10);
    currentActive.className = '';
    e.target.className = 'active';
    let targetNumber = parseInt(e.target.innerHTML, 10);
    let content = document.getElementById('content');
    if(e.target.id === 'p') {
         if (currentActiveNumber < targetNumber) {
            content.style.transform = 'translateY( -' + (targetNumber - 1) * ChangeLayout.moveContent + 'px)';
            ChangeLayout.addPage();
        } else {
            content.style.transform = 'translateY( -' + (targetNumber - 1) * ChangeLayout.moveContent + 'px)';
            ChangeLayout.removePage();
        }
        e.stopPropagation();
    }
}

module.exports = {
    listenPagination,
    getEndTouchX,
    getEndX,
    getStartX,
    listenButton,
    listenInput
}

