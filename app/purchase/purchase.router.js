const router = require( 'express' ).Router() ;
const purchase = require( './purchase.controller.js' ) ;
const validate = require( '../../validator.js' ) ;

router.post( '/create' , validate.purchase.create ,  purchase.create ) ;

module.exports.router = router