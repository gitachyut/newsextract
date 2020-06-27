// Keywords
const { keywords } = require('./keywords');

// Matching Algo
let matchString = function(string){
    let findings = keywords.filter( keyword => {
        let strings = keyword.split('+');
        let stLength =  strings.length;
        let h = strings.filter( str => {
            return new RegExp("\\b" + str + "\\b", "i").test(string);
        });
        return h.length == stLength ? true : false;
    })
    return findings.length > 0 ? true : false; 
}

exports.matchString = matchString;


