const router   = require( 'express' ).Router() ;

const seller   = require( './seller.controller' ) ;
const validate = require( '../../validator'     ) ;

router.get( '/'    , seller.search ) ;

router.post( '/add' , validate.seller.add    , seller.add    ) ;

module.exports.router = router ;