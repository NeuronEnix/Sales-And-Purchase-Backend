const Seller = require( './seller.model.js' ) ;
const respond = require( '../../response.js' ) ;

module.exports.add = async ( req, res ) => {
        req.body.UserID = req.UserID ;
        const sellerData = req.body ;
        await Seller.AddNewSeller( sellerData ) ;
        respond.ok( res ) ;
}

module.exports.search = async ( req, res, next ) => {
    const sellerName = req.query.SellerName ;
    // Eg: sellerName = "abc" -> regExSellerName = .*a.*b.*c.*
    const regExSellerName = ".*" + sellerName.split("").join( ".*" ) + ".*" ; 
    const sellerNameList = await Seller.aggregate([
        { $match : { Name : new RegExp( regExSellerName ) } },
        { $project: { Name:1 } },
        { $sort:{ Name:1 } },
        { $limit: 10 } ,
        {
            $group : {
                _id: null,
                SellerNames : { $push :  "$Name" }
            }
        },
        { $project: { _id:0 } },
    ])

    respond.ok( res, sellerNameList[0] ) ;
    return next() ;
} ;