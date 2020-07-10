const IQtyLogger = require( './log/item.qty.log.js' ) ;

module.exports.add = ( req, res, next ) => {
    const itemData = req.body ; 
    const qtyLogData = {
        UserID : req.user._id,
        Item   : { Name : itemData.Name, Qty : itemData.Qty },
        Type   : 'a'
    }
    IQtyLogger.Log( qtyLogData ) ;
}