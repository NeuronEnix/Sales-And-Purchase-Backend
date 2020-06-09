const router = require( 'express' ).Router() ;
const user = require( './user.controller' ) ;

router.post( '/login', user.login   ) ;
router.post( '/signup', user.signup ) ;

module.exports.router = router