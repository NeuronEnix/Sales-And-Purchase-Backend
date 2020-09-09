const moment = require( 'moment' ) ;
const ObjectID = require( 'mongoose').Types.ObjectId ;
const respond    = require( '../../response.js'      ) ;
const Purchase   = require( './purchase.model.js'    ) ;

const errData = respond.errData;

module.exports.create = async ( req, res, next ) => {
    const purchaseData = req.body ;

    purchaseData.UserID = req.UserID ;
    purchaseData.CreatedAt = moment() ;

    const purchase = await Purchase.Create( purchaseData ) ;
    respond.ok( res , { PurchaseID: purchase._id } ) ;

    return next() ;

}

module.exports.update = async ( req, res, next ) => {

    const purchaseData = req.body ;
    purchaseData.CreatedAt = moment() ;
    
    await Purchase.Update( purchaseData ) ;
    respond.ok( res ) ;
    return next() ;

}

module.exports.detail = async ( req, res, next ) => {
    const PurchaseID = req.query.PurchaseID ;
    const purchaseDetail = await Purchase.findOne( { _id : PurchaseID, Status : { $ne : "d" } } , { _id:0, Items:1 }  ) ;
    if ( !purchaseDetail )
        throw { err: errData.resNotFound, info: "Purchase resource not found or is deleted"}

    respond.ok( res, purchaseDetail ) ;
    return next();
}

module.exports.editDetail = async ( req, res, next ) => {
    
    const { PurchaseID, EditIndex } = req.query ;

    const purchaseEditDetail = await Purchase.aggregate([
        { $match : { _id: ObjectID( PurchaseID ), Status: { $ne: "d" } } },
        { $project : { _id:0, EditedData: { $arrayElemAt : [ "$Edits", parseInt( EditIndex ) ] }}},
    ]) ;
    
    if ( !purchaseEditDetail[0] )
        throw { err: errData.resNotFound, info: "Edited details not found or is deleted"}

    respond.ok( res, purchaseEditDetail[0].EditedData ) ;
    return next();
}

module.exports.list = async ( req, res, next ) => {
    const { PageNo, UserID }  = req.query ;
    respond.ok( res, await Purchase.List( PageNo, UserID ) ) ;
    return next() ;
}

module.exports.delete = async ( req, res, next ) => { 
    const { PurchaseID } = req.body ; 
    await Purchase.Delete( PurchaseID ) ;

    respond.ok( res ) ;
    return next() ;
}