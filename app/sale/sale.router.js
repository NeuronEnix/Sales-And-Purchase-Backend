const router = require( 'express' ).Router() ;
const sale   = require( './sale.controller.js' ) ;
const validate = require( './sale.validator.js' ) ;

router.post( '/create' , validate.create , sale.create ) ;

module.exports.router = router