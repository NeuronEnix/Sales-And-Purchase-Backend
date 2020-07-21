const respond  = require( '../../response.js'   ) ;
const Purchase = require( './purchase.model.js' ) ;

module.exports.create = async ( req, res ) => {
    const purchaseData = req.body ;
    purchaseData.UserID = req.UserID ;
    await Purchase.Create( purchaseData ) ;
    return respond.ok( res ) ;
}

module.exports.detail = async ( req, res ) => {
    const filter  = req.body ;
    const project = { _id:0, Items:1 } ;
    return respond.ok( res, await Purchase.findOne( filter , project ) ) ;
}

module.exports.listMy = async ( req, res ) => {
    const filter  = { UserID:req.UserID } ;
    const project = { _id:1 } ;
    return respond.ok( res, await Purchase.List( filter, project ) ) ;
}

module.exports.listAll = async ( req, res ) => {
    const project = { _id:1 } ;
    return respond.ok( res, await Purchase.List( {}, project ) ) ;
}
