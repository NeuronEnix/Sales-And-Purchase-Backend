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
    const { Items, SellerName } = purchaseData ;
    console.log('fun ran')
    if( Items && SellerName ) {
        const purchase = new Purchase() ;
        Object.assign( purchase, { SellerName, Items } ) ;
        try{
            console.log( "saving Purchase")
            return await purchase.save() ;
        } catch( err ) {
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

const Purchase = mongoose.model( 'purchases', purchaseSchema ) ;
module.exports = Purchase;
