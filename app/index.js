const router = require( 'express' ).Router() ;

const user = require( './user/user.router.js' ) ;
router.use( '/user', user.router ) ;

const item = require( './item/item.router.js' ) ;
router.use( '/item', item.router ) ;

const bill = require( './bill/bill.router.js' ) ;
router.use( '/bill', bill.router ) ;

const purchase = require( './purchase/purchase.router.js' ) ;
router.use( '/purchase', purchase.router ) ;

module.exports.router = router ;