/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// const Init = require('./initLayout');
	var Listeners = __webpack_require__(1);
	window.onload = function () {
	    var layout = '<div id="wrapper"><input id="search" type="text"><span id="search-icon"><i class="fa fa-search"' + 'aria-hidden="true"></i></span><div id="container"><ul id="content"></ul></div><div id="pagination">' + '<ol id="pages"></ol></div></div>';
	    var body = document.querySelector('body');
	    body.insertAdjacentHTML('afterbegin', layout);
	    body.addEventListener('mousedown', Listeners.getStartX);
	    var input = document.getElementById('search');
	    input.addEventListener('keydown', Listeners.listenInput);
	    var button = document.getElementById('search-icon');
	    button.addEventListener('click', Listeners.listenButton);
	    body.addEventListener('touchstart', Listeners.listenButton);
	    var list = document.getElementById('pages');
	    list.addEventListener('click', Listeners.listenPagination);
	    list.addEventListener('touchstart', Listeners.listenPagination);
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ChangeLayout = __webpack_require__(2);
	var Request = __webpack_require__(3);

	function listenInput(e) {
	    if (e.keyCode === 13) {
	        ChangeLayout.clearResults();
	        ChangeLayout.clearPagination();
	        var input = document.getElementById('search');
	        Request.sendRequest(input.value);
	    }
	}

	function listenButton(e) {
	    if (e.target.id === 'search' || e.target.className === 'fa fa-search') {
	        var input = document.getElementById('search');
	        ChangeLayout.clearResults();
	        ChangeLayout.clearPagination();
	        if (input.value) {
	            Request.sendRequest(input.value);
	        }
	        e.stopPropagation();
	    } else {
	        var touchX = e.touches[0].clientX;
	        getEndTouchX(this, touchX);
	    }
	}

	function getStartX(e) {
	    if (e.target.id === 'search' || e.target.className === 'fa fa-search' || e.target.id === 'p') {
	        e.stopPropagation();
	    } else {
	        var startX = e.clientX;
	        getEndX(this, startX);
	    }
	}

	function getEndX(element, start) {
	    var startX = start;
	    element.addEventListener('mouseup', function getEndXListener(e) {
	        var endX = e.clientX;
	        var deltaX = endX - startX;
	        var page = document.getElementById('content');
	        if (Math.abs(deltaX) > 35) {
	            if (deltaX > 35) {
	                var firstPage = document.getElementById('pages').firstChild.childNodes[0].className;
	                if (pages.childNodes.length > 2 && firstPage !== 'active') {
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
	    });
	}

	function getEndTouchX(element, start) {
	    var touchX = start;
	    element.addEventListener('touchend', function getEndTouchXListener(e) {
	        var endX = e.changedTouches[0].clientX;
	        var deltaX = endX - touchX;
	        var page = document.getElementById('content');
	        if (Math.abs(deltaX) > 35) {
	            if (deltaX > 25) {
	                var _pages = document.getElementById('pages');
	                var firstPage = document.getElementById('pages').firstChild.childNodes[0].className;
	                if (_pages.childNodes.length > 2 && firstPage !== 'active') {
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
	    });
	}

	function listenPagination(e) {
	    var currentActive = document.getElementsByClassName('active')[0];
	    var currentActiveNumber = parseInt(currentActive.innerHTML, 10);
	    currentActive.className = '';
	    e.target.className = 'active';
	    var targetNumber = parseInt(e.target.innerHTML, 10);
	    var content = document.getElementById('content');
	    if (e.target.id === 'p') {
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
	    listenPagination: listenPagination,
	    getEndTouchX: getEndTouchX,
	    getEndX: getEndX,
	    getStartX: getStartX,
	    listenButton: listenButton,
	    listenInput: listenInput
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	function createlayout(v) {
	    var template = '<li data-nextpage ="' + v.nextpage + '"><img src="' + v.imgSrc + '" alt="videoPreview"><div class="title"><a href="' + v.link + '">' + v.title + '</a></div><span class="clearfix"><i class="fa fa-calendar" aria-hidden="true">' + v.date + '</i><i class="fa fa-eye" aria-hidden="true">' + v.views + '</i></span><span class="author"><i class="fa fa-user" aria-hidden="true"><a href="' + v.authorLink + '">' + v.author + '</a></i></span><div class="description"><span>' + v.desc + '</span></div>';

	    var parent = document.getElementById('content');
	    parent.insertAdjacentHTML('beforeend', template);
	}

	function clearResults() {
	    var content = document.getElementById('content');
	    content.innerHTML = '';
	    content.style.transform = 'translateY(0px)';
	}

	function initPagination() {
	    var pagination = '<li><span id="p" class="active">1</span></li><li><span id="p">2</span></li>';
	    document.getElementById('pages').insertAdjacentHTML('beforeend', pagination);
	}

	function addPage() {
	    var prevPage = document.getElementById('pages').lastChild.childNodes[0].innerHTML;
	    prevPage++;
	    var page = '<li><span id="p">' + prevPage + '</span></li>';
	    document.getElementById('pages').insertAdjacentHTML('beforeend', page);
	}

	function removePage() {
	    var pages = document.getElementById('pages');
	    if (pages.childNodes.length > 2) {
	        pages.removeChild(pages.lastChild);
	    }
	}

	function clearPagination() {
	    document.getElementById('pages').innerHTML = '';
	}

	function swipeForward() {
	    var currentActive = document.getElementsByClassName('active')[0];
	    var currentActiveNumber = currentActive.innerHTML;
	    currentActive.className = '';
	    document.getElementById('pages').childNodes[currentActiveNumber].firstChild.className = 'active';
	}

	function swipeBackward() {
	    var currentActive = document.getElementsByClassName('active')[0];
	    var currentActiveNumber = currentActive.innerHTML;
	    currentActive.className = '';
	    document.getElementById('pages').childNodes[currentActiveNumber - 2].firstChild.className = 'active';
	}

	var moveContent = 420;

	module.exports = {
	    moveContent: moveContent,
	    swipeBackward: swipeBackward,
	    swipeForward: swipeForward,
	    clearPagination: clearPagination,
	    removePage: removePage,
	    addPage: addPage,
	    initPagination: initPagination,
	    clearResults: clearResults,
	    createlayout: createlayout
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ChangeLayout = __webpack_require__(2);

	function sendRequest(inputValue) {
	    var youtubeURL = void 0;
	    if (inputValue) {
	        youtubeURL = 'https://www.googleapis.com/youtube/v3/search?maxResults=15&part=snippet&q=' + inputValue + '&type=video&key=AIzaSyDm7gImCMBzDbuDWIpztjJAXVe4CaMY_ro';
	        ChangeLayout.initPagination();
	    } else {
	        var last = document.getElementById('content').lastChild;
	        var token = last.dataset.nextpage;
	        youtubeURL = 'https://www.googleapis.com/youtube/v3/search?maxResults=15&pageToken=' + token + '&part=snippet&key=AIzaSyDm7gImCMBzDbuDWIpztjJAXVe4CaMY_ro';
	    }
	    fetch(youtubeURL).then(function (res) {
	        return res.json();
	    }).then(function (data) {
	        var videos = data.items;
	        videos.forEach(function (element) {
	            var fields = {
	                imgSrc: element.snippet.thumbnails.medium.url,
	                title: element.snippet.title,
	                link: 'https://www.youtube.com/watch?v=' + element.id.videoId,
	                authorLink: 'https://www.youtube.com/channel/' + element.snippet.channelId,
	                author: element.snippet.channelTitle,
	                date: element.snippet.publishedAt.slice(0, 10),
	                views: '',
	                desc: element.snippet.description,
	                id: element.id.videoId,
	                nextpage: data.nextPageToken
	            };
	            getStat(fields);
	        });
	    });
	}

	function getStat(o) {
	    var statURL = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + o.id + '&key=AIzaSyDm7gImCMBzDbuDWIpztjJAXVe4CaMY_ro';
	    fetch(statURL).then(function (res) {
	        return res.json();
	    }).then(function (data) {
	        o.views = data.items[0].statistics.viewCount;
	        ChangeLayout.createlayout(o);
	    });
	}

	module.exports = {
	    getStat: getStat,
	    sendRequest: sendRequest
	};

/***/ }
/******/ ]);