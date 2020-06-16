const Joi = require( '@hapi/joi' ) ;

const respond = require( '../../response.js' ) ;
const errData = respond.errData ;

const addSchema = Joi.object({
    Name   : Joi.string().trim().min(1).max(10).required(),
    Unit   : Joi.string().trim().min(1).max(5).required(),
    Qty    : Joi.number().positive().required(),
}) ;

const updateSchema = Joi.object({
    Name   : Joi.string().trim().min(1).max(10).required(),
    Unit   : Joi.string().trim().min(1).max(5),
    Qty    : Joi.number().positive(),
})
    .or( 'Unit', 'Qty' ) ;

const detailSchema = Joi.object({
    Name   : Joi.string().trim().min(1).max(10).required(),
}) ;

module.exports.add = async ( req, res, next ) => {
    try { await addSchema.validateAsync( req.body ) ; return next() ; }
    catch ( err ) { return respond.err( res, { err : errData.validationErr, info : err.details[0].message } ) ; }
} ;

module.exports.update = async ( req, res, next ) => {
    try { await updateSchema.validateAsync( req.body ) ; return next() ; }
    catch ( err ) { return respond.err( res, { err : errData.validationErr, info : err.details[0].message } ) ; }
} ;

module.exports.detail = async ( req, res, next ) => {
    try { await detailSchema.validateAsync( req.body ) ; return next() ; }
    catch ( err ) { return respond.err( res, { err : errData.validationErr, info : err.details[0].message } ) ; }
} ;