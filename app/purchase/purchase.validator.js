const Joi = require( '@hapi/joi' ) ;

const respond = require( '../../response.js' ) ;
const errData = respond.errData ;

const Items = Joi.object().keys({
    Name : Joi.string().trim().min(2).max(10).required(),
    Qty : Joi.number().positive().required()
})

const itemSchema = Joi.array().items( Items ) ;

const createSchema = Joi.object({
    SellerName : Joi.string().trim().min(1).max(10).required(),
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
