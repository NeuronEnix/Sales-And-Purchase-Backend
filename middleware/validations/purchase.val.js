const Joi = require( '@hapi/joi' ) ;
const { commonSchema } = require( "./common.val" );
const { sellerSchema } = require( "./seller.val" );

const purchase = {

    create : Joi.object({
        SellerName : sellerSchema.name,
        Items      : commonSchema.itemNameQtyPair,
    }),
    
    update : Joi.object({
        PurchaseID : commonSchema._id.required(),
        SellerName : sellerSchema.name,
        Items : commonSchema.itemNameQtyPair,
    }),

    detail : Joi.object({
        PurchaseID : commonSchema._id.required(),
    }),

    list : Joi.object({
        PageNo : commonSchema.pageNo,
        UserID : commonSchema._id,
    }),

    listEdits : Joi.object({
        PurchaseID : commonSchema._id.required(),
        EditIndex : commonSchema.pageNo,
    }),

    delete : Joi.object({
        PurchaseID: commonSchema._id.required(),
    }),

} ;

module.exports = { purchase };