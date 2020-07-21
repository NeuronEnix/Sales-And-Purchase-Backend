const router = require( 'express' ).Router() ;

const item     = require( './item.controller'  ) ;
const logger   = require( './item.logger.js'   ) ;
const validate = require( '../../validator.js' ) ;

router.post( '/'       , validate.item.search , item.search                 ) ;
router.post( '/add'    , validate.item.add    , item.add    , logger.add    ) ;
router.post( '/update' , validate.item.update , item.update , logger.update ) ;
router.post( '/detail' , validate.item.detail , item.detail ,               ) ;

module.exports.router = router