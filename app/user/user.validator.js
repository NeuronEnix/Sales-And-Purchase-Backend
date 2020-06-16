const Joi = require( '@hapi/joi' ) ;
const respond = require( '../../response.js' ) ;
const errData = respond.errData ;

const loginSchema = Joi.object({
    Email    : Joi.string().trim().min(1).max(10).required(),
    Password : Joi.string().trim().min(1).max(10).required(),
}) ;

const signupSchema = Joi.object({
    FullName : Joi.string().trim().min(1).max(10).required(),
    Email    : Joi.string().trim().min(1).max(10).required(),
    Password : Joi.string().trim().min(1).max(10).required(),
    Type     : Joi.string().trim().min(1).max(1 ).required(),
}) ;

module.exports.login = async ( req, res, next ) => {
    try { await loginSchema.validateAsync( req.body ) ; return next() ; }
    catch ( err ) { return respond.err( res, { err : errData.validationErr, info : err.details[0].message } ) ; }
} ;

module.exports.signup = async ( req, res, next ) => {
    try { await signupSchema.validateAsync( req.body ) ; return next() ; }
    catch ( err ) { return respond.err( res, { err : errData.validationErr, info : err.details[0].message } ) ; }
} ;