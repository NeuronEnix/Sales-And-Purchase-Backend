const router = require( 'express' ).Router() ;

const user = require( './user/user.router') ;
router.use( '/user', user.router ) ;

module.exports.router = router ;