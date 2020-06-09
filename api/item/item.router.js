const router = require( 'express' ).Router() ;
const item = require( './item.controller' ) ;

router.post( '/'        , item.list     ) ;
router.post( '/add'     , item.add      ) ;
router.post( '/update'  , item.update   ) ;
router.post( '/delete'  , item.delete   ) ;

module.exports.router = router