const router = require( 'express' ).Router() ;

const user = require( './user/user.router.js' ) ;
router.use( '/user', user.router ) ;

const item = require( './item/item.router.js' ) ;
router.use( '/item', item.router ) ;

const seller = require( './seller/seller.router.js' ) ;
router.use( '/seller', seller.router ) ;

const sale = require( './sale/sale.router.js' ) ;
router.use( '/sale', sale.router ) ;

const purchase = require( './purchase/purchase.router.js' ) ;
router.use( '/purchase', purchase.router ) ;

const auth = require( '../middleware/auth.js' ) ;
router.use( '/auth' , auth.validateRefreshToken, auth.router ) ;

module.exports.router = router ;