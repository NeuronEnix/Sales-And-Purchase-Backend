const Item       = require( './item.model'       ) ;
const respond    = require( '../../response'     ) ;
const ItemLogger = require( './item.logger'      ) ;
const ItemQtyLog = require( './log/item.qty.log' ) ;

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
    const filter  = {};
    const project = { _id:0, Name:1, Qty:1, Unit:1 };
    const items = await Item.find( filter, project ).skip( pageNo*10 ).limit( 10 ).sort( { Name: 1 } )

    respond.ok( res, items );
    return next() ;

} ;

module.exports.transaction = async ( req, res, next ) => {
    const { PageNo, ItemName, TransactionType } = req.query ;
    const filter  = { Item: ItemName, Type: { $in : TransactionType } } ;
    const project = { _id:0, Type:1, Qty:1 } ;
    const itemLogDetail = await ItemQtyLog.find( filter, project )
        .skip( PageNo*10 )
        .limit( 10 )
        .sort( '-_id' ) ;

    respond.ok( res, itemLogDetail ) ; 
    return next() ;
} ;


