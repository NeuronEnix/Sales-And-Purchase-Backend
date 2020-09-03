const router = require( 'express' ).Router() ;
const purchase = require( './purchase.controller.js' ) ;
const validate = require( '../../validator.js' ) ;

router.get( '/detail'      , purchase.detail  ) ;
router.get( '/edit-detail' , purchase.editDetail  ) ;
router.get( '/list'        , purchase.list  ) ;

router.post( '/create' , validate.purchase.create  , purchase.create ) ;
router.post( '/update' , validate.purchase.update  , purchase.update ) ;

router.delete( '/delete' , purchase.delete  ) ;

module.exports.router = router