const router = require( 'express' ).Router() ;
const purchase = require( './purchase.controller.js' ) ;
const validate = require( '../../validator.js' ) ;

router.post( '/create'  , validate.purchase.create  ,  purchase.create ) ;
router.post( '/detail'  , validate.purchase.detail  , purchase.detail  ) ;
router.post( '/update'  , validate.purchase.update  , purchase.update  ) ;
router.post( '/delete'  , validate.purchase.delete  , purchase.delete  ) ;
router.post( '/list-my' , validate.purchase.listMy  , purchase.listMy  ) ;
router.post( '/list-all', validate.purchase.listAll , purchase.listAll ) ;

module.exports.router = router