const router = require( 'express' ).Router() ;

const stock     = require( './stock.controller'  ) ;

router.get( '/'       , stock.itemList ) ;
router.get( '/detail' , stock.itemDetail ) ;

module.exports.router = router