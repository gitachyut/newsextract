const GoogleNews = require('google-news');
const { googleSheetUpdate } = require('./googelsheet');
const { keywords } = require('./keywords');  

var googleNews = new GoogleNews();

keywords.forEach( keyword => {

    googleNews.stream(keyword, function(stream) {
  
        stream.on(GoogleNews.DATA, function(data) {
            let news = [
                data.title,
                data.summary,
                data.description,
                data.meta.title,
                data.date,
                data.link
            ];
            googleSheetUpdate(news)
            return console.log(`${keyword} ....` + data.title);
        });
        
        stream.on(GoogleNews.ERROR, function(error) {
            return console.log('Error Event received... ' + error);
        });
    });

})





