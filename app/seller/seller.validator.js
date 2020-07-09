const Joi = require( '@hapi/joi' ) ;

const respond = require( '../../response.js' ) ;
const errData = respond.errData ;

const addSchema = Joi.object({
    Name : Joi.string().trim().min(1).max(10).required(),
})
module.exports.add = async ( req, res, next ) => {
    try { 
        await addSchema.validateAsync( req.body ) ;
        return next() ; 
    } catch ( err ) { console.log( err) ; return respond.err( res, { err : errData.validationErr, info : err.details[0].message } ) ; }
} ;
