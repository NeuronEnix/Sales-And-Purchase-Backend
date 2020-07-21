const Sale    = require( './sale.model.js'   ) ;
const respond = require( '../../response.js' ) ;

module.exports.create = async ( req, res ) => {
    const saleData = req.body ;
    saleData.UserID = req.UserID ;
    await Sale.Create( saleData ) ;
    return respond.ok( res ) ;
}

module.exports.detail = async ( req, res ) => {
    const filter  = req.body ;
    const project = { _id:0, Items:1 } ;
    return respond.ok( res, await Sale.findOne( filter , project ) ) ;
}

module.exports.listMy = async ( req, res ) => {
    const filter  = { UserID:req.UserID } ;
    const project = { _id:1 } ;
    return respond.ok( res, await Sale.List( filter, project ) ) ;
}

module.exports.listAll = async ( req, res ) => {
    const project = { _id:1 } ;
    return respond.ok( res, await Sale.List( {}, project ) ) ;
}