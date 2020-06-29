const Sale = require( './sale.model.js' ) ;
const respond = require( '../../response.js' ) ;

module.exports.create = async ( req, res ) => {
    try{
        const itemData = req.body.Items ;
        const sale = await Sale.Create( itemData ) ;
        respond.ok( res ) ;
    } catch ( err ) {
        respond.err( res, err ) ;
    }
}