const mongoose = require( 'mongoose' ) ;

const Item    = require( '../item/item.model.js'     ) ;
const errData = require( '../../response'            ).errData ;

const ObjID = mongoose.Schema.Types.ObjectId ;

let saleSchema = new mongoose.Schema ({
    UserID    : { type : ObjID, required : true, index : true, ref : 'users'   } ,
    CreatedAt : { type : Date , required : true                                } ,
    Items     : { type : {}   , required : true                                } ,
    Edits     : { type : [ { CreatedAt:Date, Items:{}, _id:false, } ]          } ,
    Status    : { type : String, default:"n" }, // n -> new; e -> edited; d -> deleted 
});

saleSchema.statics.Create = async ( saleData ) => {
    await Item.DecItemQty( saleData.Items ) ;

    const sale = new Sale() ;
    Object.assign( sale, saleData ) ;
    return await sale.save() ;

}

saleSchema.statics.Update = async ( saleUpdateData ) => {
    

    const saleDoc = await Sale.findOne( { _id:saleUpdateData.SaleID, Status: { $ne: "d" } } ) ;
    if ( !saleDoc ) 
        throw { err: errData.resNotFound, info: "Sale resource not found or is deleted"}

    await Item.IncItemQty( saleDoc.Items ) ;  

    try { await Item.DecItemQty( saleUpdateData.Items ) ; }
    catch ( err ) { 
        // If updated sale data item qty is more than existing qty then rollback
        if ( err.code === errData.notEnoughStock.code )
            Item.DecItemQty( saleDoc.Items ) ;
        throw err ;
    }

    saleDoc.Edits.unshift( { //Adds recent changes to beginning of array
        CreatedAt : saleDoc.CreatedAt,
        Items     : saleDoc.Items,
    })
    saleDoc.Status = "e" ;
    Object.assign( saleDoc, saleUpdateData ) ;
    return await saleDoc.save() ;

    // // Optimize incomplete
    // let is_update_ok = function lo( avail_item_qty, old_sal_data, new_sal_data ) {

    //     // for( const item_qty_pair of avail_item_qty ) {
    //     //     const item_name = item_qty_pair.Name ;
    //     //     const available_item_qty = item_qty_pair.Qty ;
    //     //     if ( available_item_qty + old_sal_data[ item_name ] - new_sal_data[ item_name ] < 0 )
    //     //         return false;
    //     // }
    //     return true ;
    // }

    // const oid = mongoose.Types.ObjectId ;

    // const aggregateList = [
    //     { $match: { _id: oid( saleUpdateData.SaleID ) } },
    //     {
    //         $lookup : {
    //             from : "items",
    //             let : { "i_list" : { $objectToArray : "$Items"} },
    //             pipeline : [
    //                 { $match :{ $expr : { $in : [ "$Name", "$$i_list.k"] } } },
    //                 { $project : { _id:0, Name:1, Qty:1 } },
    //                 // { $set: { "$$i_list" : [] } },
    //             ],
    //             as : "avail_item_qty"
    //         },
    //     },
    //     { $addFields : { update_ok: is_update_ok( ) } },
    //     { $project : { Edits:0 } }
    // ]
    // return await Sale.aggregate( aggregateList ) ;


}

saleSchema.statics.List = async ( PageNo, UserID ) => {
    const match = { Status: { $not: { $eq: "d" } } } ;
    const aggregateList = [
        
        { $sort: { _id:-1} },
        { $skip: PageNo*10 },
        { $limit: 10, },
        { $project : { Items:1, CreatedAt:1, UserID:1, Edits:1, Status:1 } },
        {
            $lookup: {
                from: 'users',
                let: { user_id: "$UserID" },
                pipeline : [
                    { $match: { $expr: { $eq: [ '$_id', '$$user_id' ] } } },
                    { $project : { _id:0, FullName:1 } }
                ],
                as: 'user_doc', 
            }
        },
        { $unwind: '$user_doc' },
                {
            $addFields : { 
                SaleID: '$_id',
                EditCount : { $size : "$Edits" }, 
                ItemCount : { $size : { $objectToArray : "$$ROOT.Items" } },
                UserName: "$user_doc.FullName" ,
            }
        },
        {
            $project: { _id:0, UserID:0, Items:0, Edits:0, user_doc:0 },
        },
    ] ;

    if ( UserID ) 
        match.UserID = mongoose.Types.ObjectId( UserID ) ;

    aggregateList.unshift( { $match : match, } ) ;

    return await Sale.aggregate( aggregateList ) ; 
}

saleSchema.statics.Delete = async ( SaleID ) => {

    const saleDoc = await Sale.findOne( { _id:SaleID, Status: { $ne: "d" } } ) ;
    if ( !saleDoc ) 
        throw { err: errData.resNotFound, info: "Sale resource not found or is deleted"}

    await Item.IncItemQty( saleDoc.Items ) ;
    saleDoc.Status = 'd';
    await saleDoc.save() ;
}


const Sale = mongoose.model( 'sales', saleSchema ) ;
module.exports = Sale;
