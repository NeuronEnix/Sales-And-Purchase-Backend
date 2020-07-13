const router = require( 'express' ).Router() ;
const user = require( './user.controller' ) ;
const validate = require( './user.validator.js' ) ;

router.post( '/login'  , validate.login  , user.login  ) ;
router.post( '/signup' , validate.signup , user.signup ) ;
router.post( '/logout' ,                   user.logout ) ;

module.exports.router = router