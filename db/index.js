const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const {
    SCOPES,
    TOKEN_PATH,
    credentials_path,
} = require('../configs');


const db = (database,data) => new Promise((resolve, reject) => {
    
  fs.readFile(credentials_path , (err, content) => {
    if (err) reject(err);
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), create(data,resolve, reject));
  });

}) 

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */

 
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}







const create = (data ,resolve, reject) => (auth) => {
  console.log(data)
  // ["Title", "Summary", "Article", "Media", "Date", "Link"]

  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.append(
  {
    auth: auth,
    spreadsheetId: '1IYyE3RCXUkYfTa7qRuydUYL69ekzZfgW2xHc4_BaiVE',
    range: 'Sheet1!A:F',
    valueInputOption: 'USER_ENTERED',
    resource: { 
      values: [
        data // it should be a array
    ]},
  },
  function (err, response) {
    if (err) {
      console.log(err);
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    console.log("response => created");
  });

}


exports.db = db