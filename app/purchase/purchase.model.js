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

let purchaseSchema = new mongoose.Schema ({
    SellerName : { type : String, required : true, ref : 'sellers' } ,
    Items : { 
        type : [ itemSchema ], required : true
    }
});
purchaseSchema.statics.Create = async ( purchaseData ) => {
    try {
        const purchase = new Purchase() ;
        Object.assign( purchase, purchaseData ) ;
        return await purchase.save() ;
    } catch ( err ) {
        throw { err : errData.unknownErr } ;
    }
}


const Purchase = mongoose.model( 'purchases', purchaseSchema ) ;
module.exports = Purchase;
