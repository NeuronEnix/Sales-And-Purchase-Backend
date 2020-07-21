const Seller = require( './seller.model.js' ) ;
const respond = require( '../../response.js' ) ;

module.exports.add = async ( req, res ) => {
        req.body.UserID = req.UserID ;
        const sellerData = req.body ;
        await Seller.AddNewSeller( sellerData ) ;
        respond.ok( res ) ;
}