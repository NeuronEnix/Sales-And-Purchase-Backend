const router   = require( 'express' ).Router() ;
const seller   = require( './seller.controller.js' ) ;
const validate = require( './seller.validator.js'  ) ;

router.post( '/add' , validate.add ,  seller.add ) ;

module.exports.router = router