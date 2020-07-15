const mongoose = require( 'mongoose' ) ;
const errData  = require( '../../response' ).errData ;
const Seller   = require( '../seller/seller.model.js' ) ;
const Item     = require( '../item/item.model.js' ) ;

let itemSchema = new mongoose.Schema({
    Name : {
        type : String, ref  : 'items', required : true
    },
    Qty : {
        type : Number, required : true
    }
}, { _id : false } ) ;

let purchaseSchema = new mongoose.Schema ({
    SellerID : { type : String, required : true, ref : 'sellers', index : true } ,
    Items : { 
        type : [ itemSchema ], required : true
    }
});

purchaseSchema.statics.Create = async ( purchaseData ) => {
    try {
        const { SellerName , Items } = purchaseData ;
        purchaseData.SellerID = await Seller.getID( SellerName ) ;        
        await Purchase.ValidateAndUpdateItems( Items ) ;
        const purchase = new Purchase() ;
        Object.assign( purchase, purchaseData ) ;
        return purchase.save() ;
    } catch ( err ) {
        throw err ;
    }
}

purchaseSchema.statics.ValidateAndUpdateItems = async ( ItemData ) => {
    itemList = []
    for( const item of ItemData ) {
        const itemDoc = await Item.findOne( { Name : item.Name } , {Qty:1} ) ;
        
        if( !itemDoc )
            throw { 
                err : errData.resNotFound, 
                info : { Item : item.Name } 
            } ;
        
        itemDoc.Qty += item.Qty ;
        itemList.push( itemDoc ) ;
    }
    itemList.forEach( item => {
        item.save() ;
    })
}

const Purchase = mongoose.model( 'purchases', purchaseSchema ) ;
module.exports = Purchase;
