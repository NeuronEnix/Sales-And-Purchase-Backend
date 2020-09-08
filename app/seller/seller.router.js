const router   = require( 'express' ).Router() ;

const seller   = require( './seller.controller' ) ;
const {validator} = require( '../../validator'     ) ;

router.get( '/'    , seller.search ) ;

router.post( '/add' , validator.seller.add    , seller.add    ) ;

module.exports.router = router ;