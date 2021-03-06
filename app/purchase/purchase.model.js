const mongoose = require( 'mongoose' ) ;

const Item    = require( '../item/item.model.js'     ) ;
const Seller  = require( '../seller/seller.model.js' ) ;
const errData = require( '../../response'            ).errData ;

const ObjID = mongoose.Schema.Types.ObjectId ;

let purchaseSchema = new mongoose.Schema ({
    SellerID  : { type : ObjID, required : true, index : true, ref : 'sellers' } ,
    UserID    : { type : ObjID, required : true, index : true, ref : 'users'   } ,
    CreatedAt : { type : Date , required : true                                } ,
    Items     : { type : {}   , required : true                                } ,
    Edits     : { type : [ { CreatedAt:Date, Items:{}, _id:false, } ]          } ,
    Status    : { type : String, default:"n" }, // n -> new; e -> edited; d -> deleted 
});

purchaseSchema.statics.Create = async ( purchaseData ) => {

    purchaseData.SellerID = await Seller.getID( purchaseData.SellerName ) ; 
    await Item.IncItemQty( purchaseData.Items ) ;    

    const purchase = new Purchase() ;
    Object.assign( purchase, purchaseData ) ;
    return purchase.save() ;
}

purchaseSchema.statics.Update = async ( purchaseUpdateData ) => {

    const purchaseDoc = await Purchase.findOne( { _id:purchaseUpdateData.PurchaseID, Status: { $ne: "d" } } ) ;
    if ( !purchaseDoc ) 
        throw { err: errData.resNotFound, info: "Purchase resource not found or is deleted"}

    await Item.DecItemQty( purchaseDoc.Items        ) ;
    await Item.IncItemQty( purchaseUpdateData.Items ) ;  

    purchaseDoc.Edits.unshift( { //Adds recent changes to beginning of array
        CreatedAt : purchaseDoc.CreatedAt,
        Items     : purchaseDoc.Items,
    }) ;
    purchaseDoc.Status = "e" ;
    Object.assign( purchaseDoc, purchaseUpdateData ) ;
    return await purchaseDoc.save() ;

}

purchaseSchema.statics.List = async ( PageNo, UserID ) => {
    const match = { Status: { $not: { $eq: "d" } } } ;
    const aggregateList = [
        
        { $sort: { _id:-1} },
        { $skip: PageNo*10 },
        { $limit: 10, },
        { $project : { Items:1, CreatedAt:1, UserID:1, SellerID:1, Edits:1, Status: 1 } },
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
            $lookup: {
                from: 'sellers',
                let: { seller_id: "$SellerID" },
                pipeline : [
                    { $match: { $expr: { $eq: [ '$_id', '$$seller_id' ] } } },
                    { $project : { _id:0, Name:1 } }
                ],
                as: 'seller_doc', 
            }
        },
        { $unwind: '$seller_doc', },
        {
            $addFields : { 
                PurchaseID: "$_id",
                EditCount : { $size : "$Edits" }, 
                ItemCount : { $size : { $objectToArray : "$$ROOT.Items" } },
                UserName: "$user_doc.FullName" ,
                SellerName: "$seller_doc.Name",
            }
        },
        {
            $project: { _id:0, SellerID:0, UserID:0, Items:0, Edits:0, user_doc:0, seller_doc:0 },
        },
    ] ;

    if ( UserID ) 
        match.UserID = mongoose.Types.ObjectId( UserID );
        
    aggregateList.unshift( { $match : match, } ) ;

    return await Purchase.aggregate( aggregateList ) ; 
}

purchaseSchema.statics.Delete = async ( PurchaseID ) => {

    const purchaseDoc = await Purchase.findOne( { _id:PurchaseID, Status: { $ne: "d" } } ) ;
    if ( !purchaseDoc ) 
        throw { err: errData.resNotFound, info: "Purchase resource not found or is deleted"}

    await Item.DecItemQty( purchaseDoc.Items ) ;
    purchaseDoc.Status = 'd' ;
    await purchaseDoc.save() ;
}

const Purchase = mongoose.model( 'purchases', purchaseSchema ) ;
module.exports = Purchase;
