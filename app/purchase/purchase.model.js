const mongoose = require( 'mongoose' ) ;
const errData  = require( '../../response' ).errData ;
const Seller   = require( '../seller/seller.model.js' ) ;
const Item     = require( '../item/item.model.js' ) ;
const { response } = require('express');
const objID = mongoose.Schema.Types.ObjectId ;
let itemSchema = new mongoose.Schema({
    Name : { type : String, required : true, },
    Qty  : { type : Number, required : true, },
}, { _id : false } ) ;

let purchaseSchema = new mongoose.Schema ({
    SellerID : { type : objID, required : true, index : true, ref : 'sellers' } ,
    UserID   : { type : objID, required : true, index : true, ref : 'users'   } ,
    Items    : { type : [ itemSchema ], required : true                       } ,
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
    let itemList = []
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

purchaseSchema.statics.List = async ( filter ) => {
     await Purchase.find( filter, { _id:0, UserID:0, __v:0  } ) ;
     throw { err : errData.unknownErr } ;
}


const Purchase = mongoose.model( 'purchases', purchaseSchema ) ;
module.exports = Purchase;
