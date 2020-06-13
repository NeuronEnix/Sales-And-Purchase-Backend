const router = require( 'express' ).Router() ;
const item = require( './item.controller' ) ;

router.get( '/'         , item.search   ) ;

router.post( '/list'    , item.list     ) ;
router.post( '/add'     , item.add      ) ;
router.post( '/update'  , item.update   ) ;
router.post( '/detail'  , item.detail   ) ;
router.post( '/delete'  , item.delete   ) ;

module.exports.router = router