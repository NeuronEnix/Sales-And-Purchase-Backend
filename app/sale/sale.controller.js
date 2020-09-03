const moment = require( 'moment' ) ;
const ObjectID = require( 'mongoose').Types.ObjectId ;

const Sale       = require( './sale.model.js'        ) ;
const respond    = require( '../../response.js'      ) ;

const errData = respond.errData;

module.exports.create = async ( req, res, next ) => {
    const saleData = req.body ;

    saleData.UserID = req.UserID ;
    saleData.CreatedAt = moment() ;

    const sale = await Sale.Create( saleData ) ;
    respond.ok( res , { SaleID: sale._id } ) ;

    return next() ;

}

module.exports.update = async ( req, res, next ) => {

    const saleData = req.body ;
    saleData.CreatedAt = moment() ;
    
    await Sale.Update( saleData ) ;
    respond.ok( res ) ;
    return next() ;

}

module.exports.detail = async ( req, res, next ) => {
    const SaleID = req.query.SaleID ;
    const saleDetail = await Sale.findById( SaleID, '-_id Items' ) ;

    respond.ok( res, saleDetail ) ;
    return next();
}

module.exports.editDetail = async ( req, res, next ) => {
    const { SaleID, EditIndex } = req.query ;

    const saleEditDetail = await Sale.aggregate([
        { $match : { _id: ObjectID( SaleID ) } },
        { $project : { _id:0, EditedData: { $arrayElemAt : [ "$Edits", parseInt( EditIndex ) ] }}},
    ]) ;

    respond.ok( res, saleEditDetail[0].EditedData ) ;
    return next();
}

module.exports.list = async ( req, res, next ) => {
    const { PageNo, UserID }  = req.query ;
    respond.ok( res, await Sale.List( PageNo, UserID ) ) ;
    return next() ;
}



module.exports.delete = async ( req, res ) => { 
    const { SaleID } = req.body ; 
    const deletedDoc = await Sale.findByIdAndDelete( SaleID ) ;

    if ( deletedDoc )
        respond.ok( res ) ;
    else {
        respond.err( res, { err : errData.resNotFound, info: 'Invalid SaleID' }) ;
    }

}