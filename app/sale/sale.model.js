const mongoose = require( 'mongoose' ) ;

const Item    = require( '../item/item.model.js'     ) ;
const errData = require( '../../response'            ).errData ;

const ObjID = mongoose.Schema.Types.ObjectId ;

let saleSchema = new mongoose.Schema ({
    UserID    : { type : ObjID, required : true, index : true, ref : 'users'   } ,
    CreatedAt : { type : Date , required : true                                } ,
    Items     : { type : {}   , required : true                                } ,
    Edits     : { type : [ { CreatedAt:Date, Items:{}, _id:false, } ]          } ,
});

saleSchema.statics.Create = async ( saleData ) => {
    
    await Item.DecItemQty( saleData.Items ) ;

    const sale = new Sale() ;
    Object.assign( sale, saleData ) ;
    return await sale.save() ;

}

saleSchema.statics.Update = async ( saleUpdateData ) => {

    const saleDoc = await Sale.findById( saleUpdateData.SaleID ) ;
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

    Object.assign( saleDoc, saleUpdateData ) ;
    return await saleDoc.save() ;

}

saleSchema.statics.List = async ( PageNo, UserID ) => {
    const aggregateList = [
        
        { $sort: { _id:-1} },
        { $skip: PageNo*10 },
        { $limit: 10, },
        { $project : { Items:1, CreatedAt:1, UserID:1, Edits:1 } },
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
        aggregateList.unshift( { $match : { UserID: mongoose.Types.ObjectId( UserID ) }, } ) ;

    return await Sale.aggregate( aggregateList ) ; 
}


const Sale = mongoose.model( 'sales', saleSchema ) ;
module.exports = Sale;
