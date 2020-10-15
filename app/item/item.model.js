const mongoose = require( 'mongoose' ) ;
const { errData } = require('../../response') ;

var itemSchema = new mongoose.Schema ({
    Name   : { type : String, index: { unique: true } },
    Qty    : Number,
    Unit   : String,
    UserID : { type : mongoose.Schema.Types.ObjectId, required : true },
});

itemSchema.statics.AddNewItem = async ( itemData ) => {
    try {
        const item = new Item() ;
        Object.assign( item, itemData ) ;

        // For 'Logging' where itemData is update before passing it logger in 'item.controller.js'
        itemData.LogQty = { Old:0, New:itemData.Qty } ;

        return await item.save() ;
    } catch ( err ) {
        if ( err.code === 11000 ) 
            throw { err : errData.duplicateErr, info : `Item : ${itemData.Name} ( Already Exist )` } ;
        throw err ;
    }
}

itemSchema.statics.Update = async ( { Name, Unit, Qty } ) => {

    let fieldsToBeUpdated = {} ;
    if ( Unit ) fieldsToBeUpdated.Unit = Unit ;
    if ( Qty  ) fieldsToBeUpdated.Qty  = Qty  ;
    
    const updateStatus = await Item.updateOne( 
        { Name : Name  },
        { $set : fieldsToBeUpdated }
        ) ;

    if ( updateStatus.n === 0 ) throw { err : errData.resNotFound, info : `Item : ${ Name } ( Not Found ). Please Add the Item before updating.` } ; 
}

itemSchema.statics.Detail = async ( itemName ) => {
    const itemFound = await Item.findOne( { Name : itemName }, { _id : 0, Qty:1, Unit:1 } ) ;
    if ( !itemFound ) throw { err : errData.resNotFound, info : `Item : ${ itemName } ( Not Found ).` } ; 
    return itemFound ;
}


itemSchema.statics.IncItemQty = async ( itemQtyPair ) => {
    const itemNameList = Object.keys( itemQtyPair ) ;
    const query = {
        filter  : { Name: { $in : itemNameList } } ,
        project : { _id:1, Name:1, Qty:1 }  ,
    }
    const itemDocList = await Item.find( query.filter, query.project );

    if ( itemNameList.length != itemDocList.length ) 
        throw {
            err  : errData.resNotFound,
            info : "One of the item is doesn't exist in DB",
        }
    
    for ( const itemDoc of itemDocList ) 
        itemDoc.Qty += parseInt(itemQtyPair[ itemDoc.Name ]) ;

    for( const doc of itemDocList )
        await doc.save();
    
}

itemSchema.statics.DecItemQty = async ( itemQtyPair ) => {
    const itemNameList = Object.keys( itemQtyPair ) ;
    const query = {
        filter  : { Name: { $in : itemNameList } } ,
        project : { _id:1, Name:1, Qty:1 }  ,
    }
    const itemDocList = await Item.find( query.filter, query.project );

    if ( itemNameList.length != itemDocList.length ) 
        throw {
            err  : errData.resNotFound,
            info : "One of the item is doesn't exist in DB",
        }
    
    for ( const itemDoc of itemDocList ) {
        const QtyToBeReduced = itemQtyPair[ itemDoc.Name ] ;
        const AvailableQty = itemDoc.Qty ;
        if ( QtyToBeReduced > AvailableQty )
            throw { 
                err  : errData.notEnoughStock, 
                info : `Item : '${ itemDoc.Name }' Stock is low, cannot perform the operation`,  
            } ;
        itemDoc.Qty -= parseInt(QtyToBeReduced);
    }

    for ( const doc of itemDocList )
        await doc.save();
}


const Item = mongoose.model( 'items', itemSchema ) ;
module.exports = Item ;
