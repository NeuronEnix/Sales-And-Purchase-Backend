const router = require( 'express' ).Router() ;
const purchase = require( './purchase.controller.js' ) ;
const {validator} = require( '../../validator.js' ) ;

router.get( '/detail'      , purchase.detail  ) ;
router.get( '/list'        , purchase.list  ) ;
router.get( '/list-edits'  , purchase.editDetail  ) ;

router.post( '/create' , validator.purchase.create  , purchase.create ) ;
router.post( '/update' , validator.purchase.update  , purchase.update ) ;

router.delete( '/delete' , purchase.delete  ) ;

module.exports.router = router