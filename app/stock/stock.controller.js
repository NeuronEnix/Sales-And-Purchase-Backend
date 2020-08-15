const Item = require( '../item/item.model.js' ) ;
const ItemLog = require( '../item/log/item.qty.log.js' ) ;
const respond = require( '../../response.js' ) ;
const errData = respond.errData ;

module.exports.itemList  = async ( req, res, next ) => {
    const pageNo = req.query.PageNo
    const filter = {};
    const project = { _id:0, Name:1, Qty:1, Unit:1 };
    const items = await Item.find( filter, project ).skip( pageNo*10 ).limit( 10 ).sort( { Name: 1 } )
    return respond.ok( res, items );
}

module.exports.itemDetail = async ( req, res, next ) => {
    const { PageNo, ItemName, Types } = req.query ;
    const filter = { Item: ItemName, Type: { $in : Types } } ;
    const project = { _id:0, Type:1, Qty:1 } ;
    const itemLogDetail = await ItemLog.find( filter, project )
        .skip( PageNo*10 )
        .limit( 10 )
        .sort( '-_id' ) ;
    respond.ok( res, itemLogDetail ) ;    
}

