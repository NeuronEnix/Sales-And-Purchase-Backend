const mongoose = require( 'mongoose' ) ;

const Sale     = mongoose.model( 'sales'     ) ;
const Purchase = mongoose.model( 'purchases' ) ;

const Item       = require( './item.model'       ) ;
const respond    = require( '../../response'     ) ;
const ItemLogger = require( './item.logger'      ) ;

const { DB_LIMITER } = require ( '../../server.config' )

module.exports.add  = async ( req, res, next ) => {
    const itemData  = req.body ;
    itemData.UserID = req.UserID ;
    await Item.AddNewItem( itemData ) ;

    ItemLogger.ItemAdded( itemData ) ;
    respond.ok( res ) ;
    return next() ;
} ;

module.exports.update = async ( req, res, next ) => {
    const itemData    = req.body ;
    itemData.UserID   = req.UserID ;
    await Item.Update( itemData ) ;

    respond.ok( res ) ;
    return next() ;
} ;

module.exports.detail = async ( req, res, next ) => {
    const itemName = req.query.ItemName ;
    const item = await Item.Detail( itemName ) ;

    respond.ok( res, item ) ;
    return next() ;
} ;

module.exports.search = async ( req, res, next ) => {
    const itemName = req.query.ItemName ;
    const regExItemName = ".*" + itemName.split("").join( ".*" ) + ".*" ; 
    const itemNameList = await Item.aggregate([
        { $match : { Name : new RegExp( regExItemName ) } },
        { $project: { Name:1 } },
        { $sort:{ Item:1 } },
        { $limit: 10 } ,
        {
            $group : {
                _id: null,
                Items : { $push :  "$Name" }
            }
        },
        { $project: { _id:0 } },
    ])

    respond.ok( res, itemNameList[0] ) ;
    return next() ;
} ;

module.exports.stock = async ( req, res, next ) => {
    const pageNo = req.query.PageNo
    const filter = {};
    const project = { _id:0, Name:1, Qty:1, Unit:1 };
    const items = await Item.find( filter, project ).skip( pageNo*10 ).limit( 10 ).sort( { Name: 1 } )

    respond.ok( res, items );
    return next() ;

} ;

module.exports.purchases = async ( req, res, next ) => {
    const { PageNo, ItemName } = req.query ;
    const matchQuery = {}
    matchQuery[ `Items.${ItemName}`] = { $exists: true } ;
    const aggregateList = [
        { $match : matchQuery },
        { $sort: { _id:-1} },
        { $skip: PageNo * DB_LIMITER.ITEMS.PURCHASE_LIST_PER_PAGE },
        { $limit: DB_LIMITER.ITEMS.PURCHASE_LIST_PER_PAGE },
        { $project : { Items:1, CreatedAt:1, UserID:1, SellerID:1 } },
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
                UserName: "$user_doc.FullName" ,
                SellerName: "$seller_doc.Name",
                Qty : `$Items.${ItemName}`,
            }
        },
        {
            $project: { _id:0, SellerID:0, UserID:0, Items:0, user_doc:0, seller_doc:0 },
        },
    ] ;

    const itemPurchases =  await Purchase.aggregate( aggregateList ) ; 
    respond.ok( res, itemPurchases ) ; 
    return next() ;
} ;

module.exports.sales = async ( req, res, next ) => {
    const { PageNo, ItemName } = req.query ;
    const matchQuery = {}
    matchQuery[ `Items.${ItemName}`] = { $exists: true } ;
    const aggregateList = [
        { $match : matchQuery },
        { $sort: { _id:-1} },
        { $skip: PageNo * DB_LIMITER.ITEMS.SALE_LIST_PER_PAGE },
        { $limit: DB_LIMITER.ITEMS.SALE_LIST_PER_PAGE },
        { $project : { Items:1, CreatedAt:1, UserID:1, } },
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
                SaleID: "$_id",
                UserName: "$user_doc.FullName" ,
                Qty : `$Items.${ItemName}`,
            }
        },
        {
            $project: { _id:0, SellerID:0, UserID:0, Items:0, user_doc:0, seller_doc:0 },
        },
    ] ;

    const itemSales =  await Sale.aggregate( aggregateList ) ; 
    respond.ok( res, itemSales ) ; 
    return next() ;
} ;
