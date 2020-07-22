const router   = require( 'express' ).Router() ;
const seller   = require( './seller.controller.js' ) ;
const validate = require( '../../validator.js' ) ;

router.post( '/'    , validate.seller.search , seller.search ) ;
router.post( '/add' , validate.seller.add ,  seller.add   ) ;
module.exports.router = router