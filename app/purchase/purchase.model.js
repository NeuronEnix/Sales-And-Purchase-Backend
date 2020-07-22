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
    const { SellerName, Items } = purchaseData ;
    purchaseData.SellerID = await Seller.getID( SellerName ) ;        
    await Purchase.ValidateAndUpdateItems( Items ) ;
    const purchase = new Purchase() ;
    Object.assign( purchase, purchaseData ) ;
    return purchase.save() ;
}

purchaseSchema.statics.ValidateAndUpdateItems = async ( ItemData ) => {
    let itemList = []
    for( const item of ItemData ) {
        const itemDoc = await Item.findOne( { Name : item.Name } , {Qty:1} ) ;
        
        if( !itemDoc )
            throw { 
                err  : errData.resNotFound, 
                info : `Item : '${ item.Name }' does not exist. Please make an entry in 'Item Add section'.`,  
            } ;
        itemDoc.Qty += parseInt( item.Qty ) ;
        itemList.push( itemDoc ) ;
    }
    itemList.forEach( item => {
        item.save() ;
    })
}

purchaseSchema.statics.List = async ( filter, project ) => {
    return await Purchase.find( filter, project ) ;
}


const Purchase = mongoose.model( 'purchases', purchaseSchema ) ;
module.exports = Purchase;
