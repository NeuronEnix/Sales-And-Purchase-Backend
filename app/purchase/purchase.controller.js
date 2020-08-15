const User       = require( '../user/user.model.js'  ) ;
const respond    = require( '../../response.js'      ) ;
const Purchase   = require( './purchase.model.js'    ) ;
const ItemLogger = require( '../item/item.logger.js' ) ;

module.exports.create = async ( req, res ) => {
    const purchaseData = req.body ;
    purchaseData.UserID = req.UserID ;
    const purchase = await Purchase.Create( purchaseData ) ;
    respond.ok( res ) ;

    purchaseData.PurchaseID = purchase._id ;
    ItemLogger.ItemPurchased( purchaseData ) ;

}


module.exports.detail = async ( req, res ) => {
    const filter  = req.body ;
    const project = { _id:0, Items:1 } ;
    return respond.ok( res, await Purchase.findOne( filter , project ) ) ;
}

module.exports.listMy = async ( req, res ) => {
    const pageNo  = req.body.P;
    const filter  = { UserID:req.UserID } ;
    const project = { _id:1 } ;
    const doc = await Purchase.List( filter, project, pageNo ) ;
    let data = [];
    for( let d of doc ) {
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
    const project = { _id:1, UserID:1, Items:1 } ;
    let doc = await Purchase.List( {}, project, pageNo )
    let data = [];
    
    for( let d of doc ) {
        if(!d.UserID)continue;
        console.log( d )
        data.push({
            _id:d._id,
            UserName : (await User.findOne({_id:d.UserID},{_id:0,FullName:1})).FullName,
            SellerName : 'Seller'+pageNo,
            ItemCount : d.Items.length,
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