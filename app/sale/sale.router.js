const router = require( 'express' ).Router() ;
const sale   = require( './sale.controller.js' ) ;
const validate = require( '../../validator.js' ) ;

router.post( '/create' , validate.sale.create , sale.create ) ;

module.exports.router = router