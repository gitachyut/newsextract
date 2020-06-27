const {db} = require('./db/index')

let googleSheetUpdate = ( data ) => {
    db('create', data ).catch((err)=>{
        console.log(err)
    })
}


exports.googleSheetUpdate = googleSheetUpdate
