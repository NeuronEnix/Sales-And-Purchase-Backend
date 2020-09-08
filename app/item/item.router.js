const router = require( 'express' ).Router() ;

const item     = require( './item.controller'  ) ;
const { validator } = require( '../../validator.js' ) ;

router.get( '/'          , validator.item.search    , item.search    ) ;
router.get( '/sales'     , validator.item.sales     , item.sales     ) ;
router.get( '/stock'     , validator.item.stock     , item.stock     ) ;
router.get( '/detail'    , validator.item.detail    , item.detail    ) ;
router.get( '/purchases' , validator.item.purchases , item.purchases ) ;

router.post( '/add'    , validator.item.add    , item.add    ) ;
router.post( '/update' , validator.item.update , item.update ) ;

module.exports.router = router