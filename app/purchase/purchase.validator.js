const Joi = require( '@hapi/joi' ) ;

const respond = require( '../../response.js' ) ;
const errData = respond.errData ;

const { _validator } = require('../../validation.js') ;

const { _name } = _validator.Item ;
const Items = Joi.object({
    Name : Joi.string().trim().min(_name.min ).max(_name.max ).required(),
    Qty  : Joi.number().positive().required()
})

const itemSchema = Joi.array().items( Items ) ;

const _sellerName = _validator.Seller._name ;
const createSchema = Joi.object({
    SellerName : Joi.string().trim().min(_sellerName.min ).max(_sellerName.max ).required(),
    Items      : Joi.array().min( 1 ).required()
})
module.exports.create = async ( req, res, next ) => {
    try { 
        const createSchemaValidation = createSchema.validateAsync( req.body     ) ;
        const itemSchemaValidation   = itemSchema.validateAsync( req.body.Items ) ;
        await createSchemaValidation ;
        await itemSchemaValidation   ;
        return next() ; 
    } catch ( err ) { console.log( err) ; return respond.err( res, { err : errData.validationErr, info : err.details[0].message } ) ; }
} ;
