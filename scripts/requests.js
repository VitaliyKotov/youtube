const ChangeLayout = require('./changeLayout');

function sendRequest(inputValue) {
    let youtubeURL;
    if(inputValue) {
        youtubeURL = 'https://www.googleapis.com/youtube/v3/search?maxResults=15&part=snippet&q='
        +inputValue+'&type=video&key=AIzaSyDm7gImCMBzDbuDWIpztjJAXVe4CaMY_ro';
        ChangeLayout.initPagination();
    } else {
        let last = document.getElementById('content').lastChild;
        let token = last.dataset.nextpage;
        youtubeURL = 'https://www.googleapis.com/youtube/v3/search?maxResults=15&pageToken='+
        token +'&part=snippet&key=AIzaSyDm7gImCMBzDbuDWIpztjJAXVe4CaMY_ro';
    }
    fetch(youtubeURL)
        .then((res) => res.json())
        .then((data) => {
            let videos = data.items;
            videos.forEach((element) => {
            let fields = {
                imgSrc: element.snippet.thumbnails.medium.url,
                title : element.snippet.title,
                link : 'https://www.youtube.com/watch?v=' + element.id.videoId,
                authorLink : 'https://www.youtube.com/channel/' + element.snippet.channelId,
                author : element.snippet.channelTitle,
                date : element.snippet.publishedAt.slice(0, 10),
                views : '',
                desc : element.snippet.description,
                id: element.id.videoId,
                nextpage : data.nextPageToken
            };
            getStat(fields);
            })
        });
}

function getStat(o) {
    let statURL = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&id='
    +o.id+'&key=AIzaSyDm7gImCMBzDbuDWIpztjJAXVe4CaMY_ro';
    fetch(statURL)
        .then((res) => res.json())
        .then((data) => {
            o.views = data.items[0].statistics.viewCount;
            ChangeLayout.createlayout(o);     
        })
}

module.exports = {
    getStat,
    sendRequest
}
