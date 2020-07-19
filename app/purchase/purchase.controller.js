const Purchase = require( './purchase.model.js' ) ;
const respond = require( '../../response.js' ) ;

module.exports.create = async ( req, res ) => {
    try{
        const purchaseData = req.body ;
        purchaseData.UserID = req.UserID ;
        await Purchase.Create( purchaseData ) ;
        respond.ok( res ) ;
    } catch ( err ) {
        respond.err( res, err ) ;
    }
}

module.exports.listAll = async ( req, res ) => {
    return respond.ok( res, await Purchase.List() ) ;
}
module.exports.listMy = async ( req, res ) => {
    return respond.ok( res, await Purchase.List( { UserID:req.UserID } ) ) ;
}
