const Joi = require( '@hapi/joi' ) ;

const sellerSchema = {
    name : Joi.string().trim().min( 1 ).max( 50 ).required(),
} ;

const seller = {

    add : Joi.object({
        Name : sellerSchema.name,
    }),

    search : Joi.object({
        SellerName : sellerSchema.name,
    }),
    
} ;

module.exports = { sellerSchema, seller };
