const router = require( 'express' ).Router() ;

const user = require( './user.controller' ) ;
const { validator } = require( "../../middleware/validator" ) ;

router.post( '/sign-up' , validator.user.signUp  , user.signUp  ) ;
router.post( '/sign-in' , validator.user.signIn  , user.signIn  ) ;
router.get ( '/sign-out', validator.user.signOut , user.signOut ) ;

module.exports.router = router