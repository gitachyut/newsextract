require('dotenv').config()
const nodemailer = require('nodemailer');

let senderEmailList = [
    // 'newssearch.mail@gmail.com',
    'achyutdeka@yahoo.com',
    'leonsky87@gmail.com'
]


async function main( obj  ) {

    let html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>NewsSearch News Alert</title>
        </head>
        <body>
                <div style="width: 80%;">
                    <h3>News Alert by NewsSearch</h3>
                    <p>${obj.title}</p>
                    <p>${obj.desc}</p>
                    <p>${obj.date}</p>
                    <a href="${obj.link}"> ${obj.link} </a>
                </div>
        </body>
        </html>
    `
  
    // create reusable transporter object using the default SMTP transport
    // https://myaccount.google.com/u/2/lesssecureapp
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS 
        }
      });
  

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"NewsSearch.sg" <${process.env.EMAIL}>`,
        to: `${senderEmailList.join(', ')}`, 
        subject: "NewsSearch News Alert", 
        html: html
    });
    
    console.log("Message sent: %s", info.messageId);

  }


  exports.mailFunction = main;

