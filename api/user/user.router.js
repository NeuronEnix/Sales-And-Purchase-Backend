const router = require( 'express' ).Router() ;
const handler = require( '../../handler.js' );
const user = require( './user.controller' ) ;
router.post( '/', ( req, res ) => { 
    handler.send( res, 400, handler.errData.invalidReq ) ;
} )
router.post( '/login', user.login ) ;
router.post( '/signup', user.signup ) ;

module.exports.router = router