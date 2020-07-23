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
    const pageNo = req.body.P;
    const filter  = { UserID:req.UserID } ;
    const project = { _id:1 } ;
    const doc = await Sale.List( filter, project );
    data = [];
    for( d of doc ) {
        data.push({
            _id:d._id,
            ItemCount : 34,
        })
    }
    return respond.ok( res, data ) ;
}

module.exports.listAll = async ( req, res ) => {
    const pageNo = req.body.P;
    const project = { _id:1 } ;
    let doc = await Sale.List( {}, project, pageNo )
    data = [];
    for( d of doc ) {
        data.push({
            _id:d._id,
            UserName : 'User'+pageNo,
            ItemCount : 34,
        })
    }
    return respond.ok( res, data ) ;
}


module.exports.update = async ( req, res ) => {
    await Sale.findOneAndUpdate( { _id:req.body._id }, { $set : { Items:req.body.Items } } ) ;
    return respond.ok( res ) ;
}

module.exports.delete = async ( req, res ) => { 
    console.log( await Sale.findByIdAndDelete( req.body._id ) ) ;
    return respond.ok( res ) ;
}