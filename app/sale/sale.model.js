const mongoose = require( 'mongoose' ) ;
const errData  = require( '../../response.js' ).errData ;
const Item = require( '../item/item.model.js' ) ;
const objID = mongoose.Schema.Types.ObjectId ;
let itemSchema = new mongoose.Schema({
    Name : { type : String, ref  : 'items', },
    Qty  : { type : Number, required : true, }
}, { _id : false } ) ;

let saleSchema = new mongoose.Schema ({
    UserID   : { type : objID, required : true, index : true, ref : 'users'   } ,
    Items : { 
        type : [ itemSchema ], required : true
    }
});

saleSchema.statics.Create = async ( saleData ) => {
        await Sale.ValidateAndUpdateItems( saleData.Items ) ;
        const sale = new Sale() ;
        Object.assign( sale, saleData ) ;
        return await sale.save() ;
}

saleSchema.statics.ValidateAndUpdateItems = async ( ItemData ) => {
    const itemList = []
    for( const item of ItemData ) {
        const itemDoc = await Item.findOne( { Name : item.Name } , {Qty:1} ) ;
        if( !itemDoc )
            throw { 
                err  : errData.resNotFound, 
                info : `Item : ${ item.Name } does not exist. Please make an entry in "Item Add section".`,  
            } ;
        if( item.Qty > itemDoc.Qty ) 
            throw { 
                err  : errData.outOfStock, 
                info : { 
                    Item : item.Name,
                    AvailableQty  : itemDoc.Qty
                }
            } ;

        // For 'Logging' where itemData is update before passing it logger in 'sale.controller.js'
        item.LogQty={};
        item.LogQty.Old = itemDoc.Qty ;

        itemDoc.Qty -= item.Qty ;

        // For 'Logging' where itemData is update before passing it logger in 'sale.controller.js'
        item.LogQty.New = itemDoc.Qty ;

        itemList.push( itemDoc ) ;
    }
    itemList.forEach( item => {
        item.save() ;
    })
}

saleSchema.statics.List = async ( filter, project ) => {
    return await Sale.find( filter, project ) ;
}


const Sale = mongoose.model( 'sales', saleSchema ) ;
module.exports = Sale;
