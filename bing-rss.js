const RssFeedEmitter = require('rss-feed-emitter');
const randomUseragent = require('random-useragent');
const { matchString } = require('./stringMatch');
const { mailFunction } = require('./mailfunction');
const { keywords } = require('./keywords');  
const { googleSheetUpdate } = require('./googelsheet');
let userAgent = randomUseragent.getRandom(); 
const feeder = new RssFeedEmitter({ userAgent , skipFirstLoad: true });



let x = `"Singapore Port" OR "Singapore Maritime" OR "Singapore Maritime Port Authority" OR "Port Authority Singapore" OR "Singapore Port Authority" OR "Singapore Strait" OR "Pedra Branca" OR "Costa Fortuna" OR "Sea Chokepoint" OR ("floating" AND "accomodation" AND "Singapore") OR ("crew" AND "change" AND "singapore") OR ("Covid-19" AND "Singapore" AND "maritime") OR ("Sea Robber" AND "Singapore") OR ("Piracy" AND "Singapore") OR ("Oil spill" AND "Singapore") OR ("Marine" AND "pollution" AND "Singapore") OR ("Cyber" AND "security" AND "Singapore" AND "port") OR ("Cyber" AND "hack" AND "Singapore" AND "port") OR ("Singapore" AND "port" AND "open") OR ("Ship" AND "Capsize" AND "Singapore") OR ("Ship" AND "Collision" AND "Singapore") OR ("Ship" AND "stuck" AND "Singapore) OR "MaritimeSG" OR "port due" OR ("Carbon tax" AND "Singapore") OR "Craft license" OR "Merchant Shipping Act" OR "Merchant Shipping CLCO Act" OR "Merchant Shipping MLC Act" OR "Merchant Shipping Wreck Removal Act" OR "MPA Act" OR "Prevention of pollution of the sea act" OR "Solas" OR "Regional ferry services operator license" OR ("admiralty" AND "jurisdiction" AND "Singapore") OR ("Sanction" AND "Ship" AND "Singapore) OR "Sand reclamation" OR "Tuas Port" OR ("Tuas" AND "MRT" AND "BUS") OR "Sultan Shoal" OR ("Compliance" AND "IMO2020") OR ("Decarbonisation" AND "IMO2030") OR ("Bunkering" AND "License" AND "Revocation") OR ("MFM" AND "tamper") OR ("insufficient" AND "bunker" AND "suppliers") OR ("insufficient" AND "bunker" AND "craft") OR ("contaminated" AND "bunker" AND "Singapore") OR ("Oil" AND "Theft") OR ("Singapore" AND "Registered" AND "Ship") OR ("Singapore" AND "Flagged" AND "ship") `;
let newKeywordStr = x.replace(/\s/g, "+");


// https://www.bing.com/search?q=tsunami+relief&format=rss

rssAddress = `https://www.bing.com/search?q=${newKeywordStr}&qft=interval%3d"7"&format=rss`

feeder.add({
      url: rssAddress,
      refresh: 600000,
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
