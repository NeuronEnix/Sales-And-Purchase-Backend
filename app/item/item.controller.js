const Item = require( './item.model.js' ) ;
const respond = require( '../../response.js' ) ;
const errData = respond.errData ;

module.exports.add  = async ( req, res, next ) => {
    const itemData  = req.body ;
    itemData.UserID = req.UserID ;
    await Item.AddNewItem( itemData ) ;
    return respond.ok( res ) ;
}

module.exports.update = async ( req, res, next ) => {
    const itemData    = req.body ;
    itemData.UserID   = req.UserID ;
    await Item.Update( itemData ) ;
    return respond.ok( res ) ;
}

module.exports.detail = async ( req, res ) => {
    const itemName = req.body.Name ;
    const item = await Item.Detail( itemName ) ;
    respond.ok( res, item ) ;
}

module.exports.search = async ( req, res ) => {
    const item = req.body.S ;
    let matchedItems = [] ; 
    if( item )
        matchedItems = await Item.find(
                            { Name : { $regex : new RegExp( item ) } },
                            { _id : 0, Name : 1 }
                        ).limit( 10 ) ;
    return respond.ok( res, matchedItems ) ;
}




