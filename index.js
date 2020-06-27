const RssFeedEmitter = require('rss-feed-emitter');
const randomUseragent = require('random-useragent');
const { matchString } = require('./stringMatch');
const { mailFunction } = require('./mailfunction');
const { rssAddress } = require('./rss');
let userAgent = randomUseragent.getRandom(); 
const feeder = new RssFeedEmitter({ userAgent });
 

// , skipFirstLoad: true 
feeder.add(
  {
    url: rssAddress,
    refresh: 2000,
    eventName: 'feed'
  }
);
   
  // this item will only be from the new items, not from old items.
  feeder.on('feed', function(item) {

    if( matchString(item.description) || matchString(item.title) ){
        let news = {
            title : item.title,
            desc: item.description,
            date: item.date,
            link: item.link
        }

        // mailFunction(news).catch(console.error);
        console.log(item.title, item.description, item.link, item.date)
    }else{
        console.log(item.title, item.description, item.link, item.date)
    }

  });

