const Bill = require( './bill.model.js' ) ;
const respond = require( '../../response.js' ) ;

module.exports.create = async ( req, res ) => {
    try{
        const itemData = req.body.Items ;
        const bill = await Bill.Create( itemData ) ;
        respond.ok( res ) ;
    } catch ( err ) {
        console.log( 'Error : Billing' )
        respond.err( res, err ) ;
    }
}