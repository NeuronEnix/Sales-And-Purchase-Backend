const Item       = require( './item.model.js'   ) ;
const respond    = require( '../../response.js' ) ;
const ItemLogger = require( './item.logger.js'  ) ;

module.exports.add  = async ( req, res, next ) => {
    const itemData  = req.body ;
    itemData.UserID = req.UserID ;
    await Item.AddNewItem( itemData ) ;

    respond.ok( res ) ;
    ItemLogger.ItemAdded( itemData ) ;

    return next() ;
}

module.exports.update = async ( req, res, next ) => {
    const itemData    = req.body ;
    itemData.UserID   = req.UserID ;
    await Item.Update( itemData ) ;
    respond.ok( res ) ;

    return next();
}

module.exports.detail = async ( req, res, next ) => {
    const itemName = req.body.Name ;
    const item = await Item.Detail( itemName ) ;
    respond.ok( res, item ) ;
    
    return next();
}

module.exports.search = async ( req, res ) => {
    const item = req.body.S ;
    let matchedItems = [] ; 
    if( item )
        matchedItems = await Item.find(
                            { Name : { $regex : new RegExp( item ) } },
                            { _id : 0, Name : 1 }
                        ).limit( 10 ) ;
    respond.ok( res, matchedItems ) ;
    
    return next();
}




