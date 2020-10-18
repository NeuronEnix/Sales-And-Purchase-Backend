const Joi = require( '@hapi/joi' ) ;
const { commonSchema } = require( "./common.val" );

const sale = {

    create : Joi.object({
        Items : commonSchema.itemNameQtyPair,
    }),
    
    update : Joi.object({
        SaleID : commonSchema._id.required(),
        Items : commonSchema.itemNameQtyPair,
    }),

    detail : Joi.object({
        SaleID : commonSchema._id.required(),
    }),

    list : Joi.object({
        PageNo : commonSchema.pageNo,
        UserID : commonSchema._id,
    }),
    
    listEdits : Joi.object({
        SaleID : commonSchema._id.required(),
        EditIndex : commonSchema.pageNo,
    }),

    delete : Joi.object({
        SaleID: commonSchema._id.required(),
    }),

} ;

module.exports = { sale };
