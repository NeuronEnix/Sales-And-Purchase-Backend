const router = require( 'express' ).Router() ;
const bill = require( './bill.controller.js' ) ;

router.post( '/create' , bill.create ) ;

module.exports.router = router