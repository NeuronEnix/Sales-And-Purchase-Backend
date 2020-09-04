const router = require( 'express' ).Router() ;

const item     = require( './item.controller'  ) ;
const validate = require( '../../validator.js' ) ;

router.get( '/'        , item.search ) ;
router.get( '/detail' ,  item.detail ) ;

router.get( '/stock', item.stock ) ;
router.get( '/sales', item.sales ) ;
router.get( '/purchases', item.purchases ) ;

router.post( '/add'    , validate.item.add    , item.add    ) ;
router.post( '/update' , validate.item.update , item.update ) ;

module.exports.router = router