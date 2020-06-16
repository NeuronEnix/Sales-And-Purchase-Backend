const router = require( 'express' ).Router() ;

const item = require( './item.controller' ) ;
const validate = require( './item.validator.js' ) ;

router.get( '/'        , item.search   ) ;

router.post( '/add'    , validate.add    , item.add    ) ;
router.post( '/update' , validate.update , item.update ) ;
router.post( '/detail' , validate.detail , item.detail ) ;

module.exports.router = router