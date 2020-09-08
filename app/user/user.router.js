const router = require( 'express' ).Router() ;

const user = require( './user.controller' ) ;
const { validator } = require( '../../validator' ) ;

router.post( '/login'  , validator.user.login  , user.login  ) ;
router.post( '/signup' , validator.user.signup , user.signup ) ;
router.get ( '/logout'  , validator.user.logout , user.logout ) ;

module.exports.router = router