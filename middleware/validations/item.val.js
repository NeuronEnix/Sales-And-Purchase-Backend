const Joi = require( '@hapi/joi' ) ;

const itemSchema = {
    name : Joi.string().trim().min( 1 ).max( 50 ).required(),
    unit : Joi.string().trim().min( 1 ).max( 5  ).required(),
    qty  : Joi.number().positive().required(),
} ;

const item = {

    add : Joi.object({
        Name : itemSchema.name,
        Unit : itemSchema.unit,
        Qty  : itemSchema.qty,
    }),

    update : Joi.object({
        Name : itemSchema.name,
        Unit : itemSchema.unit,
        Qty  : itemSchema.qty,
    }).or( 'Unit', 'Qty' ),

    search : Joi.object({
        ItemName : itemSchema.name,
    }),

    detail : Joi.object({
        ItemName : itemSchema.name,
    }),

    stock : Joi.object({
            PageNo : Joi.number()
    }),

    purchases : Joi.object({
        PageNo : Joi.number(),
        ItemName : itemSchema.name,
    }),

    sales : Joi.object({
        PageNo : Joi.number(),
        ItemName : itemSchema.name,
    }),
    
} ;

module.exports = { itemSchema, item };