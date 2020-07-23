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
    const pageNo = req.body.P;
    const filter  = { UserID:req.UserID } ;
    const project = { _id:1 } ;
    const doc = await Purchase.List( filter, project, pageNo ) ;
    data = [];
    for( d of doc ) {
        data.push({
            _id:d._id,
            SellerName : 'Seller'+pageNo,
            ItemCount : 34,
        })
    }
    return respond.ok( res, data ) ;
}

module.exports.listAll = async ( req, res ) => {
    const pageNo = req.body.P;
    const project = { _id:1 } ;
    let doc = await Purchase.List( {}, project, pageNo )
    data = [];
    for( d of doc ) {
        data.push({
            _id:d._id,
            UserName : 'User1',
            SellerName : 'Seller'+pageNo,
            ItemCount : 34,
        })
    }
    
    return respond.ok( res, data ) ;
}

module.exports.update = async ( req, res ) => {
    console.log( await Purchase.findOneAndUpdate( { _id:req.body._id }, { $set : { Items:req.body.Items } } ) ) ;
    return respond.ok( res ) ;
}

module.exports.delete = async ( req, res ) => { 
    console.log( await Purchase.findByIdAndDelete( req.body._id ) ) ;
    return respond.ok( res ) ;
}