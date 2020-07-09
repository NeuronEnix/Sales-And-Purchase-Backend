const mongoose = require( 'mongoose' ) ;
const errData  = require('../../response').errData ;

let sellerSchema = new mongoose.Schema ({
    UserID : { type : mongoose.Schema.Types.ObjectId, required : true },
    Name   : { type : String } 
});

sellerSchema.statics.getID = async ( sellerName ) => {
    const sellerID = await Seller.findOne( { Name : sellerName }, { _id : 1 } ) ;
    if( !sellerID ) throw { err : errData.resNotFound, info : 'Seller Name' } ;
    return sellerID;
}

const Seller = mongoose.model( 'sellers', sellerSchema ) ;
module.exports = Seller;