const Joi = require( '@hapi/joi' ) ;

const respond = require( '../../response.js' ) ;
const errData = respond.errData ;

const { _validator } = require('../../validation.js') ;
const { _name, _unit } = _validator.Item ;

const addSchema = Joi.object({
    Name   : Joi.string().trim().min(_name.min ).max(_name.max ).required(),
    Unit   : Joi.string().trim().min(_unit.min ).max(_unit.max ).required(),
    Qty    : Joi.number().positive().required(),
}) ;

const updateSchema  = Joi.object({
    Name   : Joi.string().trim().min(_name.min ).max(_name.max ).required(),
    Unit   : Joi.string().trim().min(_unit.min ).max(_unit.max ).required(),
    Qty    : Joi.number().positive().required(),
})
    .or( 'Unit', 'Qty' ) ;

const detailSchema = Joi.object({
    Name   : Joi.string().trim().min(1).max(10).required(),
}) ;

const searchSchema = Joi.object({
    s : Joi.string().trim().min(1).max(10).required(),
}) ;

const validate = async ( req, res, next, schema ) => {
    try { await schema.validateAsync( req.body ) ; return next() ; }
    catch ( err ) { return respond.err( res, { err : errData.validationErr, info : err.details[0].message } ) ; }
} ;

module.exports.add    = async ( req, res, next ) => { validate( req, res, next, addSchema     ) ; } ;
module.exports.update = async ( req, res, next ) => { validate( req, res, next, updateSchema  ) ; } ;
module.exports.detail = async ( req, res, next ) => { validate( req, res, next, detailSchema  ) ; } ;
module.exports.search = async ( req, res, next ) => {
    try { await searchSchema.validateAsync( req.body ) ; return next() ; }
    catch ( err ) { return respond.err( res, { err : errData.validationErr } ) ; } ;
} ;
