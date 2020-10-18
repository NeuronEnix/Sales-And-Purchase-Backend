const router   = require( 'express' ).Router() ;

const seller   = require( './seller.controller' ) ;
const { validator } = require( "../../middleware/validator" ) ;

router.get( '/'     , validator.seller.search , seller.search ) ;

router.post( '/add' , validator.seller.add    , seller.add    ) ;

module.exports.router = router ;