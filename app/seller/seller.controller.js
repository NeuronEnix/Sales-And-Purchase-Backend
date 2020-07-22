const Seller = require( './seller.model.js' ) ;
const respond = require( '../../response.js' ) ;

module.exports.add = async ( req, res ) => {
        req.body.UserID = req.UserID ;
        const sellerData = req.body ;
        await Seller.AddNewSeller( sellerData ) ;
        respond.ok( res ) ;
}

module.exports.search = async ( req, res ) => {
        const sellerName = req.body.S ;
        let matchedNames = [] ; 
        if( sellerName )
            matchedNames = await Seller.find(
                                { Name : { $regex : new RegExp( sellerName ) } },
                                { _id : 0, Name : 1 }
                            ).limit( 10 ) ;
        return respond.ok( res, matchedNames ) ;
    }