const mongoose = require( 'mongoose' ) ;
const errData  = require( '../../response.js' ).errData ;
const Item = require( '../item/item.model.js' ) ;

let itemSchema = new mongoose.Schema({
    Name : { type : String, ref  : 'items', },
    Qty  : { type : Number, required : true, }
}, { _id : false } ) ;

let saleSchema = new mongoose.Schema ({
    Items : { 
        type : [ itemSchema ], required : true
    }
});

saleSchema.statics.Create = async ( items ) => {
    try {
        await Sale.ValidateAndUpdateItems( items ) ;
        const sale = new Sale() ;
        sale.Items = items ;
        return await sale.save() ;
    } catch ( err ) {
        throw err ;
    }
}

saleSchema.statics.ValidateAndUpdateItems = async ( ItemData ) => {
    itemList = []
    for( const item of ItemData ) {
        const itemDoc = await Item.findOne( { Name : item.Name } , {Qty:1} ) ;
        if( !itemDoc )
            throw { 
                err : errData.resNotFound, 
                info : { Item : item.Name } 
            } ;
        if( item.Qty > itemDoc.Qty ) 
            throw { 
                err  : errData.outOfStock, 
                info : { 
                    Item : item.Name,
                    AvailableQty  : itemDoc.Qty
                }
            } ;
        itemDoc.Qty -= item.Qty ;
        itemList.push( itemDoc ) ;
    }
    itemList.forEach( item => {
        item.save() ;
    })
}


const Sale = mongoose.model( 'sales', saleSchema ) ;
module.exports = Sale;
