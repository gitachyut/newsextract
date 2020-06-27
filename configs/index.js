const pageIdNameToNumber = {
    facebook: 1,
    instagram: 2,
    twitter: 3,
    youtube: 4,
    reddit: 6,
    webhose: 5,
    comments:11
}

const credentialsColumnNameToNumber = {
    facebook: 0,
    youtube: 1,
    twitter: 2,
    reddit: 3,
    instagram: 4,
    webhose:5,
    facebook_login:6
}



//Niro 
// const pageIdSheetId = '1z2KTW9SUVLM2viLeFCqsRtfXA10cdAf7AZx9uklrmyo';

//Main
// const pageIdSheetId = "1Luchwh2kVjGPyj5dPAu9nUt-VfXgAzKNUBmSIsDk5g8"

//OTH
// const  pageIdSheetId  = "1WHHPKeK9bd9WCBE3bvIaLMep5Xnw_LKScRxsrqQJcOs";

//NTUC
const pageIdSheetId = "18GAPApM79rTHZjjs3vHkUwFMx8Y3Lf-eMrsqwMzB2Ok";

//SAM
// const pageIdSheetId = "1PK9xlOff1f0TNs31_cnXqBY26L-EjqjVB1tUnGHMMm0";

const credentialsSheetId = '1gp0au9t1MFOrADOx6U6pV5a6Xl8uPf7bDkWba_EP9gM';
const sentimentSheetId = '1m1WG25zArymeFEZR4fFEgbU9Tmi01ZXnOaCNkovR4z4';
const range = 'Sheet1!A2:H';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = './db/token.json';
const credentials_path = './db/credentials.json';



exports.pageIdSheetId = pageIdSheetId;
exports.credentialsSheetId = credentialsSheetId;
exports.sentimentSheetId = sentimentSheetId;
exports.range = range;
exports.TOKEN_PATH = TOKEN_PATH;
exports.credentials_path = credentials_path;
exports.pageIdNameToNumber = pageIdNameToNumber;
exports.credentialsColumnNameToNumber = credentialsColumnNameToNumber;
exports.SCOPES = SCOPES;