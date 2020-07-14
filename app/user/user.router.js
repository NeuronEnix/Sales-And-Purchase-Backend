const router = require( 'express' ).Router() ;
const user = require( './user.controller' ) ;
const validate = require( '../../validator.js' ) ;

router.post( '/login'  , validate.user.login  , user.login  ) ;
router.post( '/signup' , validate.user.signup , user.signup ) ;
router.post( '/logout' ,                        user.logout ) ;

module.exports.router = router