const router = require( 'express' ).Router() ;
const purchase = require( './purchase.controller.js' ) ;
const validate = require( './purchase.validator.js' ) ;

router.post( '/create' , validate.create ,  purchase.create ) ;

module.exports.router = router