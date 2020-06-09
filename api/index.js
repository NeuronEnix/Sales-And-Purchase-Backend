const router = require( 'express' ).Router() ;

const user = require( './user/user.router.js' ) ;
router.use( '/user', user.router ) ;

const item = require( './item/item.router.js' ) ;
router.use( '/item', item.router ) ;

module.exports.router = router ;