const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('069b93665410478bb371f80b453e353a');
 

newsapi.v2.everything({
  q: 'Singapore AND Port AND Authority',
  from: '2020-06-27',
  to: '2020-06-28',
  language: 'en',
  sortBy: 'relevancy'
}).then(response => {
  console.log(response);
});


  