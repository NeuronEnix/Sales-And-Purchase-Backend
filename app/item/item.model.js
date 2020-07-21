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
    const itemFound = await Item.findOne( { Name : itemName }, { _id : 0, __v : 0, UserID : 0 } ) ;
    if ( !itemFound ) throw { err : errData.resNotFound, info : `Item : ${ itemName } ( Not Found ).` } ; 
    return itemFound ;
}

const Item = mongoose.model( 'items', itemSchema ) ;
module.exports = Item ;
