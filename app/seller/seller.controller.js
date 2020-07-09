const Seller = require( './seller.model.js' ) ;
const respond = require( '../../response.js' ) ;

module.exports.add = async ( req, res ) => {
    try{
        req.body.UserID = req.user._id ;
        const sellerData = req.body ;
        await Seller.AddNewSeller( sellerData ) ;
        respond.ok( res ) ;
    } catch ( err ) {
        respond.err( res, err ) ;
    }
}