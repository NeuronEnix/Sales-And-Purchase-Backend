const ItemQtyLogger = require( './log/item.qty.log.js' ) ;

module.exports.ItemAdded = async ( itemData ) => {
    const log = new ItemQtyLogger() ;
    console.log( itemData)
    Object.assign( log, {
        Type : 'add',
        Item : itemData.Name,
        Qty  : itemData.LogQty, 
    }) ;
    log.save() ;
} ;

module.exports.ItemPurchased = async ( purchaseData ) => {
    const logData = [] ;
    for( const item of purchaseData.Items ) {
        logData.push( {
            Type : 'pur',
            Item : item.Name,
            Qty  : item.LogQty, 
            RefID : purchaseData.PurchaseID,
        }) ;
    }
    ItemQtyLogger.insertMany( logData );
} ;

module.exports.ItemSold = async ( saleData ) => {
    const logData = [] ;
    for( const item of saleData.Items ) {
        logData.push( {
            Type : 'sal',
            Item : item.Name,
            Qty  : item.LogQty, 
            RefID : saleData.SaleID,
        }) ;
    }
    ItemQtyLogger.insertMany( logData );
} ;