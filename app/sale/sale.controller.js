const Sale = require( './sale.model.js' ) ;
const respond = require( '../../response.js' ) ;

module.exports.create = async ( req, res ) => {
    try{
        const saleData = req.body.Items ;
        saleData.UserID = req.UserID ;
        const sale = await Sale.Create( saleData ) ;
        respond.ok( res ) ;
    } catch ( err ) {
        respond.err( res, err ) ;
    }
}
module.exports.listAll = async ( req, res ) => {
    return respond.ok( res, await Sale.List() ) ;
}

module.exports.listMy = async ( req, res ) => {
    return respond.ok( res, await Sale.List( { UserID:req.UserID } ) ) ;
}
