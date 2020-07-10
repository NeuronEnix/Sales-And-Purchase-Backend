const Joi = require( '@hapi/joi' ) ;

const respond = require( '../../response.js' ) ;
const errData = respond.errData ;

const { _validator } = require('../../validation.js') ;
const { _email, _pass, _fullName, _type } = _validator.User ;

const loginSchema = Joi.object({
    Email    : Joi.string().trim().min(_email.min).max(_email.max).required(),
    Password : Joi.string().trim().min(_pass.min ).max(_pass.max ).required(),
}) ;

const signupSchema = Joi.object({
    FullName : Joi.string().trim().min(_fullName.min).max(_fullName.max).required(),
    Email    : Joi.string().trim().min(_email.min).max(_email.max).required(),
    Password : Joi.string().trim().min(_pass.min ).max(_pass.max ).required(),
    Type     : Joi.string().trim().min(_type.min ).max(_type.max ).required(),
}) ;

module.exports.login = async ( req, res, next ) => {
    try { await loginSchema.validateAsync( req.body ) ; return next() ; }
    catch ( err ) { return respond.err( res, { err : errData.validationErr, info : err.details[0].message } ) ; }
} ;

module.exports.signup = async ( req, res, next ) => {
    try { await signupSchema.validateAsync( req.body ) ; return next() ; }
    catch ( err ) { return respond.err( res, { err : errData.validationErr, info : err.details[0].message } ) ; }
} ;