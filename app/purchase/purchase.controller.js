const Purchase = require( './purchase.model.js' ) ;
const respond = require( '../../response.js' ) ;

module.exports.create = async ( req, res ) => {
    try{
        const purchaseData = req.body ;
        console.log('dataCame')
        const purchase = await Purchase.Create( purchaseData ) ;
        respond.ok( res ) ;
    } catch ( err ) {
        console.log( 'Error : Purchasing' ) ;
        respond.err( res, err ) ;
    }
}