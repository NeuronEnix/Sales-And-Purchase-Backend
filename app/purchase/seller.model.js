const mongoose = require( 'mongoose' ) ;
const errData  = require('../../response').errData ;

let sellerSchema = new mongoose.Schema ({
    Name : {
        type : String, required : true 
    },
    USerID : {
        type : mongoose.Schema.Types.ObjectId, required : true
    }
}) ;

const Seller = mongoose.model( 'sellers', sellerSchema ) ;
module.exports = Seller ;
