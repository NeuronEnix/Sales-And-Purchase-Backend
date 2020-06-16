const mongoose = require( 'mongoose' ) ;
const errData  = require('../../response').errData ;

let itemSchema = new mongoose.Schema({
    Name : {
        type : String, ref  : 'items', required : true
    },
    Qty : {
        type : Number, required : true
    }
}, { _id : false } ) ;

let billSchema = new mongoose.Schema ({
    Items : { 
        type : [ itemSchema ], required : true
    }
});

billSchema.statics.Create = async ( items ) => {
    if( items ) {
        const bill = new Bill() ;
        bill.Items = items ;
        try{
            return await bill.save() ;
        } catch ( err ) {
            if( err.name === 'ValidationError' ) {
                for (field in err.errors) console.log( field )
                throw errData.validationErr ;
            }
            throw errData.dbCommitErr ;
        }
    } else {
        throw errData.missingField ;
    }
}

const Bill = mongoose.model( 'bills', billSchema ) ;
module.exports = Bill;
