const router = require( 'express' ).Router() ;

const item     = require( './item.controller'   ) ;
const logger   = require( './item.logger.js'    ) ;
const validate = require( './item.validator.js' ) ;

router.post( '/'       , validate.search , item.search                  ) ;
router.post( '/add'    , validate.add     , item.add    , logger.add    ) ;
router.post( '/update' , validate.update  , item.update , logger.update ) ;
router.post( '/detail' , validate.detail  , item.detail ,               ) ;

module.exports.router = router