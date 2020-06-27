const RssFeedEmitter = require('rss-feed-emitter');
const randomUseragent = require('random-useragent');
const { matchString } = require('./stringMatch');
const { mailFunction } = require('./mailfunction');
const { rssAddress } = require('./rss');
const { googleSheetUpdate } = require('./googelsheet');
let userAgent = randomUseragent.getRandom(); 
const feeder = new RssFeedEmitter({ userAgent, skipFirstLoad: true  });

// , skipFirstLoad: true 


feeder.add({
      url: rssAddress,
      refresh: 3000,
      eventName: 'feed'
  });
   
  feeder.on('feed', function(item) {

    if( matchString(item.description) || matchString(item.title) ){

        let news = [
            item.title,
            item.summary,
            item.description,
            item.meta.title,
            item.date,
            item.link
        ];
        googleSheetUpdate(news)

    }else{
      console.log('Not Imp=> ', item.title)
    }

  });

