const ItemQtyLogger = require( './log/item.qty.log.js' ) ;
const ItemUnitLogger = require( './log/item.unit.log.js' ) ;
module.exports.add = ( req ) => {
    const itemData = req.body ; 
    const qtyLogData = {
        UserID : req.UserID,
        Item   : { Name : itemData.Name, Qty : itemData.Qty },
        Type   : 'a'
    }
    ItemQtyLogger.Log( qtyLogData ) ;
}

module.exports.update = ( req ) => {
    const itemData = req.body ; 
    if ( itemData.Qty ) {
        const qtyLogData = {
            UserID : req.UserID,
            Item   : { Name : itemData.Name, Qty : itemData.Qty },
            Type   : 'u'
        }
        ItemQtyLogger.Log( qtyLogData ) ;
    }
    if ( itemData.Unit ) {
        const unitLogData = {
            UserID : req.UserID,
            Item   : { Name : itemData.Name, Unit : itemData.Unit },
            Type   : 'u'
        }
        ItemUnitLogger.Log( unitLogData ) ;
    }
}