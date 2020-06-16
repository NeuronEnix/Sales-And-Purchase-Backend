const router = require( 'express' ).Router() ;
const purchase = require( './purchase.controller.js' ) ;

router.post( '/create' , purchase.create ) ;

module.exports.router = router